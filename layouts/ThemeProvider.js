import { useEffect } from "react";
import { pSBC } from "../utils/pSBC";

const ThemeProvider = ({ theme, children }) => {
  useEffect(() => {
    if (theme) {
      // primary colours
      document.documentElement.style.setProperty(
        "--color-primary",
        theme.primary.hex
      );
      document.documentElement.style.setProperty(
        "--color-primary-light",
        pSBC(0.25, theme.primary.hex)
      );
      document.documentElement.style.setProperty(
        "--color-primary-dark",
        pSBC(-0.25, theme.primary.hex)
      );

      // secondary colours
      document.documentElement.style.setProperty(
        "--color-secondary",
        theme.secondary.hex
      );
      document.documentElement.style.setProperty(
        "--color-secondary-light",
        pSBC(0.25, theme.secondary.hex)
      );
      document.documentElement.style.setProperty(
        "--color-secondary-dark",
        pSBC(-0.25, theme.secondary.hex)
      );

      // tertiary colours
      document.documentElement.style.setProperty(
        "--color-tertiary",
        theme.tertiary.hex
      );
      document.documentElement.style.setProperty(
        "--color-secondary-light",
        pSBC(0.25, theme.tertiary.hex)
      );
      document.documentElement.style.setProperty(
        "--color-tertiary-dark",
        pSBC(-0.25, theme.tertiary.hex)
      );
    }
  }, []);

  return children;
};

export default ThemeProvider;
