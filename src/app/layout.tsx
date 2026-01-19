import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitHub Re-invite Tool | Manage Repository Invitations",
  description: "A modern web application that helps manage GitHub repository invitations by removing stale invitations and sending fresh ones. Perfect for educational institutions managing student access to course repositories.",
  keywords: ["GitHub", "repository", "invitations", "collaboration", "education", "students", "access management"],
  authors: [{ name: "Yahya Gilany", url: "https://yahyagilany.io" },
            { name: "Valerii Chuiko", url: "https://valeriichuiko.org" }
  ],
  creator: "Yahya Gilany",
  publisher: "Yahya Gilany",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github-reinvite.fly.io",
    title: "GitHub Re-invite Tool | Manage Repository Invitations",
    description: "A modern web application that helps manage GitHub repository invitations by removing stale invitations and sending fresh ones. Perfect for educational institutions managing student access to course repositories.",
    siteName: "GitHub Re-invite Tool",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GitHub Re-invite Tool - Manage Repository Invitations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Re-invite Tool | Manage Repository Invitations",
    description: "A modern web application that helps manage GitHub repository invitations by removing stale invitations and sending fresh ones.",
    creator: "@ygilany",
    images: ["/og-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#8B0000",
  colorScheme: "light dark",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
