"use client";

import { Button } from "@heroui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Turnstile } from "@marsidev/react-turnstile";
import { IconCheck, IconSend } from "@tabler/icons-react";
import { useEffect, useState, type ReactNode } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { InferInput } from "valibot";
import { email, nonOptional, object, string, pipe } from "valibot";

import type { APIResponse, GenericFormRequest } from "@/functions/types";

import { Input } from "@/components/forms/fields/Input";
import { TextArea } from "@/components/forms/fields/TextArea";
import { cn } from "@/lib/utils";

const contactSchema = object({
  name: nonOptional(string()),
  email: pipe(string(), email("Please enter a valid email address")),
  message: nonOptional(string()),
  turnstileToken: nonOptional(string()),
});
type ContactFormValues = InferInput<typeof contactSchema>;

const contactDefaults: ContactFormValues = {
  name: "",
  email: "",
  message: "",
  turnstileToken: "",
};

const prod = process.env.NEXT_PUBLIC_IS_PROD === "true";
const siteKey = process.env.NEXT_PUBLIC_TS_SITE_KEY;

type Props = {
  className?: string;
  name: string;
};

export function ContactForm({ className, name }: Props): ReactNode {
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    control,
    reset,
    formState: {
      disabled,
      isSubmitted,
      isDirty,
      isValid,
      errors: { turnstileToken: turnstileTokenError },
    },
  } = useForm<ContactFormValues>({
    resolver: valibotResolver(contactSchema),
    defaultValues: contactDefaults,
    mode: "onChange",
  });

  const submitDisabled = disabled || !isDirty || !isValid || submitting;

  useEffect(() => {
    if (turnstileTokenError?.message) {
      setFormError(turnstileTokenError.message);
    }
  }, [turnstileTokenError]);

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    if (submitDisabled) return;
    setSubmitting(true);

    const submission: GenericFormRequest = {
      form: name,
      ...data,
    };

    fetch("/api/form/submit", {
      method: "POST",
      body: JSON.stringify(submission),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(async (res: APIResponse) => {
        if (!res.success) {
          setFormError(res.message ?? "Error submitting form");
        }
      })
      .catch((err) => {
        setFormError("Error submitting form");
        console.log(err);
      })
      .finally(() => {
        setSubmitting(false);
        reset(contactDefaults);
      });

    console.log(submission);
  };

  return (
    <form
      className={cn("flex flex-col gap-4", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-4 flex-col md:flex-row">
        <Input control={control} name="name" label="Name" type="text" />
        <Input control={control} name="email" label="Email" type="text" />
      </div>
      <TextArea control={control} name="message" label="Message" />
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="flex flex-col gap-y-1">
          {formError ? (
            <div className="text-red-500 text-sm italic -mt-2">{formError}</div>
          ) : null}
          <Turnstile
            hidden={prod}
            siteKey={siteKey || ""}
            onSuccess={(token) => {
              setValue("turnstileToken", token);
              clearErrors("turnstileToken");
            }}
            onError={() =>
              setError("turnstileToken", {
                message: "Spam protection failed. Please try again.",
              })
            }
            onExpire={() =>
              setError("turnstileToken", {
                message: "Turnstile challenge expired.",
              })
            }
            options={{
              responseField: false,
              theme: "dark",
            }}
            className="mx-auto md:mx-0"
          />
        </div>

        <Button
          type="submit"
          color="primary"
          className={cn(
            "w-full md:ml-auto md:w-1/3 ",
            submitDisabled ? "cursor-not-allowed bg-opacity-50" : null,
          )}
          startContent={isSubmitted ? <IconCheck /> : <IconSend />}
          disabled={submitDisabled}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
