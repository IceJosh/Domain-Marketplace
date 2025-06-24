"use client"

import Link from "next/link"
import { ArrowUpRight, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const domains = [
  {
    name: "DriedSlice.com",
    price: "$395",
    minOffer: "$100",
    url: "https://driedslice.com",
  },
  {
    name: "AgentLLMs.com",
    price: "SOLD",
    minOffer: "SOLD",
    url: "",
  },
  {
    name: "JellyMakeup.com",
    price: "$395",
    minOffer: "$100",
    url: "https://jellymakeup.com",
  },
  // ... (rest of your domain list)
  {
    name: "RepairedHome.com",
    price: "$395",
    minOffer: "$100",
    url: "https://repairedhome.com",
  },
]

// Type definition for window with v7Analytics
declare global {
  interface Window {
    v7Analytics?: {
      trackPageView: (data: any) => void
      trackEvent: (data: any) => void
    }
    trackDomainInteraction?: (domainName: string) => void
  }
}

export default function Home() {
  const [showSold, setShowSold] = useState(true)

  useEffect(() => {
    const trackPageView = () => {
      if (typeof window !== "undefined" && window.v7Analytics) {
        console.log("Tracking page view")
        window.v7Analytics.trackPageView({
          url: window.location.href,
          referrer: document.referrer,
          title: document.title,
          timestamp: new Date().toISOString(),
        })
      } else {
        console.log("V7 Analytics not available for page view")
      }
    }

    const trackInteraction = (domainName: string) => {
      if (typeof window !== "undefined" && window.v7Analytics) {
        console.log(`Tracking interaction with domain: ${domainName}`)
        window.v7Analytics.trackEvent({
          event: "domain_click",
          properties: {
            domain: domainName,
            timestamp: new Date().toISOString(),
          },
        })
      } else {
        console.log("V7 Analytics not available for domain interaction")
      }
    }

    const timer = setTimeout(() => {
      trackPageView()
      window.trackDomainInteraction = trackInteraction
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleDomainClick = (domainName: string) => {
    if (window.trackDomainInteraction) {
      window.trackDomainInteraction(domainName)
    } else {
      console.log("trackDomainInteraction not available")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="container mx-auto py-10 text-center">
        <Badge
          variant="outline"
          className="bg-black text-white border-0 px-4 py-1 text-sm font-medium rounded-full mb-4"
        >
          WHOLESALE PRICES
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight text-black mb-3">Wholesale Domain Marketplace</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Unbeatable prices on aftermarket domains. Direct wholesale to you.
        </p>
        <p className="text-sm text-purple-600 max-w-2xl mx-auto mt-1">
          Last Updated: 23/06/25 at 23:52
        </p>
      </header>

      <main className="container mx-auto px-4 py-6 mb-12">
        <div className="text-center mb-6">
          <Button
            variant="outline"
            onClick={() => setShowSold((prev) => !prev)}
            className="text-sm"
          >
            {showSold ? "Hide Sold Domains" : "Show Sold Domains"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {domains
            .filter((domain) => showSold || domain.price !== "SOLD")
            .map((domain) => (
              <Link
                href={domain.url || "#"}
                key={domain.name}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block ${domain.price === "SOLD" ? "pointer-events-none" : ""}`}
                onClick={() => handleDomainClick(domain.name)}
              >
                <Card className="overflow-hidden border border-gray-200 hover:border-purple-300 hover:shadow-sm transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-[1fr,auto] gap-4">
                      <div>
                        <h3 className="text-lg font-medium text-black mb-4 truncate group-hover:text-purple-1000 transition-colors duration-200">
                          {domain.name}
                        </h3>

                        <div className="space-y-3">
                          <div>
                            <p className="text-xs uppercase font-medium text-gray-1000 mb-1">Wholesale Price</p>
                            <p className="text-base font-bold text-black">{domain.price}</p>
                          </div>

                          <div>
                            <p className="text-xs uppercase font-medium text-gray-1000 mb-1">Min Offer</p>
                            <p className="text-sm font-medium text-purple-1000 flex items-center">
                              <TrendingDown className="h-3 w-3 mr-1 inline-block" />
                              {domain.minOffer}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <div className="bg-gray-100 rounded-full h-6 w-6 flex items-center justify-center group-hover:bg-purple-100 transition-colors duration-200">
                          <ArrowUpRight className="h-3 w-3 text-gray-1000 group-hover:text-purple-1000 transition-colors duration-200" />
                        </div>

                        {domain.price === "SOLD" ? (
                          <Button disabled className="w-full mt-4 bg-gray-300 text-gray-600 h-9 cursor-not-allowed">
                            Sold
                          </Button>
                        ) : (
                          <Button className="w-full mt-4 bg-black hover:bg-purple-1000 transition-colors duration-200 h-9">
                            Buy Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </main>

      <footer className="container mx-auto py-6 text-center text-gray-1000 border-t border-gray-100 text-sm">
        <p>© {new Date().getFullYear()} UnclaimedName. All rights reserved.</p>
      </footer>
    </div>
  )
}
