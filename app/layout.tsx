// app/layout.tsx
import './global.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Focus Timer',
  description: 'A focus timer app with customizable timers and ambient sounds.',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="">
        {children}
      </body>
    </html>
  );
}