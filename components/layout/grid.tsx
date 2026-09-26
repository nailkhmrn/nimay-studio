import type { ComponentPropsWithoutRef } from "react";

export function Grid({ className = "", ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={`grid-layout ${className}`} {...props} />;
}
