import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ELEGANTE — Antigravity Coffee Experience',
  description:
    'ELEGANTE is a luxury café where gravity is optional and perfection is not. Discover our architectural brew, crafted with precision and passion.',
  keywords: ['luxury cafe', 'specialty coffee', 'elegante', 'antigravity', 'nitro brew'],
  authors: [{ name: 'ELEGANTE' }],
  openGraph: {
    title: 'ELEGANTE — Antigravity Coffee Experience',
    description: 'Where gravity is optional. Perfection is not.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: '#050505' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ backgroundColor: '#050505', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
