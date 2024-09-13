import type { Metadata, Viewport } from "next";

import { MantineProvider, TrpcProvider } from "@/providers";

import "../styles/globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "",
  description: "",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ja">
      <body>
        <TrpcProvider>
          <MantineProvider>{children}</MantineProvider>
        </TrpcProvider>
      </body>
    </html>
  );
};

export default RootLayout;
