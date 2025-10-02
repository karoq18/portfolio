import { useState, useEffect } from "react";

export function useHeaderHeight() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    function updateHeight() {
      const header = document.querySelector("header");
      if (header) {
        setHeight(header.offsetHeight);
      }
    }

    // Ustaw na start i przy zmianach okna
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return height;
}
