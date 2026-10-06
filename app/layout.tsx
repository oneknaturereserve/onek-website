import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OneK Nature Reserve | Research · Education · Conservation",
  description: "A private rainforest reserve in southern Costa Rica dedicated to biodiversity conservation, long-term research, and nature education.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
