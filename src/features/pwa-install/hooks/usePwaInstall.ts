import { useEffect, useState } from "react";
import type { InstallPrompt } from "@/features/pwa-install/model";

export const usePwaInstall = () => {
  const [prompt, setPrompt] = useState<InstallPrompt>();
  const [guideOpen, setGuideOpen] = useState(false);
  const [installed, setInstalled] = useState(
    () => window.matchMedia("(display-mode: standalone)").matches,
  );

  useEffect(() => {
    const savePrompt = (event: Event) => {
      event.preventDefault();
      setPrompt(event as InstallPrompt);
      setGuideOpen(false);
    };
    const markInstalled = () => {
      setInstalled(true);
      setPrompt(undefined);
    };

    window.addEventListener("beforeinstallprompt", savePrompt);
    window.addEventListener("appinstalled", markInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", savePrompt);
      window.removeEventListener("appinstalled", markInstalled);
    };
  }, []);

  const install = async () => {
    if (!prompt) {
      setGuideOpen((open) => !open);
      return;
    }

    setPrompt(undefined);
    try {
      await prompt.prompt();
      const { outcome } = await prompt.userChoice;
      setInstalled(outcome === "accepted");
    } catch {
      setGuideOpen(true);
    }
  };

  return { install, installed, canPrompt: Boolean(prompt), guideOpen };
};
