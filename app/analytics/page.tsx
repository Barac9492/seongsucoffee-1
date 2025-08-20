'use client'

import { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation'

interface AnalyticsData {
  totalUsers: number
  conversionRate: number
  avgRevenuePerUser: number
  planDistribution: {
    starter: number
    professional: number
    enterprise: number
  }
  topTrends: {
    name: string
    conversionRate: number
    revenue: number
  }[]
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({
    totalUsers: 2847,
    conversionRate: 23.4,
    avgRevenuePerUser: 1164,
    planDistribution: {
      starter: 35,
      professional: 52,
      enterprise: 13
    },
    topTrends: [
      { name: 'Cream Cheese Foam Coffee', conversionRate: 78, revenue: 24500 },
      { name: 'Brown Butter Latte', conversionRate: 65, revenue: 18200 },
      { name: 'Ube Cloud Coffee', conversionRate: 58, revenue: 15800 },
      { name: 'Honey Milk Tea Coffee', conversionRate: 52, revenue: 12400 }
    ]
  })

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="home" />
      
      {/* Analytics Dashboard */}
      <section className="pt-32 pb-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-light tracking-tight mb-3">Business Intelligence</h1>
            <p className="text-xl text-gray-600 font-light">Data-driven insights for strategic decisions</p>
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-3xl font-light mb-2">{data.totalUsers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Users</div>
              <div className="text-xs text-green-600 mt-1">+24% this month</div>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-3xl font-light mb-2">{data.conversionRate}%</div>
              <div className="text-sm text-gray-600">Conversion Rate</div>
              <div className="text-xs text-green-600 mt-1">+3.2% this month</div>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-3xl font-light mb-2">${data.avgRevenuePerUser}</div>
              <div className="text-sm text-gray-600">Avg Revenue Per User</div>
              <div className="text-xs text-green-600 mt-1">+18% this month</div>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-3xl font-light mb-2">$2.1M</div>
              <div className="text-sm text-gray-600">Total Customer Revenue</div>
              <div className="text-xs text-green-600 mt-1">+31% this month</div>
            </div>
          </div>
          
          {/* Plan Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-2xl font-light mb-6">Plan Distribution</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Professional Plan</span>
                  <span className="font-medium">{data.planDistribution.professional}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-black h-2 rounded-full" style={{width: `${data.planDistribution.professional}%`}}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Starter Plan</span>
                  <span className="font-medium">{data.planDistribution.starter}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{width: `${data.planDistribution.starter}%`}}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Enterprise Plan</span>
                  <span className="font-medium">{data.planDistribution.enterprise}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-400 h-2 rounded-full" style={{width: `${data.planDistribution.enterprise}%`}}></div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-light mb-6">Revenue Insights</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="text-lg font-medium">Professional Plan drives 68% of revenue</div>
                  <div className="text-sm text-gray-600">Sweet spot for customer lifetime value</div>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="text-lg font-medium">Enterprise upsell opportunity</div>
                  <div className="text-sm text-gray-600">42% of Professional customers qualify for Enterprise</div>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <div className="text-lg font-medium">Starter plan converts at 89%</div>
                  <div className="text-sm text-gray-600">Excellent entry point for acquisition</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Top Performing Trends */}
          <div>
            <h2 className="text-2xl font-light mb-6">Top Performing Trends</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 font-medium">Trend Name</th>
                    <th className="text-left py-4 font-medium">Conversion Rate</th>
                    <th className="text-left py-4 font-medium">Customer Revenue</th>
                    <th className="text-left py-4 font-medium">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topTrends.map((trend, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-4">{trend.name}</td>
                      <td className="py-4">{trend.conversionRate}%</td>
                      <td className="py-4">${trend.revenue.toLocaleString()}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          trend.conversionRate > 70 ? 'bg-green-100 text-green-800' :
                          trend.conversionRate > 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {trend.conversionRate > 70 ? 'Excellent' :
                           trend.conversionRate > 60 ? 'Good' : 'Average'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}