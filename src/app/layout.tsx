import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Azzura Villas | Luxury Sea View Villas | Lefkada",
  description: "Experience luxury living at Azzura Villas - stunning sea view villas in Lefkada, Greece. Private pools, breathtaking views, and unforgettable memories.",
  keywords: "Lefkada villas, luxury villas Greece, sea view accommodation, private pool villa, Greek island vacation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
