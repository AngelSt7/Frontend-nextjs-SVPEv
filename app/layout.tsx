import type { Metadata } from "next";
import "./globals.css";
import { DehydratedState } from "@tanstack/react-query";
import { ReactQueryProvider } from "@/src/provider/ReactQueryProvider";
import { Toaster } from 'react-hot-toast';
import { NextUIProvider } from "@/src/provider/NextUIProvider";

export const metadata: Metadata = {
  title: "Front Next App",
  description: "zzz",
};

export default function RootLayout({
  children,
  dehydratedState,
}: {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
}) {
  
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
      <script src="/theme-loader.ts" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-outfit antialiased">
        <ReactQueryProvider dehydratedState={dehydratedState}>
          <NextUIProvider>
            {children}
          </NextUIProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}