import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  params: { source: string };
}

export default function Layout({ children, params: { source } }: Props) {
  return (
    <div>
      <span>{source}</span>
      {children}
    </div>
  );
}
