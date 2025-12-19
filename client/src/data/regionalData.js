export const regionalData = [
    {
        id: 'dhaka',
        name: 'Dhaka',
        overview: {
            climate: 'Hot and humid summer, mild winter.',
            soil: 'Mostly alluvial, loamy soil suitable for various crops.',
            rainfall: 'Moderate to high, especially during monsoon.',
            salinity: 'Low salinity in most areas.'
        },
        recommendedPlants: [
            { name: 'Brinjal (Eggplant)', image: '/plants/brinjal.png' },
            { name: 'Chili', image: '/plants/chili.png' },
            { name: 'Spinach', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80' },
            { name: 'Marigold', image: '/plants/marigold.png' }
        ],
        tips: [
            'Ensure good drainage for potted plants due to heavy rainfall.',
            'Use organic compost to enrich the loamy soil.',
            'Water daily during the dry winter months.'
        ],
        commonProblems: 'Waterlogging during monsoon can cause root rot. Aphids and mites are common pests.'
    },
    {
        id: 'chittagong',
        name: 'Chattogram',
        overview: {
            climate: 'Tropical monsoon climate, high humidity.',
            soil: 'Hilly, slightly acidic, and sandy loam in coastal areas.',
            rainfall: 'Very high annual rainfall.',
            salinity: 'Moderate to high in coastal belts.'
        },
        recommendedPlants: [
            { name: 'Lemon', image: '/plants/lemon.png' },
            { name: 'Turmeric', image: '/plants/turmeric.png' },
            { name: 'Guava', image: '/plants/guava.png' },
            { name: 'Hibiscus', image: '/plants/hibiscus.png' }
        ],
        tips: [
            'Use raised beds to prevent erosion on slopes.',
            'Add lime to neutralize acidic soil if necessary.',
            'Protect plants from strong coastal winds.'
        ],
        commonProblems: 'Soil erosion in hilly areas. Fungal diseases due to high humidity.'
    },
    {
        id: 'khulna',
        name: 'Khulna',
        overview: {
            climate: 'Humid, prone to cyclones.',
            soil: 'Saline and clayey due to proximity to the Sundarbans.',
            rainfall: 'Moderate rainfall.',
            salinity: 'High salinity is a major challenge.'
        },
        recommendedPlants: [
            { name: 'Coconut', image: '/plants/coconut.png' },
            { name: 'Date Palm', image: '/plants/date_palm.png' },
            { name: 'Watermelon', image: '/plants/watermelon.png' },
            { name: 'Betel Nut', image: '/plants/betel_nut.png' }
        ],
        tips: [
            'Choose salt-tolerant plant varieties.',
            'Flush soil with fresh water to reduce salinity.',
            'Use raised beds with imported soil for sensitive plants.'
        ],
        commonProblems: 'High soil salinity limits crop choice. Water scarcity in dry season.'
    },
    {
        id: 'rajshahi',
        name: 'Rajshahi',
        overview: {
            climate: 'Hot, dry summer and cold winter.',
            soil: 'Loamy to sandy loam, low moisture retention.',
            rainfall: 'Lowest rainfall in the country.',
            salinity: 'Low.'
        },
        recommendedPlants: [
            { name: 'Mango', image: '/plants/mango.png' },
            { name: 'Litchi', image: '/plants/litchi.png' },
            { name: 'Tomato', image: '/plants/tomato.png' },
            { name: 'Wheat', image: '/plants/wheat.png' }
        ],
        tips: [
            'Mulch heavily to retain soil moisture.',
            'Drip irrigation is highly recommended.',
            'Plant drought-resistant varieties.'
        ],
        commonProblems: 'Drought and heat stress. Low organic matter in soil.'
    },
    {
        id: 'barisal',
        name: 'Barishal',
        overview: {
            climate: 'Tropical, tidal flooding is common.',
            soil: 'Fertile silt and clay deposits.',
            rainfall: 'High rainfall.',
            salinity: 'Moderate, often affected by tidal surges.'
        },
        recommendedPlants: [
            { name: 'Guava', image: '/plants/guava.png' },
            { name: 'Hog Plum (Amra)', image: '/plants/hog_plum.png' },
            { name: 'Okra', image: '/plants/okra.png' },
            { name: 'Pumpkin', image: '/plants/pumpkin.png' }
        ],
        tips: [
            'Practice "Sorjan" method (floating gardens) if needed.',
            'Utilize the rich silt deposits for planting.',
            'Monitor for tidal water levels.'
        ],
        commonProblems: 'Waterlogging and tidal surges can damage crops.'
    },
    {
        id: 'sylhet',
        name: 'Sylhet',
        overview: {
            climate: 'Wettest region, moderate temperature.',
            soil: 'Acidic, tea-growing soil, hilly terrain.',
            rainfall: 'Extremely high rainfall.',
            salinity: 'Low.'
        },
        recommendedPlants: [
            { name: 'Tea', image: '/plants/tea.png' },
            { name: 'Orange', image: '/plants/orange.png' },
            { name: 'Pineapple', image: '/plants/pineapple.png' },
            { name: 'Lemon', image: '/plants/lemon.png' }
        ],
        tips: [
            'Ensure excellent drainage to prevent root rot in high rain.',
            'Add lime to manage soil acidity.',
            'Terrace farming on hill slopes.'
        ],
        commonProblems: 'Excessive rainfall can cause leaching of nutrients. Flash floods.'
    },
    {
        id: 'rangpur',
        name: 'Rangpur',
        overview: {
            climate: 'Subtropical, heavy fog in winter.',
            soil: 'Sandy to sandy loam.',
            rainfall: 'Moderate.',
            salinity: 'Low.'
        },
        recommendedPlants: [
            { name: 'Tobacco', image: '/plants/tobacco.png' },
            { name: 'Potato', image: 'https://images.unsplash.com/photo-1593708697557-f2feca483132?q=80&w=7360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
            { name: 'Corn', image: 'https://images.unsplash.com/photo-1551810080-3eb3be72d3f4?q=80&w=6000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
            { name: 'Ginger', image: 'https://images.unsplash.com/photo-1749928439086-37ecca26edc0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ],
        tips: [
            'Irrigate regularly during dry spells.',
            'Use organic matter to improve water retention in sandy soil.',
            'Protect winter crops from cold snaps.'
        ],
        commonProblems: 'Cold injury in winter. Soil moisture deficit in summer.'
    },
    {
        id: 'mymensingh',
        name: 'Mymensingh',
        overview: {
            climate: 'Warm and humid, moderate winter.',
            soil: 'Old Brahmaputra floodplain, fertile loam.',
            rainfall: 'High rainfall.',
            salinity: 'Low.'
        },
        recommendedPlants: [
            { name: 'Jackfruit', image: 'https://images.unsplash.com/photo-1714040292671-14e9722d1a09?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
            { name: 'Rice', image: 'https://images.unsplash.com/photo-1599385108614-86b8fce547ef?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
            { name: 'Mustard', image: 'https://images.unsplash.com/photo-1651664545671-92658b50b4c5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
            { name: 'Banana', image: 'https://images.unsplash.com/photo-1661349082600-dc9ff4b48ab4?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ],
        tips: [
            'Suitable for aquaculture integrated farming.',
            'Maintain soil fertility with crop rotation.',
            'Harvest rainwater for dry season use.'
        ],
        commonProblems: 'Flash floods in low-lying areas. Pest attacks on rice.'
    }
];
