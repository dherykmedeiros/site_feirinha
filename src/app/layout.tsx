import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Feirinha da Beira Mar | Ponto Turístico em Fortaleza Ceará",
  description: "A Feirinha da Beira Mar é um ótimo lugar para passear e comprar artesanato em Fortaleza Ceará. Mais de 700 boxes com a cultura do nosso povo.",
  keywords: ["Feirinha da Beira Mar", "Fortaleza", "Ceará", "Artesanato", "Turismo"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
