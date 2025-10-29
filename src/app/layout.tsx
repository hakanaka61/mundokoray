import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mundo Matchup Guide",
  description: "Dr. Mundo vs Rakip Şampiyon - Item, Rün, Early Plan",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Mundo Matchup Guide",
    description:
      "Dr. Mundo vs rakip şampiyon: core item, rün, lane planı, zorluk.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Mundo Matchup Guide",
    description:
      "Mundo oynuyorsun, rakibin kim? Tek tıkla build + lane planı.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="bg-slate-900">
      <body className="min-h-screen bg-slate-900 text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
