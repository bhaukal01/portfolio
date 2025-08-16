import { useEffect, useMemo, useState } from "react";
import ThemeSwitcher from "./components/shared/ThemeSwitcher";

import ClassicHome from "./components/classic/Home";
import AwsHome from "./components/aws/Home";
import AzureHome from "./components/azure/Home";
import GcpHome from "./components/gcp/Home";

const STORAGE_KEY = "portfolio-theme";
const DEFAULT_THEME = "classic";

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
    document.body.classList.remove("classic", "aws", "azure", "gcp");
    document.body.classList.add(theme);
  }, [theme]);

  const Current = useMemo(() => {
    switch (theme) {
      case "aws":
        return AwsHome;
      case "azure":
        return AzureHome;
      case "gcp":
        return GcpHome;
      default:
        return ClassicHome;
    }
  }, [theme]);

  return (
    <>
      <ThemeSwitcher theme={theme} onChange={setTheme} />
      <main>
        <Current />
      </main>
    </>
  );
}
