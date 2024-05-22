import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/core/react-query/QueryProvider";
import Footer from "@/core/layouts/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "anywhen",
  description: "anyWhen website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster
          richColors
          position="top-right"
          toastOptions={{ duration: 3000 }}
        />
      </body>
    </html>
  );
}
