import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Textarea, Button, Text } from "@mantine/core";
import { Turnstile } from "@marsidev/react-turnstile";
import { IconSend, IconCheck } from "@tabler/icons";

interface Props {
  heading?: string;
  email?: boolean;
  name?: boolean;
  message?: boolean;
}

export default function GenericForm({
  heading,
  email,
  name,
  message,
}: Props): JSX.Element {
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
    const data = new FormData();

    data.append("formName", heading);
    data.append("cf-turnstile-response", token);
    if (name) data.append("name", values.name);
    if (email) data.append("email", values.email);
    if (message) data.append("message", values.message);

    fetch("/api/form/submit", {
      method: "POST",
      body: data,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then(async (res: any) => {
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
  const handleError = (values: typeof form.errors) => {
    return;
  };

  return (
    <>
      <Turnstile
        siteKey="0x4AAAAAAAA9KCNYNr6Mbs3J"
        // siteKey="1x00000000000000000000AA" // Site key for always passing
        onSuccess={(token) => setToken(token)}
        onError={() => setError("Turnstile verification failed")}
        onExpire={() => setError("Turnstile challenge expired")}
        className="hidden"
      />

      {heading && <h1 className="text-3xl font-bold">{heading}</h1>}
      <form
        className="flex grid-cols-2 flex-col space-y-4 md:grid md:gap-x-8 md:gap-y-4 md:space-y-0"
        onSubmit={form.onSubmit(handleSubmit, handleError)}
      >
        {/* First Row */}
        {name && (
          <div className="col-auto">
            <TextInput
              withAsterisk
              label="Name"
              placeholder="John Smith"
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
              {...form.getInputProps("message")}
            />
          </div>
        )}

        {/* Last Row */}
        <div className="col-span-full row-start-3 flex">
          <Button
            type="submit"
            loading={submitting}
            leftIcon={
              submitted ? <IconCheck size={18} /> : <IconSend size={18} />
            }
          >
            Submit
          </Button>
          <div className="ml-auto mr-0">
            {error ? <Text color="red">{error}</Text> : null}
            {!error && submitted ? (
              <Text color="green">Your response has been recorded</Text>
            ) : null}
          </div>
        </div>
      </form>
    </>
  );
}
