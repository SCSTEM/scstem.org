import React, { useState, useEffect } from "react";
import AdminLayout from "@site/src/layouts/Admin";
import { TextInput, ActionIcon, Button, Text, CopyButton } from "@mantine/core";
import { useForm } from "@mantine/form";
import { APIResponse, Shortlink } from "../../../functions/types";
import {
  IconArrowsShuffle,
  IconCheck,
  IconClipboard,
  IconSend,
} from "@tabler/icons-react";

import "@glideapps/glide-data-grid/dist/index.css";
import {
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
} from "@glideapps/glide-data-grid";
import sidebars from "@site/sidebars";

export default function Shortlinks(): JSX.Element {
  /* Load username */
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/team/me")
      .then((res) => res.json())
      .then((data: string) => setName(data))
      .catch((error) => console.error("Error fetching name", error));
  }, []);

  /* Submission and form handlers */
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [link, setLink] = useState("");

  const form = useForm({
    initialValues: {
      url: "",
      code: "",
    },
    validate: {
      url: (value) =>
        // This line is cursed
        /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$/.test(
          value
        )
          ? null
          : "Invalid URL",
      code: (value) => (value.length > 1 ? null : "You must provide a code"),
    },
    validateInputOnBlur: true,
  });

  const handleSubmit = (values: typeof form.values) => {
    setError(undefined);
    setSubmitting(true);

    const link: Shortlink = {
      url: values.url,
      code: values.code,
    };

    fetch("/api/team/shortlink/link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(link),
    })
      .then((res) => res.json())
      .then((data: APIResponse) => {
        console.log(data);
        if (data.success) return data.result;
        throw new Error(data.message);
      })
      .then((result: Shortlink) => {
        setSubmitted(true);
        setLink(`https://go.scstem.tech/${result.code}`);
      })
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => {
        setSubmitting(false);
        form.reset();
      });
  };
  const handleError = (values: typeof form.errors) => {
    // TODO: Handle errors
    return;
  };

  /* Code Generator */
  const [generating, setGenerating] = useState(false);
  const generateCode = () => {
    setGenerating(true);

    fetch("/api/team/shortlink/code")
      .then((res) => res.json())
      .then((data: APIResponse) => {
        if (data.success) form.setFieldValue("code", data.result);
        else data.error;
      })
      .catch((err) => {
        console.error("Error generating code", err);
        form.setFieldError("code", "API error, see console");
      })
      .finally(() => {
        setGenerating(false);
      });
  };

  /* Data Grid */
  const gridColumns: GridColumn[] = [
    { title: "Code", width: 100 },
    { title: "URL", width: 300 },
    { title: "Clicks", width: 50 },
  ];

  const getData = ([col, row]: Item): GridCell => {
    switch (col) {
      case 0:
        return {
          kind: GridCellKind.Text,
          data: "abc123",
          allowOverlay: false,
          displayData: "abc123",
        };
      case 1:
        return {
          kind: GridCellKind.Uri,
          data: "https://example.com",
          allowOverlay: false,
        };
      case 2:
        return {
          kind: GridCellKind.Number,
          data: 3,
          allowOverlay: false,
          displayData: "Three",
        };
    }
  };

  return (
    <AdminLayout>
      <main className="grid p-6 lg:grid-cols-4 lg:gap-10">
        <div className="flex flex-col">
          <div className="bg-base-100 rounded-3xl border-2 border-solid border-primary border-opacity-20 p-6 drop-shadow-xl">
            <img src="/img/svg/logo-color-full.svg" className="mb-2 mt-0" />
            <h2 className="mt-0 dark:text-white">
              Welcome{name ? `, ${name}` : ""}! Ready to shorten some links?
            </h2>
            <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
              <TextInput
                label="URL"
                placeholder="https://example.com"
                {...form.getInputProps("url")}
              />
              <TextInput
                label="Code"
                className="mt-2"
                placeholder="abc123"
                {...form.getInputProps("code")}
                rightSection={
                  <ActionIcon
                    variant="transparent"
                    onClick={() => generateCode()}
                    loading={generating}
                  >
                    <IconArrowsShuffle size={24} />
                  </ActionIcon>
                }
              />
              <div className="mt-4 flex justify-evenly space-x-4">
                <Button
                  type="submit"
                  loading={submitting}
                  className="w-full"
                  leftIcon={
                    submitted ? <IconCheck size={18} /> : <IconSend size={18} />
                  }
                >
                  Submit
                </Button>

                <CopyButton value={link}>
                  {({ copied, copy }) => (
                    <Button
                      className="w-full"
                      leftIcon={
                        copied ? (
                          <IconCheck size={18} />
                        ) : (
                          <IconClipboard size={18} />
                        )
                      }
                      disabled={!submitted}
                      onClick={copy}
                      color={copied ? "brand-green" : "brand-yellow"}
                    >
                      Copy Link
                    </Button>
                  )}
                </CopyButton>
              </div>
            </form>

            <div className="mt-4 h-4">
              {error ? (
                <Text size="sm" color="red">
                  {error}
                </Text>
              ) : null}

              {submitted && !error ? (
                <Text size="sm" color="green">
                  Link shortened successfully
                </Text>
              ) : null}
            </div>
          </div>
        </div>
        <div className="bg-base-100 col-span-3 overflow-auto rounded-3xl border-2 border-solid border-primary border-opacity-20 p-6 drop-shadow-xl">
          Will add the grid ...eventually.
        </div>
      </main>
    </AdminLayout>
  );
}
