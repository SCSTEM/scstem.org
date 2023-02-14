import { translate } from "@docusaurus/Translate";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { useMantineColorScheme } from "@mantine/core";
import { clsx } from "@mantine/core";
import IconDarkMode from "@theme/Icon/DarkMode";
import IconLightMode from "@theme/Icon/LightMode";
import React from "react";

import styles from "./styles.module.css";

function ColorModeToggle({ className, value, onChange }) {
  const { toggleColorScheme } = useMantineColorScheme();
  const isBrowser = useIsBrowser();
  const title = translate(
    {
      message: "Switch between dark and light mode (currently {mode})",
      id: "theme.colorToggle.ariaLabel",
      description: "The ARIA label for the navbar color mode toggle",
    },
    {
      mode:
        value === "dark"
          ? translate({
              message: "dark mode",
              id: "theme.colorToggle.ariaLabel.mode.dark",
              description: "The name for the dark color mode",
            })
          : translate({
              message: "light mode",
              id: "theme.colorToggle.ariaLabel.mode.light",
              description: "The name for the light color mode",
            }),
    }
  );
  return (
    <div className={clsx(styles.toggle, className)}>
      <button
        className={clsx(
          "clean-btn",
          styles.toggleButton,
          !isBrowser && styles.toggleButtonDisabled
        )}
        type="button"
        onClick={() => {
          const isDark = value === "dark";

          toggleColorScheme(isDark ? "light" : "dark");
          onChange(isDark ? "light" : "dark");
        }}
        disabled={!isBrowser}
        title={title}
        aria-label={title}
        aria-live="polite"
      >
        <IconLightMode
          className={clsx(styles.toggleIcon, styles.lightToggleIcon)}
        />
        <IconDarkMode
          className={clsx(styles.toggleIcon, styles.darkToggleIcon)}
        />
      </button>
    </div>
  );
}
export default React.memo(ColorModeToggle);
