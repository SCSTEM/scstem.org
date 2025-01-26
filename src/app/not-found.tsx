import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { Image } from "@/components/Image";

import logo from "@/image/svg/logo-white-full.svg";

export default function NotFound(): JSX.Element {
  return (
    <div className="bg-[url(/image/metal-shavings.webp)] bg-cover relative h-[calc(100vh-4rem)] md:h-auto">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle,rgba(0,0,0,.1)5%,rgba(0,0,0,1)100%)",
        }}
      ></div>

      <main className="absolute inset-0 flex flex-col max-w-[500px] px-10 md:p-0 items-center justify-center mx-auto space-y-4 z-10">
        <Image
          src={logo}
          alt="South Central STEM Collective's logo"
          className="object-contain"
        />
        <h1 className="text-center font-heading font-medium text-2xl drop-shadow-xl">
          Looks like you might be lost, or this page is still under
          construction...
        </h1>
        <Button as={Link} href="/" color="primary">
          Take me back
        </Button>
      </main>
    </div>
  );
}
