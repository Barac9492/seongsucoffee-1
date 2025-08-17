'use client'

interface VenueFeature {
  venue_id: string
  date: string
  d_index: number
  o_index: number
  c_index: number
  s_index: number
}

interface VenueGridProps {
  features: VenueFeature[]
}

const VENUE_NAMES: Record<string, string> = {
  'onion_seongsu': 'Onion Seongsu',
  'layered_seongsu': 'Layered',
  'daelim_changgo': 'Daelim Changgo',
  'fritz_seongsu': 'Fritz Coffee',
  'knotted_seongsu': 'Knotted',
  'blue_bottle_seongsu': 'Blue Bottle',
  'center_coffee': 'Center Coffee',
  'anthracite_seongsu': 'Anthracite'
}

function getIndexColor(value: number): string {
  if (value >= 0.7) return 'bg-red-500'
  if (value >= 0.4) return 'bg-yellow-500' 
  return 'bg-green-500'
}

function getIndexLabel(type: string): string {
  switch (type) {
    case 'd': return 'Dopamine (Novelty)'
    case 'o': return 'Oxytocin (Social)'
    case 'c': return 'Cortisol (Urgency)'
    case 's': return 'Serotonin (Satisfaction)'
    default: return type
  }
}

export default function VenueGrid({ features }: VenueGridProps) {
  // Group by venue and take latest
  const latestByVenue = features.reduce((acc, feature) => {
    if (!acc[feature.venue_id] || new Date(feature.date) > new Date(acc[feature.venue_id].date)) {
      acc[feature.venue_id] = feature
    }
    return acc
  }, {} as Record<string, VenueFeature>)

  const venues = Object.values(latestByVenue).sort((a, b) => 
    (b.d_index + b.o_index) - (a.d_index + a.o_index)
  )

  if (venues.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <div className="text-4xl mb-4">📊</div>
        <div className="text-lg font-medium">No venue data available</div>
        <div className="text-sm">Check back after the agent collects more signals</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <div key={venue.venue_id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">
                {VENUE_NAMES[venue.venue_id] || venue.venue_id}
              </h3>
              <span className="text-xs text-gray-500">
                {new Date(venue.date).toLocaleDateString()}
              </span>
            </div>
            
            <div className="space-y-2">
              {(['d', 'o', 'c', 's'] as const).map((index) => {
                const value = venue[`${index}_index` as keyof VenueFeature] as number || 0
                return (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {getIndexLabel(index)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getIndexColor(value)}`}
                          style={{ width: `${Math.max(0, Math.min(100, value * 100))}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono w-8 text-right">
                        {value.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
            
            <div className="mt-3 pt-3 border-t">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Buzz Score</span>
                <span className="font-medium">
                  {((venue.d_index + venue.o_index) / 2).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}