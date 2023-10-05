import "./globals.css";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "DevExplorer",
//   description:
//     "Prataforma colaborativa para compartilhamento dos desafios do Programa Explorer da Rocketseat",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      {/* <body className={inter.className}>{children}</body> */}
      <body>{children}</body>
    </html>
  );
}
