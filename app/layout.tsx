import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
    variable: "--font-inter-tight",
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="es">
            <body
                className={`${interTight.variable} ${interTight.className} antialiased bg-gray-50 dark:bg-gray-950`}
            >
                <main className="pt-8">{children}</main>
            </body>
        </html>
    );
}
