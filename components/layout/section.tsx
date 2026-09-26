import type { ComponentPropsWithoutRef } from "react";

export function Section({ className = "", ...props }: ComponentPropsWithoutRef<"section">) {
  return <section className={`section ${className}`} {...props} />;
}
