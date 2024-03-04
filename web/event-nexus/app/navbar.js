import "./globals.css";
import Link from "next/link";

import { Audiowide, Outfit } from "next/font/google";
const audiowide = Audiowide({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function Navbar() {
  return (
    <nav className="navbar">
      <figure className="logo">
        <img src="/stars.svg" alt="stars-graphic"></img>
        <h1 className={audiowide.className}>EVENTNEXUS</h1>
      </figure>
      <div className={`${outfit.className} navigationLinks`}>
        <Link href="/">About Us</Link>
        <Link href="/">List your own service</Link>
        <Link href="/">Contact Us</Link>
      </div>
    </nav>
  );
}
