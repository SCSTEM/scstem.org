import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

const colors = {
  "brand-yellow": [
    "#E6E1CF",
    "#DDD4B0",
    "#D9CA90",
    "#DCC56C",
    "#E6C644",
    "#FACC15",
    "#D7B21C",
    "#B1962A",
    "#938032",
    "#7C6E36",
  ],
  "brand-gray": [
    "#878B91",
    "#787E87",
    "#6C727C",
    "#606873",
    "#555E6A",
    "#4B5563",
    "#464D57",
    "#40454D",
    "#3B3F44",
    "#36393C",
  ],
  "brand-green": [
    "#7AAF8E",
    "#62AD7E",
    "#4BAB6F",
    "#39A762",
    "#28A455",
    "#16A34A",
    "#208646",
    "#266F41",
    "#295E3D",
    "#2A5038",
  ],
  "brand-orange": [
    "#E6D8CF",
    "#DCC2B0",
    "#D9AE90",
    "#DB9A6D",
    "#E68745",
    "#F97316",
    "#D7691D",
    "#B0622B",
    "#935A33",
    "#7B5336",
  ],
  "brand-dark": [
    "#252525",
    "#222222",
    "#1F1F1F",
    "#1C1C1C",
    "#191919",
    "#171717",
    "#151515",
    "#131313",
    "#111111",
    "#0F0F0F",
  ],
  "brand-light": [
    "#FAFAFA",
    "#E1E1E1",
    "#CACACA",
    "#B6B6B6",
    "#A4A4A4",
    "#949494",
    "#858585",
  ],
  "brand-blue": [
    "#D3DCEB",
    "#B3C5E3",
    "#8FAFE2",
    "#6898E7",
    "#3B82F6",
    "#3375DF",
    "#336AC4",
    "#3B63A3",
    "#3F5B89",
  ],
  "brand-red": [
    "#DBC5C5",
    "#D0A9A9",
    "#CB8D8D",
    "#CA6E6E",
    "#CF4D4D",
    "#DC2626",
    "#B73131",
    "#993838",
    "#813B3B",
    "#6E3C3C",
  ],
};

export default function Root({ children }) {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "theme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withCSSVariables
        emotionOptions={{ key: "mantine", prepend: true }}
        theme={{
          fontFamily: "Inter var, sans-serif",
          colorScheme: colorScheme,
          primaryColor: "brand-yellow",
          primaryShade: {
            light: 5,
            dark: 5,
          },
          white: "#FAFAFA",
          black: "#171717",
          colors,
        }}
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
