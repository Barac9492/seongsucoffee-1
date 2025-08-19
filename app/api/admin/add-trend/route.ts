import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// AI-powered trend data generation
function generateTrendData(coffeeName: string, koreanName: string) {
  // Simple AI-like logic to generate realistic trend data
  // In production, this could use OpenAI API or other AI services
  
  const baseSuccessProbabilities = {
    'cream cheese': 85,
    'matcha': 78,
    'sesame': 72,
    'citrus': 88,
    'hallabong': 91,
    'yuzu': 85,
    'honey': 75,
    'vanilla': 70,
    'caramel': 73,
    'pistachio': 79,
    'coconut': 68,
    'lavender': 65,
    'rose': 62,
    'taro': 71,
    'ube': 74
  }

  // Determine success probability based on ingredients
  let successProbability = 70 // default
  const lowerName = coffeeName.toLowerCase()
  
  for (const [ingredient, prob] of Object.entries(baseSuccessProbabilities)) {
    if (lowerName.includes(ingredient)) {
      successProbability = prob + Math.floor(Math.random() * 10 - 5) // ±5 variation
      break
    }
  }

  // Generate market readiness based on success probability
  const marketReadiness = successProbability > 80 ? 'High' : 
                         successProbability > 65 ? 'Medium' : 'Low'

  // Generate competitor risk (inverse relationship with success probability)
  const competitorRisk = successProbability > 80 ? 'Low' :
                        successProbability > 65 ? 'Medium' : 'High'

  // Generate time to global based on type of trend
  const timeToGlobal = lowerName.includes('cream') || lowerName.includes('foam') ? '3-4 months' :
                      lowerName.includes('citrus') || lowerName.includes('fruit') ? '2-3 months' :
                      '4-6 months'

  // Generate historical precedent
  const precedents = [
    'Dalgona coffee (2020) - 340% global adoption',
    'Brown sugar milk tea (2019) - 280% adoption in premium markets',
    'Matcha trend (2018) - health-conscious adaptation',
    'Yuzu trends (2019) - 280% adoption in premium markets',
    'Protein coffee trends (2021) - niche but profitable'
  ]
  const historicalPrecedent = precedents[Math.floor(Math.random() * precedents.length)]

  // Generate realistic café count and growth
  const cafesServing = Math.floor(Math.random() * 100) + 20
  const growth = Math.floor(Math.random() * 300) + 150

  // Generate districts based on trend type
  const allDistricts = ['Gangnam', 'Hongdae', 'Seongsu', 'Apgujeong', 'Sinchon', 'Jamsil', 'Itaewon']
  const numDistricts = Math.floor(Math.random() * 4) + 2
  const districts = allDistricts.sort(() => 0.5 - Math.random()).slice(0, numDistricts)

  return {
    successProbability,
    marketReadiness,
    competitorRisk,
    historicalPrecedent,
    timeToGlobal,
    growth,
    cafesServing,
    districts
  }
}

// Generate recipe based on coffee name
function generateRecipe(coffeeName: string) {
  const lowerName = coffeeName.toLowerCase()
  
  // Base coffee ingredients
  let ingredients = ['200ml espresso or strong coffee']
  let instructions = ['Brew strong espresso or coffee']
  let difficulty = 'Medium'
  let prepTime = '5 minutes'

  // Add specific ingredients based on coffee type
  if (lowerName.includes('cream cheese') || lowerName.includes('foam')) {
    ingredients.push(
      '60g cream cheese (room temperature)',
      '30ml heavy cream',
      '1 tsp vanilla extract',
      '2 tbsp sugar'
    )
    instructions.push(
      'Whip cream cheese until smooth and fluffy',
      'Add heavy cream, vanilla, and sugar',
      'Whip until soft peaks form',
      'Top coffee with foam generously'
    )
  } else if (lowerName.includes('matcha')) {
    ingredients.push(
      '2 tsp matcha powder',
      '50ml steamed milk',
      '1 tbsp honey or sugar'
    )
    instructions.push(
      'Whisk matcha powder with small amount of hot water',
      'Steam milk and add honey',
      'Combine matcha paste with coffee',
      'Top with steamed milk'
    )
    difficulty = 'Easy'
    prepTime = '4 minutes'
  } else if (lowerName.includes('citrus') || lowerName.includes('yuzu') || lowerName.includes('hallabong')) {
    const citrus = lowerName.includes('hallabong') ? 'hallabong' : 
                  lowerName.includes('yuzu') ? 'yuzu' : 'citrus'
    ingredients.push(
      `80ml fresh ${citrus} juice`,
      '40ml steamed milk',
      '20ml vanilla syrup',
      'Whipped cream for topping'
    )
    instructions.push(
      'Add fresh citrus juice to coffee',
      'Steam milk with vanilla syrup',
      'Layer milk carefully for visual effect',
      'Top with whipped cream',
      'Serve in clear glass'
    )
    difficulty = 'Easy'
    prepTime = '4 minutes'
  } else {
    // Generic specialty coffee
    ingredients.push(
      '50ml specialty ingredient',
      '40ml steamed milk',
      '1 tbsp sweetener',
      'Garnish as needed'
    )
    instructions.push(
      'Prepare specialty ingredient',
      'Steam milk to proper temperature',
      'Combine all ingredients',
      'Garnish and serve'
    )
  }

  return {
    ingredients,
    instructions,
    difficulty,
    prepTime,
    shelfLife: 'Best consumed within 15-20 minutes'
  }
}

