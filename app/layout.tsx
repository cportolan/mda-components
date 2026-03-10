import type { Metadata } from "next";
import { Inter_Tight, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const interTight = Inter_Tight({
    variable: "--font-inter-tight",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "MDA Componentes - Librería Frontend",
    description:
        "Librería de componentes frontend para React, diseñada para ser fácil de usar, personalizable y accesible. Incluye una amplia variedad de componentes preconstruidos y estilos flexibles para adaptarse a cualquier proyecto.",
    icons: {
        icon: "/images/mda_logo.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="es" className={cn("font-sans", geist.variable)}>
            <body
                className={`${interTight.variable} ${interTight.className} antialiased bg-gray-50 dark:bg-gray-950`}
            >
                <main className="pt-8">{children}</main>
            </body>
        </html>
    );
}
