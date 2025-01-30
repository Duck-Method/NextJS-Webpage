// app/layout.tsx
import './styles/global.css';
import {ReactNode} from 'react';

export const metedata = {
    title: 'Focus Timer',
    descripiton: 'A fosuc timer app with customizable timers and ambient sounds',
};

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}