import type { KeyboardEvent } from "react";

export const useEnterFocus = () => {
  const handleEnterFocus = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key !== "Enter") return;

    const target = e.target as HTMLElement;

    if (target.tagName === "TEXTAREA") {
      return;
    }

    e.preventDefault();

    const form = (target as HTMLInputElement).form;
    if (!form) return;

    const elements = Array.from(
      form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
        "input, textarea",
      ),
    );

    const index = elements.indexOf(
      target as HTMLInputElement | HTMLTextAreaElement,
    );

    const next = elements[index + 1];
    next?.focus();
  };

  return handleEnterFocus;
};
