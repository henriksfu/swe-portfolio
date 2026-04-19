import type { Metadata } from "next";
import { Source_Serif_4, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Henrik Sachdeva | Software Engineer",
  description:
    "Software engineer focused on reliable systems, clean execution, and full-stack product engineering. Portfolio showcasing distributed services, real-time collaboration, and systems tooling.",
  metadataBase: new URL("https://www.henriksachdeva.dev"),
  openGraph: {
    title: "Henrik Sachdeva | Software Engineer",
    description:
      "Full-stack and backend software engineering portfolio for new-grad roles.",
    url: "https://www.henriksachdeva.dev",
    siteName: "Henrik Sachdeva",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${sourceSerif.variable}`}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
