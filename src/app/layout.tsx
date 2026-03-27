import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const viewport: Viewport = {
  themeColor: '#020617',
};

export const metadata: Metadata = {
  title: 'BIODUSTRY | Engineering the Future of Molecular Industry',
  description:
    'Discover how BIODUSTRY transforms industrial manufacturing and agriculture through high-scale biotechnology.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='26' font-size='28'>🧬</text></svg>",
  },
  openGraph: {
    title: 'BIODUSTRY | Engineering the Future of Molecular Industry',
    description:
      'Discover how BIODUSTRY transforms industrial manufacturing and agriculture through high-scale biotechnology.',
    type: 'website',
    locale: 'en_US',
    siteName: 'BIODUSTRY',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BIODUSTRY | Engineering the Future of Molecular Industry',
    description:
      'Discover how BIODUSTRY transforms industrial manufacturing and agriculture through high-scale biotechnology.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
