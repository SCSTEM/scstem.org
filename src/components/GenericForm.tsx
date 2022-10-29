import React from "react";

interface Props {
  id: string;
  heading?: string;
  email?: boolean;
  name?: boolean;
  message?: boolean;
}

export default function GenericForm({
  id,
  heading,
  email,
  name,
  message,
}: Props): JSX.Element {
  return (
    <>
      {heading && <h1 className="text-3xl font-bold">{heading}</h1>}
      <form data-static-form-name={id} className="grid grid-cols-2 gap-x-8">
        {/* First Row */}
        {name && (
          <div className="col-auto">
            <label className="label">Your name</label>
            <input
              className="input-bordered input w-full"
              type="text"
              name="name"
              required
            />
          </div>
        )}

        {email && (
          <div className="col-auto">
            <label className="label">Email address</label>
            <input
              className="input-bordered input w-full"
              type="email"
              name="email"
              required
            />
          </div>
        )}

        {/* Second Row */}
        {message && (
          <div className="col-span-full row-start-2">
            <label className="label">Message</label>
            <textarea
              className="textarea-bordered textarea h-32 w-full"
              name="message"
              required
            />
          </div>
        )}

        <div
          className="cf-turnstile"
          data-sitekey="0x4AAAAAAAA9KCNYNr6Mbs3J"
        ></div>

        {/* Last Row */}
        <div className="row-start-3 pt-4">
          <button className="btn-primary btn w-32" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
