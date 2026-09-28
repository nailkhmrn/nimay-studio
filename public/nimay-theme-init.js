(() => {
  const key = "nimay-theme-v1";
  const root = document.documentElement;
  let theme = null;

  try {
    const stored = window.localStorage.getItem(key);
    if (stored === "light" || stored === "dark") theme = stored;
  } catch {}

  if (!theme) {
    try {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch {
      theme = "light";
    }
  }

  root.dataset.theme = theme;
  root.style.colorScheme = theme;
})();
