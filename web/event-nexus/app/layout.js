import "./globals.css";
import Navbar from "./navbar";

export const metadata = {
  title: "Event Nexus",
  description: "A marketplace for all the services for your event",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <img className="greenblur" src="/green-blur.svg" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
