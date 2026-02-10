import type { Metadata } from "next";
__FONT_IMPORTS__
import "./globals.css";
import { Providers } from "./providers";

__FONT_DECLARATIONS__

export const metadata: Metadata = {
  title: "__CLIENT_NAME__",
  description: "Powered by GlueOS Design System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`__FONT_VARIABLES__ antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
