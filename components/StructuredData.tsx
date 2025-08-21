'use client'

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Coffee Trends Weekly",
    "url": "https://coffeetrendsweekly.com",
    "logo": "https://coffeetrendsweekly.com/logo.png",
    "description": "Korean coffee trends newsletter for coffee shop owners. Get 4 profitable trends every Tuesday with recipes and supplier information.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "url": "https://coffeetrendsweekly.com/about"
    },
    "sameAs": [
      "https://twitter.com/coffeetrendsweekly",
      "https://instagram.com/coffeetrendsweekly"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Coffee Trends Weekly",
    "url": "https://coffeetrendsweekly.com",
    "description": "Korean coffee trends newsletter for coffee shop owners",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://coffeetrendsweekly.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Korean Coffee Trends Newsletter",
    "description": "Weekly newsletter delivering 4 profitable Korean coffee trends to US coffee shop owners. Includes recipes, supplier information, and profit analysis.",
    "provider": {
      "@type": "Organization",
      "name": "Coffee Trends Weekly"
    },
    "serviceType": "Newsletter Subscription",
    "areaServed": "United States",
    "audience": {
      "@type": "Audience",
      "audienceType": "Coffee Shop Owners"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free weekly newsletter subscription"
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do Korean coffee trends predict the US market?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Korean coffee trends typically arrive in the US market 6-12 months after becoming popular in Seoul. This pattern has been consistent with drinks like Dalgona Coffee, which was popular in Korea 8 months before going viral in the US."
        }
      },
      {
        "@type": "Question",
        "name": "What's included in the weekly newsletter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Each Tuesday, you receive 4 verified Korean coffee trends with complete recipes, supplier contact information, cost breakdowns, profit projections, and implementation guides for US coffee shops."
        }
      },
      {
        "@type": "Question",
        "name": "How much do coffee shops make from these trends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Coffee shops report $8K-12K additional monthly revenue from implementing Korean trends. Black Pepper Latte has an 82% profit margin, while Dutch Einspanner shows 85% margins with 94% success rates."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}