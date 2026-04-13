import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Lithuanian Club of Cleveland',
  description: 'A cultural home for the Lithuanian community of Cleveland — dining, events, heritage, and fellowship since 1912.',
  keywords: 'Lithuanian, Cleveland, cultural club, restaurant, events, heritage',
  openGraph: {
    title: 'Lithuanian Club of Cleveland',
    description: 'A cultural home for the Lithuanian community of Cleveland.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