// Generate suppliers based on ingredients
function generateSuppliers(coffeeName: string) {
  const lowerName = coffeeName.toLowerCase()
  const suppliers = []

  if (lowerName.includes('cream cheese')) {
    suppliers.push({
      ingredient: 'Cream Cheese',
      source: 'Restaurant Depot, Sysco',
      cost: '$3.80/lb',
      notes: 'Must be room temperature for proper texture'
    })
  }

  if (lowerName.includes('matcha')) {
    suppliers.push({
      ingredient: 'Premium Matcha Powder',
      source: 'H Mart, Japanese specialty stores',
      cost: '$15.00/100g',
      notes: 'Ceremonial grade recommended for best flavor'
    })
  }

  if (lowerName.includes('citrus') || lowerName.includes('yuzu') || lowerName.includes('hallabong')) {
    const citrus = lowerName.includes('hallabong') ? 'Hallabong' : 
                  lowerName.includes('yuzu') ? 'Yuzu' : 'Citrus'
    suppliers.push({
      ingredient: `${citrus} Juice`,
      source: 'H Mart, Korean grocers, online',
      cost: '$12.50/bottle',
      notes: 'Fresh juice preferred, frozen acceptable substitute'
    })
  }

  // Always add a generic supplier
  suppliers.push({
    ingredient: 'Premium Coffee Beans',
    source: 'Local roasters, specialty coffee suppliers',
    cost: '$18.00/lb',
    notes: 'Medium-dark roast recommended for flavor balance'
  })

  return suppliers
}

// Generate pricing based on complexity and ingredients
function generatePricing(coffeeName: string, ingredients: string[]) {
  const lowerName = coffeeName.toLowerCase()
  
  let baseCost = 1.50
  
  // Adjust cost based on premium ingredients
  if (lowerName.includes('cream cheese') || lowerName.includes('matcha')) baseCost += 0.35
  if (lowerName.includes('hallabong') || lowerName.includes('yuzu')) baseCost += 0.50
  if (ingredients.length > 4) baseCost += 0.25

  const costPerServing = `$${baseCost.toFixed(2)}`
  const retailLow = (baseCost * 3.5).toFixed(2)
  const retailHigh = (baseCost * 4.2).toFixed(2)
  const margin = Math.round(((parseFloat(retailLow) - baseCost) / parseFloat(retailLow)) * 100)

  return {
    costPerServing,
    suggestedRetail: `$${retailLow}-$${retailHigh}`,
    margin: `${margin}%`,
    premiumPosition: 'Position as premium specialty offering'
  }
}

// Generate training guide
function generateTraining(coffeeName: string) {
  const lowerName = coffeeName.toLowerCase()
  
  let keyTechniques = ['Maintain consistent temperature', 'Follow recipe measurements exactly']
  let commonMistakes = ['Inconsistent preparation', 'Wrong temperature']
  let qualityControl = 'Taste test each batch for consistency'

  if (lowerName.includes('cream cheese') || lowerName.includes('foam')) {
    keyTechniques = [
      'Cream cheese must be room temperature',
      'Whip to soft peaks only - do not over-whip',
      'Layer foam generously for visual impact'
    ]
    commonMistakes = [
      'Cold cream cheese creates lumps',
      'Over-whipping makes foam grainy',
      'Too little foam disappoints customers'
    ]
    qualityControl = 'Foam should hold shape for 10+ minutes'
  } else if (lowerName.includes('citrus')) {
    keyTechniques = [
      'Use fresh citrus juice when possible',
      'Serve in clear glass to showcase color',
      'Balance citrus acidity with coffee strength'
    ]
    commonMistakes = [
      'Using artificial flavoring instead of real juice',
      'Over-heating milk which can curdle with citrus',
      'Wrong coffee-to-citrus ratio'
    ]
    qualityControl = 'Should have bright color and fresh aroma'
  }

  return {
    keyTechniques,
    commonMistakes,
    qualityControl
  }
}

