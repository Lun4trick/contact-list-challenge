import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header/Header";
import EmptyDesignBox from "./components/Header/components/EmptyDesignBox";
import HeaderSideButton from "./components/Header/components/HeaderSideButton";
import Image from "next/image";

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
      <body className="grid grid-cols-[1fr_3fr_1fr] grid-rows-[auto_auto_1fr] h-screen">
        <Header />
        {children}
      </body>
    </html>
  );
}
