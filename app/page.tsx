"use client"

import Link from "next/link"
import { useEffect, useState, useMemo } from "react"
import { ArrowUpRight, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const domains = [
  { name: "SupportChats.com", price: "$395", minOffer: "$100", url: "https://supportchats.com", tag: "NEW"},
  { name: "BlueRasp.com", price: "$395", minOffer: "$100", url: "https://bluerasp.com", tag: "NEW"},
  { name: "AgenticPrompting.com", price: "$395", minOffer: "$100", url: "https://agenticprompting.com", tag: "NEW"},
  { name: "DiceBranding.com", price: "$395", minOffer: "$100", url: "https://dicebranding.com", tag: "NEW"},
  { name: "MediaSold.com", price: "$395", minOffer: "$100", url: "https://mediasold.com", tag: "NEW"},
  { name: "MCPSources.com", price: "$395", minOffer: "$100", url: "https://mcpsources.com", tag: "NEW"},
  { name: "MCPSignature.com", price: "$395", minOffer: "$100", url: "https://mcpsignature.com", tag: "NEW"},
  { name: "DriedSlice.com", price: "$395", minOffer: "$100", url: "https://driedslice.com" },
  { name: "AgentLLMs.com", price: "SOLD", minOffer: "SOLD", url: "" },
  { name: "JellyMakeup.com", price: "$395", minOffer: "$100", url: "https://jellymakeup.com" },
  { name: "AssetsStudio.com", price: "$395", minOffer: "$100", url: "https://assetsstudio.com" },
  { name: "CheapestName.com", price: "SOLD", minOffer: "SOLD", url: "" },
  { name: "GettingQuote.com", price: "$395", minOffer: "$100", url: "https://gettingquote.com" },
  { name: "YesCookies.com", price: "$395", minOffer: "$100", url: "https://yescookies.com" },
  { name: "CarTrending.com", price: "$395", minOffer: "$100", url: "https://cartrending.com" },
  { name: "GenerateIcons.com", price: "$395", minOffer: "$100", url: "https://generateicons.com" },
  { name: "WebsiteBooking.com", price: "$395", minOffer: "$100", url: "https://websitebooking.com" },
  { name: "GenerateChat.com", price: "SOLD", minOffer: "SOLD", url: "" },
  { name: "CarDrifts.com", price: "$395", minOffer: "$100", url: "https://cardrifts.com" },
  { name: "RelayShield.com", price: "$395", minOffer: "$100", url: "https://relayshield.com", tag: "NEW"},
  { name: "BuildHacks.com", price: "$395", minOffer: "$100", url: "https://buildhacks.com" },
  { name: "TalentAdvertising.com", price: "$395", minOffer: "$100", url: "https://talentadvertising.com" },
  { name: "SilverAutocare.com", price: "$395", minOffer: "$100", url: "https://silverautocare.com" },
  { name: "GymSetups.com", price: "SOLD", minOffer: "SOLD", url: "" },
  { name: "SourcingLead.com", price: "$395", minOffer: "$100", url: "https://sourcinglead.com" },
  { name: "TripLifestyle.com", price: "$395", minOffer: "$100", url: "https://triplifestyle.com" },
  { name: "DrawnStudio.com", price: "$395", minOffer: "$100", url: "https://drawnstudio.com" },
  { name: "TicketBuilders.com", price: "SOLD", minOffer: "SOLD", url: "" },
  { name: "BrandPrivate.com", price: "SOLD", minOffer: "SOLD", url: "" },
  { name: "StackMC.com", price: "$395", minOffer: "$100", url: "https://stackmc.com" },
  { name: "MediaBundles.com", price: "$395", minOffer: "$100", url: "https://mediabundles.com" },
  { name: "PayoutLoan.com", price: "$395", minOffer: "$100", url: "https://payoutloan.com" },
  { name: "Mineforged.com", price: "SOLD", minOffer: "SOLD", url: "" },
  { name: "TrialChambers.com", price: "$395", minOffer: "$100", url: "https://trialchambers.com" },
  { name: "JewelMC.com", price: "SOLD", minOffer: "SOLD", url: "" },
  { name: "ProjectRune.com", price: "$395", minOffer: "$100", url: "https://projectrune.com" },
  { name: "CarResell.com", price: "$395", minOffer: "$100", url: "https://carresell.com" },
  { name: "WaterAquarium.com", price: "$395", minOffer: "$100", url: "https://wateraquarium.com" },
  { name: "LuggageSizes.com", price: "$395", minOffer: "$100", url: "https://luggagesizes.com" },
  { name: "LoveBaked.com", price: "$395", minOffer: "$100", url: "https://lovebaked.com" },
  { name: "ElitePill.com", price: "$395", minOffer: "$100", url: "https://elitepill.com" },
  { name: "MineQuests.com", price: "$395", minOffer: "$100", url: "https://minequests.com" },
  { name: "VaultRPG.com", price: "$395", minOffer: "$100", url: "https://vaultrpg.com" },
  { name: "DomainExcellence.com", price: "$395", minOffer: "$100", url: "https://domainexcellence.com" },
  { name: "RepairedHome.com", price: "$395", minOffer: "$100", url: "https://repairedhome.com" },
]

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
  const [showSoldOnly, setShowSoldOnly] = useState(false)

  useEffect(() => {
    const trackPageView = () => {
      if (typeof window !== "undefined" && window.v7Analytics) {
        window.v7Analytics.trackPageView({
          url: window.location.href,
          referrer: document.referrer,
          title: document.title,
          timestamp: new Date().toISOString(),
        })
      }
    }

    const trackInteraction = (domainName: string) => {
      if (typeof window !== "undefined" && window.v7Analytics) {
        window.v7Analytics.trackEvent({
          event: "domain_click",
          properties: {
            domain: domainName,
            timestamp: new Date().toISOString(),
          },
        })
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
    }
  }

  const sortedDomains = useMemo(() => {
    const newDomains = domains.filter((d) => d.tag === "NEW")
    const otherDomains = domains.filter((d) => d.tag !== "NEW")

    for (let i = otherDomains.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[otherDomains[i], otherDomains[j]] = [otherDomains[j], otherDomains[i]]
    }

    return [...newDomains, ...otherDomains]
  }, [])

  const filteredDomains = showSoldOnly
    ? sortedDomains.filter((d) => d.price === "SOLD")
    : sortedDomains

  return (
    <div className="min-h-screen bg-white">
      <header className="container mx-auto py-10 text-center">
        <Badge
          variant="outline"
          className="bg-black text-white border-0 px-4 py-1 text-sm font-medium rounded-full mb-4"
        >
          WHOLESALE PRICES
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight text-black mb-3">
          Wholesale Domain Marketplace
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Unbeatable prices on aftermarket domains. Direct wholesale to you.
        </p>
        <p className="text-sm text-purple-600 max-w-2xl mx-auto mt-1">
          Last Updated: 03/07/25 at 22:34
        </p>
        <div className="flex justify-center items-center gap-2 mt-6">
          <Switch
            id="showSold"
            checked={showSoldOnly}
            onCheckedChange={setShowSoldOnly}
          />
          <Label htmlFor="showSold" className="text-sm text-gray-700">
            Show Only Sold Domains
          </Label>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDomains.map((domain) => (
            <Link
              href={domain.url || "#"}
              key={domain.name}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block relative ${
                domain.price === "SOLD" ? "pointer-events-none" : ""
              }`}
              onClick={() => handleDomainClick(domain.name)}
            >
              <Card className="overflow-hidden border border-gray-200 hover:border-purple-300 hover:shadow-sm transition-all duration-200 relative">
                <CardContent className="p-4">
                  <div className="grid grid-cols-[1fr,auto] gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-black truncate group-hover:text-purple-1000 transition-colors duration-200">
                          {domain.name}
                        </h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs uppercase font-medium text-gray-1000 mb-1">
                            Wholesale Price
                          </p>
                          <p className="text-base font-bold text-black">
                            {domain.price}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase font-medium text-gray-1000 mb-1">
                            Min Offer
                          </p>
                          <p className="text-sm font-medium text-purple-1000 flex items-center">
                            <TrendingDown className="h-3 w-3 mr-1 inline-block" />
                            {domain.minOffer}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <div className="flex items-center gap-2">
                        {domain.tag && (
                          <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                            {domain.tag}
                          </span>
                        )}
                        <div className="bg-gray-100 rounded-full h-6 w-6 flex items-center justify-center group-hover:bg-purple-100 transition-colors duration-200">
                          <ArrowUpRight className="h-3 w-3 text-gray-1000 group-hover:text-purple-1000 transition-colors duration-200" />
                        </div>
                      </div>

                      <div className="w-full mt-4">
                        {domain.price === "SOLD" ? (
                          <Button
                            disabled
                            className="w-full bg-gray-300 text-gray-600 h-9 cursor-not-allowed"
                          >
                            Sold
                          </Button>
                        ) : (
                          <Button className="w-full bg-black hover:bg-purple-600 transition-colors duration-200 h-9">
                            Buy Now
                          </Button>
                        )}
                      </div>
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
