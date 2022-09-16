import React from "react";
import Typed, { TypedOptions } from "typed.js";

interface Props {
  className?: string;
}

export default function HeroType({ className }: Props): JSX.Element {
  const words = React.useRef(null);
  const typed = React.useRef(null);

  React.useEffect(() => {
    const options: TypedOptions = {
      strings: [
        "Welcome to the future",
        "Welcome to creativity",
        "Welcome to the next generation",
        "Welcome to South Central STEM Collective",
      ],
      smartBackspace: true,
      typeSpeed: 75,
      backSpeed: 75,
      backDelay: 2500,
      showCursor: false,
    };

    typed.current = new Typed(words.current, options);

    return () => {
      typed.current.destroy();
    };
  }, []);

  return <span className={className} ref={words} />;
}
