import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RecoilContextProvider from "@/lib/RecoilContextProvider";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/custom/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MRP | MCA Records on Placements",
  description:
    "Triumph over your interview by reading the experiences of others.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ADD THIS LINK TAG */}
        <link
          href="https://fonts.googleapis.com/css2?family=Georama:wght@700&family=Arvo:wght@700&family=Oswald:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-200`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RecoilContextProvider>
            <Toaster position="bottom-right" />
            {children}
          </RecoilContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

