import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className='max-w-[1200px]'>{children}</body>
    </html>
  );
}
