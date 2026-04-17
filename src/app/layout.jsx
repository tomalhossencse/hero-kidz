import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import localFont from "next/font/local";
import Container from "@/components/layouts/Container";

const poppins = Poppins({
  weight: ["100", "200", "400", "500", "600", "800"],
});

export const banglaFont = localFont({
  src: "../fonts/mayaboti-normal.ttf",
});

export const metadata = {
  metadataBase: new URL("https://hero-kidz-iota-nine.vercel.app"),

  title: {
    default: "Hero Kidz - Educational Toys for Kids",
    template: "%s | Hero Kidz",
  },

  description:
    "Hero Kidz provides high-quality educational toys that make learning fun for kids. Explore creative, safe, and engaging toys.",

  keywords: [
    "kids toys",
    "educational toys",
    "learning toys Bangladesh",
    "kids learning board",
    "Hero Kidz",
  ],

  authors: [{ name: "Tomal Hossen" }],

  openGraph: {
    title: "Hero Kidz - Educational Toys",
    description:
      "Explore fun and educational toys for kids. Safe, engaging, and perfect for early learning.",
    url: "https://hero-kidz-iota-nine.vercel.app",
    siteName: "Hero Kidz",
    images: [
      {
        url: "https://i.ibb.co.com/q32k2pLP/image.png",
        width: 1200,
        height: 630,
        alt: "Hero Kidz Home",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hero Kidz - Educational Toys",
    description: "Discover fun and educational toys for kids in Bangladesh.",
    images: ["https://i.ibb.co.com/q32k2pLP/image.png"],
  },

  icons: {
    icon: "https://i.ibb.co.com/Xx5D9kNy/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header>
          <Navbar />
        </header>
        <main className="min-h-[calc(100vh-302px)]">{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
