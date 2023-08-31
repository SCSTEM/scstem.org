import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { TextInput, Textarea, Button, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Turnstile } from "@marsidev/react-turnstile";
import { IconSend, IconCheck } from "@tabler/icons-react";
import { useState } from "react";

import { APIResponse, GenericFormRequest } from "@site/functions/types";

interface Props {
  heading?: string;
  email?: boolean;
  name?: boolean;
  message?: boolean;
  formDisabled?: boolean;
}

export default function GenericForm({
  heading,
  email,
  name,
  message,
  formDisabled,
}: Props): JSX.Element {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const [token, setToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const initialValues: { [key: string]: string } = {
    "cf-turnstile-response": "",
  };
  const validate: { [key: string]: (value: string) => null | string } = {};

  if (name) {
    initialValues.name = "";
    validate.name = (value) =>
      value.length > 2 ? null : "Name must be longer than 2 letters";
  }

  if (email) {
    initialValues.email = "";
    validate.email = (value) =>
      /^\S+@\S+$/.test(value) ? null : "Invalid email";
  }

  if (message) {
    initialValues.message = "";
    validate.message = (value) =>
      value.length > 2 ? null : "Message must be longer than 2 letters";
  }

  const form = useForm({
    initialValues,
    validate,
    validateInputOnBlur: true,
  });

  const handleSubmit = (values: typeof form.values) => {
    setSubmitting(true);
    const data: GenericFormRequest = {
      formName: heading,
      "cf-turnstile-response": token,
      name: values.name,
      email: values.email,
      message: values.message,
    };

    fetch("/api/form/submit", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(async (res: APIResponse) => {
        if (!res.success) {
          setError(res.message);
        } else {
          setSubmitted(true);
        }
      })
      .catch((err) => {
        setError("Error submitting request");
        console.log(err);
      })
      .finally(() => {
        setSubmitting(false);
        form.reset();
      });
  };

  const handleError = (_values: typeof form.errors) => {
    return;
  };

  return (
    <>
      {heading && <h1 className="text-3xl font-bold">{heading}</h1>}
      <form
        className="flex grid-cols-2 flex-col space-y-4 lg:grid lg:gap-x-8 lg:gap-y-4 lg:space-y-0"
        onSubmit={form.onSubmit(handleSubmit, handleError)}
      >
        {/* First Row */}
        {name && (
          <div className="col-auto">
            <TextInput
              withAsterisk
              label="Name"
              placeholder="John Smith"
              disabled={formDisabled}
              {...form.getInputProps("name")}
            />
          </div>
        )}

        {email && (
          <div className="col-auto">
            <TextInput
              withAsterisk
              label="Email Address"
              placeholder="john@example.com"
              disabled={formDisabled}
              {...form.getInputProps("email")}
            />
          </div>
        )}

        {/* Second Row */}
        {message && (
          <div className="col-span-full row-start-2">
            <Textarea
              withAsterisk
              label="Message"
              autosize
              minRows={4}
              disabled={formDisabled}
              {...form.getInputProps("message")}
            />
          </div>
        )}

        {/* Last Row */}
        <div className="col-span-full row-start-3 flex flex-col lg:flex-row">
          <Button
            type="submit"
            loading={submitting}
            leftIcon={
              submitted ? <IconCheck size={18} /> : <IconSend size={18} />
            }
            disabled={
              formDisabled || !token || !!Object.entries(form.errors).length
            }
          >
            Submit
          </Button>
          <div className="mt-4 lg:mt-0 lg:mr-0 lg:ml-auto">
            {error ? <Text color="red">{error}</Text> : null}
            {!error && submitted ? (
              <Text color="green">Your response has been recorded</Text>
            ) : null}
            {!error && !submitted ? (
              <Turnstile
                hidden={!!customFields.isProductionBuild}
                siteKey={
                  typeof customFields.turnstileSiteKey === "string"
                    ? customFields.turnstileSiteKey
                    : ""
                }
                onSuccess={(token) => setToken(token)}
                onError={() => setError("Turnstile verification failed")}
                onExpire={() => setError("Turnstile challenge expired")}
                options={{
                  responseField: false,
                }}
              />
            ) : null}
          </div>
        </div>
      </form>
    </>
  );
}
