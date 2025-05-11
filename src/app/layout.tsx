import Navbar from "@/components/Navbar";
import "./globals.css";
import BacksoundToggle from "@/components/BacksoundToogle";
import CursorSparkle from "@/components/CursorSparkle"; 

export const metadata = {
  title: "Alchemy 2 Finder",
  description:
    "Discover how to create any element in Little Alchemy 2 using the magic of algorithms. Explore recipe paths with BFS, DFS, and Bidirectional Algorithm!",
  icons: {
    icon: "/star.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CursorSparkle />
        <Navbar />
        {children}
        <BacksoundToggle />
      </body>
    </html>
  );
}
