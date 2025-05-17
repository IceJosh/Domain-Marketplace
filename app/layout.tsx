import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Premium Domains for Sale",
  description: "Browse our collection of high-quality domain names available for purchase.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        {children}
        <Script id="v7-analytics" strategy="afterInteractive">
          {`
            window.v7Analytics = {
              trackPageView: function(data) {
                console.log('V7 Analytics - Page View:', data);
                // In production, this would send data to your analytics endpoint
              },
              trackEvent: function(data) {
                console.log('V7 Analytics - Event:', data);
                // In production, this would send event data to your analytics endpoint
              }
            };
          `}
        </Script>
      </body>
    </html>
  )
}
