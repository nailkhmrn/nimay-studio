import Link from "next/link";
import type { ComponentProps } from "react";

type CtaLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary";
};

export function CtaLink({ variant = "primary", className = "", children, ...props }: CtaLinkProps) {
  return (
    <Link className={`cta-link cta-link--${variant} ${className}`} {...props}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