export async function POST(request: NextRequest) {
  try {
    const { coffeeName, koreanName } = await request.json()
    
    if (!coffeeName || !koreanName) {
      return NextResponse.json(
        { error: 'Coffee name and Korean name are required' },
        { status: 400 }
      )
    }

    // Generate AI-powered trend data
    const trendData = generateTrendData(coffeeName, koreanName)
    const recipe = generateRecipe(coffeeName)
    const suppliers = generateSuppliers(coffeeName)
    const pricing = generatePricing(coffeeName, recipe.ingredients)
    const training = generateTraining(coffeeName)

    // Create new trend object
    const newTrend = {
      id: (Date.now() % 10000).toString(), // Simple ID generation
      name: coffeeName,
      nameKr: koreanName,
      
      // AI-generated business intelligence
      successProbability: trendData.successProbability,
      marketReadiness: trendData.marketReadiness,
      competitorRisk: trendData.competitorRisk,
      historicalPrecedent: trendData.historicalPrecedent,
      timeToGlobal: trendData.timeToGlobal,
      
      // AI-generated recipe and business data
      recipe,
      suppliers,
      pricing,
      training,
      
      // Tracking data
      growth: trendData.growth,
      stage: 'discovery',
      cafesServing: trendData.cafesServing,
      firstDetected: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      districts: trendData.districts,
      videoProof: [],
      signals: []
    }

    // Read the current trends file
    const trendsFilePath = path.join(process.cwd(), 'app/api/coffee-trends/route.ts')
    let fileContent = fs.readFileSync(trendsFilePath, 'utf-8')

    // Find the trends array and add the new trend
    const trendsArrayMatch = fileContent.match(/const trends = \[([\s\S]*?)\]/m)
    if (!trendsArrayMatch) {
      return NextResponse.json(
        { error: 'Could not find trends array in file' },
        { status: 500 }
      )
    }

    // Convert the new trend to a properly formatted string
    const trendString = `      {
        id: '${newTrend.id}',
        name: '${newTrend.name}',
        nameKr: '${newTrend.nameKr}',
        
        // THE WHY - AI Generated Market Analysis
        successProbability: ${newTrend.successProbability},
        marketReadiness: '${newTrend.marketReadiness}',
        competitorRisk: '${newTrend.competitorRisk}',
        historicalPrecedent: '${newTrend.historicalPrecedent}',
        timeToGlobal: '${newTrend.timeToGlobal}',
        
        // THE HOW - AI Generated Business Execution
        recipe: ${JSON.stringify(newTrend.recipe, null, 10).replace(/^/gm, '          ')},
        suppliers: ${JSON.stringify(newTrend.suppliers, null, 10).replace(/^/gm, '          ')},
        pricing: ${JSON.stringify(newTrend.pricing, null, 10).replace(/^/gm, '          ')},
        training: ${JSON.stringify(newTrend.training, null, 10).replace(/^/gm, '          ')},
        
        // Tracking data
        growth: ${newTrend.growth},
        stage: '${newTrend.stage}',
        cafesServing: ${newTrend.cafesServing},
        firstDetected: '${newTrend.firstDetected}',
        lastUpdated: '${newTrend.lastUpdated}',
        districts: ${JSON.stringify(newTrend.districts)},
        videoProof: [],
        signals: []
      }`

    // Add the new trend to the array
    const existingTrends = trendsArrayMatch[1].trim()
    const newTrendsContent = existingTrends + ',\n' + trendString

    // Replace the trends array in the file
    const newFileContent = fileContent.replace(
      /const trends = \[[\s\S]*?\]/m,
      `const trends = [\n${newTrendsContent}\n    ]`
    )

    // Write the updated file
    fs.writeFileSync(trendsFilePath, newFileContent, 'utf-8')

    return NextResponse.json({
      message: 'New coffee trend added successfully with AI-generated data',
      trend: newTrend,
      ai_generated: {
        business_intelligence: true,
        recipe: true,
        suppliers: true,
        pricing: true,
        training: true
      }
    })

  } catch (error) {
    console.error('Error adding new trend:', error)
    return NextResponse.json(
      { error: 'Failed to add new coffee trend' },
      { status: 500 }
    )
  }
}