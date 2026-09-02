import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { LocationProvider } from "@/providers/LocationProvider";
import { ThemeProvider } from "next-themes";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather",
  description: "Weather App to provide today' tomorrow and next 5 days of weather.",
};

const themes = ['light', 'dark'];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${robotoSans.variable} ${robotoMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="h-full flex flex-col overflow-y-auto">
        <ThemeProvider themes={themes} storageKey="theme">
          <LocationProvider>{children}</LocationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
