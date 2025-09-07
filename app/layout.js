// app/layout.js
import "./globals.css"; // make sure you import global CSS here
import { Geist, Geist_Mono } from "next/font/google"; 
import { AuthProvider } from "../hooks/useAuth"; // adjust path if needed

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for SEO + PWA
export const metadata = {
  title: "Crop Recommendation App",
  description: "Helps farmers with crop recommendations",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// Root layout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
