import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header/Header";
import Providers from "./utils/Providers";

export const metadata: Metadata = {
  title: "Contacts challenge",
  description: "This app is created to solve the contacts challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-screen" lang="en">
      <Providers>
        <body className="grid grid-cols-[auto_auto_auto] grid-rows-[auto_auto_1fr] h-screen">
          <Header />
          {children}
        </body>
      </Providers>
    </html>
  );
}
