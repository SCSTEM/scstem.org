import React from "react";
import Button from "../components/Button";
import LandingLayout from "../layouts/Landing";

export default function Home(): JSX.Element {
  return (
    <LandingLayout>
      <img className="mb-10" src="/img/logo-color-full.svg" />
      <div className="flex mx-auto mb-2 gap-2">
        <Button url="/about">About</Button>
        <Button url="/sponsors">Sponsors</Button>
        <Button url="/wiki">Wiki</Button>
        <Button url="/blog">Blog</Button>
      </div>
      <Button url="/get-involved" primary>
        Get Involved
      </Button>
    </LandingLayout>
  );
}
