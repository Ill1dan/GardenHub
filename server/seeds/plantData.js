const basePlants = [
    {
        name: "Tomato",
        type: "Vegetable",
        water_freq: "Regularly",
        sunlight: "Full Sun",
        fertilizer_freq: "Weekly",
        image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80",
        varieties: ["Beefsteak", "Cherry", "Roma", "Heirloom", "Grape", "San Marzano", "Better Boy", "Early Girl", "Celebrity", "Brandywine", "Cherokee Purple", "Green Zebra", "Yellow Pear", "Campari", "Kumato"],
        problems: [
            { name: "Late Blight", type: "disease", symptoms: "Dark, water-soaked spots on leaves and fruit", solution: "Remove infected plants; ensure good air circulation; use copper fungicide." },
            { name: "Tomato Hornworm", type: "pest", symptoms: "Large green caterpillars eating leaves; defoliation", solution: "Handpick caterpillars; use Bt (Bacillus thuringiensis)." },
            { name: "Blossom End Rot", type: "environmental", symptoms: "Black, sunken spot on the bottom of the fruit", solution: "Maintain consistent watering; add calcium/lime to soil." },
            { name: "Aphids", type: "pest", symptoms: "Sticky sap on leaves; yellowing; ants present", solution: "Spray with neem oil or insecticidal soap." }
        ]
    },
    {
        name: "Rose",
        type: "Flower",
        water_freq: "Regularly",
        sunlight: "Full Sun",
        fertilizer_freq: "Bi-weekly",
        image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=800&q=80",
        varieties: ["Red", "White", "Pink", "Yellow", "Lavender", "Peach", "Coral", "Burgundy", "Orange", "Blue", "Black Baccara", "Peace", "Queen Elizabeth", "Double Delight", "Mister Lincoln"],
        problems: [
            { name: "Black Spot", type: "disease", symptoms: "Black spots with yellow halos on leaves", solution: "Remove infected leaves; spray with fungicide; avoid overhead watering." },
            { name: "Powdery Mildew", type: "disease", symptoms: "White powdery substance on leaves and stems", solution: "Improve air circulation; fungicidal soap; neem oil." },
            { name: "Japanese Beetle", type: "pest", symptoms: "Skeletonized leaves (holes between veins); damaged flowers", solution: "Handpick into soapy water; use beetle traps away from plants." },
            { name: "Rose Mosaic Virus", type: "disease", symptoms: "Yellow zigzag lines or patterns on leaves", solution: "No cure; remove and destroy infected plants." }
        ]
    },
    {
        name: "Pepper",
        type: "Vegetable",
        water_freq: "Regularly",
        sunlight: "Full Sun",
        fertilizer_freq: "Bi-weekly",
        image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80",
        varieties: ["Bell", "Jalapeno", "Habanero", "Serrano", "Cayenne", "Ghost", "Poblano", "Anaheim", "Thai Chili", "Scotch Bonnet", "Banana", "Shishito", "Carolina Reaper", "Tabasco", "Piri Piri"],
        problems: [
            { name: "Pepper Maggot", type: "pest", symptoms: "Rotting fruit; small holes in fruit", solution: "Use sticky traps; rotate crops." },
            { name: "Sunscald", type: "environmental", symptoms: "White or beige paper-like patches on fruit", solution: "Provide shade during peak heat; maintain leaf cover." },
            { name: "Bacterial Spot", type: "disease", symptoms: "Small water-soaked spots on leaves turning brown; holes in leaves", solution: "Copper-based sprays; remove infected debris." }
        ]
    },
    {
        name: "Cucumber",
        type: "Vegetable",
        water_freq: "Often",
        sunlight: "Full Sun",
        fertilizer_freq: "Bi-weekly",
        image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=800&q=80",
        varieties: ["Slicing", "Pickling", "English", "Persian", "Lemon", "Armenian", "Kirby", "Gherkin", "Burpless", "Bush", "Japanese", "Telegraph", "Marketmore", "Spacemaster", "Crystal Apple"],
        problems: [
            { name: "Cucumber Beetle", type: "pest", symptoms: "Yellow striped or spotted beetles; bacterial wilt", solution: "Floating row covers; pyrethrin spray." },
            { name: "Downy Mildew", type: "disease", symptoms: "Yellow angular spots on leaves", solution: "Fungicides; plant resistant varieties." },
            { name: "Powdery Mildew", type: "disease", symptoms: "White powder on leaves", solution: "Neem oil; baking soda spray." }
        ]
    },
    {
        name: "Basil",
        type: "Herb",
        water_freq: "Regularly",
        sunlight: "Full Sun",
        fertilizer_freq: "Monthly",
        image: "https://images.unsplash.com/photo-1618160702438-6b7ed3a91aa6?auto=format&fit=crop&w=800&q=80",
        varieties: ["Sweet", "Thai", "Lemon", "Holy", "Purple", "Cinnamon", "Genovese", "Greek", "Lettuce Leaf", "Cardinal", "Spicy Globe", "Lime", "Dark Opal", "African Blue", "Mammoth"],
        problems: [
            { name: "Fusarium Wilt", type: "disease", symptoms: "Stunted growth; brown streaks on stems; wilting", solution: "Use disease-free seed; dispose of infected soil/plants." },
            { name: "Downy Mildew", type: "disease", symptoms: "Yellowing leaves; gray fuzz on undersides", solution: "Reduce humidity; improve airflow." }
        ]
    },
    {
        name: "Lettuce",
        type: "Vegetable",
        water_freq: "Often",
        sunlight: "Partial Shade",
        fertilizer_freq: "Monthly",
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=800&q=80",
        varieties: ["Iceberg", "Romaine", "Butterhead", "Loose-leaf", "Arugula", "Radicchio", "Endive", "Escarole", "Mizuna", "Oakleaf", "Batavia", "Bibb", "Boston", "Little Gem", "Celtuce"],
        problems: [
            { name: "Slugs/Snails", type: "pest", symptoms: "Large irregular holes in leaves; slime trails", solution: "Diatomaceous earth; beer traps; handpicking." },
            { name: "Tip Burn", type: "environmental", symptoms: "Browning edges of leaves", solution: "Consistent calcium; avoid irregular watering." }
        ]
    },
    {
        name: "Strawberry",
        type: "Fruit",
        water_freq: "Regularly",
        sunlight: "Full Sun",
        fertilizer_freq: "Monthly",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4b0aa?auto=format&fit=crop&w=800&q=80",
        varieties: ["Albion", "Chandler", "Seascape", "Eversweet", "Honeoye", "Sparkle", "Jewel", "Earliglow", "Allstar", "Ozark Beauty", "Fort Laramie", "Tristar", "Alpine", "Pineberry", "Camarosa"],
        problems: [
            { name: "Gray Mold (Botrytis)", type: "disease", symptoms: "Fuzzy gray mold on fruit", solution: "Harvest frequently; remove rotting fruit immediately." },
            { name: "Spider Mites", type: "pest", symptoms: "Yellow stippling on leaves; webbing", solution: "Spray water; insecticidal soap." }
        ]
    },
    {
        name: "Eggplant",
        type: "Vegetable",
        water_freq: "Regularly",
        sunlight: "Full Sun",
        fertilizer_freq: "Bi-weekly",
        image: "https://images.unsplash.com/photo-1615485400971-55db5dd3ee81?auto=format&fit=crop&w=800&q=80",
        varieties: ["Black Beauty", "Ichiban", "Thai", "White", "Italian", "Rosa Bianca", "Little Finger", "Ghostbuster", "Fairy Tale", "Kermit", "Ping Tung", "Listada de Gandia", "Graffiti", "Classic", "Oriental"],
        problems: [
            { name: "Flea Beetles", type: "pest", symptoms: "Small 'shot holes' in leaves", solution: "Row covers; neem oil; sticky traps." },
            { name: "Verticillium Wilt", type: "disease", symptoms: "Wilting leaves; vascular browning", solution: "Rotate crops; resistant varieties." }
        ]
    },
    {
        name: "Mint",
        type: "Herb",
        water_freq: "Moist",
        sunlight: "Partial Shade",
        fertilizer_freq: "Monthly",
        image: "https://images.unsplash.com/photo-1605330882417-063065b7418c?auto=format&fit=crop&w=800&q=80",
        varieties: ["Peppermint", "Spearmint", "Chocolate", "Apple", "Pineapple", "Ginger", "Orange", "Grapefruit", "Pennyroyal", "Watermint", "Corn", "Field", "Corsican", "Catmint", "Horsemint"],
        problems: [
            { name: "Rust", type: "disease", symptoms: "Orange pustules on leaf undersides", solution: "Remove infected leaves; avoid overhead watering." },
            { name: "Spider Mites", type: "pest", symptoms: "Webbing; yellow specks", solution: "Water spray; neem oil." }
        ]
    },
    {
        name: "Orchid",
        type: "Flower",
        water_freq: "Weekly",
        sunlight: "Indirect",
        fertilizer_freq: "Monthly",
        image: "https://images.unsplash.com/photo-1566956046279-d2243d4e0622?auto=format&fit=crop&w=800&q=80",
        varieties: ["Phalaenopsis", "Cattleya", "Dendrobium", "Oncidium", "Vanda", "Cymbidium", "Miltonia", "Paphiopedilum", "Brassia", "Encyclia", "Epidendrum", "Ludisia", "Maxillaria", "Zygopetalum", "Masdevallia"],
        problems: [
            { name: "Root Rot", type: "disease", symptoms: "Mushy, black roots; wilting", solution: "Repot in fresh media; reduce watering." },
            { name: "Mealybugs", type: "pest", symptoms: "White cottony masses on stems", solution: "Alcohol swab; insecticidal soap." }
        ]
    },
    {
        name: "Mango",
        type: "Fruit",
        water_freq: "Regularly",
        sunlight: "Full Sun",
        fertilizer_freq: "Quarterly",
        image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
        varieties: ["Alphonso", "Kesar", "Langra", "Dasheri", "Haden", "Tommy Atkins", "Kent", "Keitt", "Ataulfo", "Francis", "Palmer", "Glenn", "Valencia Pride", "Irwin", "Nam Doc Mai"],
        problems: [
            { name: "Anthracnose", type: "disease", symptoms: "Dark spots on leaves and fruit", solution: "Copper fungicide; remove dead twigs." },
            { name: "Mango Hopper", type: "pest", symptoms: "Sooty mold; drying of flower panicles", solution: "Insecticides; prune overcrowding branches." }
        ]
    },
    {
        name: "Hibiscus",
        type: "Flower",
        water_freq: "Regularly",
        sunlight: "Full Sun",
        fertilizer_freq: "Bi-weekly",
        image: "https://images.unsplash.com/photo-1552084117-56a987666449?auto=format&fit=crop&w=800&q=80",
        varieties: ["Rosa-sinensis", "Syriacus", "Moscheutos", "Sabdariffa", "Mutabilis", "Coccineus", "Arnottianus", "Brackenridgei", "Clay", "Grandiflorus", "Heterophyllus", "Indicus", "Lasiocarpus", "Macrophyllus", "Niveus"],
        problems: [
            { name: "Aphids", type: "pest", symptoms: "Curled leaves; sticky honeydew", solution: "Water blast; insecticidal soap." },
            { name: "Yellowing Leaves", type: "environmental", symptoms: "Leaves turning yellow and dropping", solution: "Check watering; nutrient deficiency (iron/magnesium)." }
        ]
    },
    {
        name: "Guava",
        type: "Fruit",
        water_freq: "Regularly",
        sunlight: "Full Sun",
        fertilizer_freq: "Monthly",
        image: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?auto=format&fit=crop&w=800&q=80",
        varieties: ["Allahabad Safeda", "L-49", "Apple Guava", "Strawberry Guava", "Pineapple Guava", "Beaumont", "Mexican Cream", "Red Malaysian", "White Indian", "Ruby X", "Sweet White", "Detwiler", "Hong Kong Pink", "Kilo", "Tropic White"],
        problems: [
            { name: "Fruit Fly", type: "pest", symptoms: "Larvae inside fruit; rotting", solution: "Pheromone traps; bag fruits." },
            { name: "Wilt", type: "disease", symptoms: "Yellowing leaves; sudden drying", solution: "Soil treatment with Trichoderma; avoid waterlogging." }
        ]
    },
    {
        name: "Zinnia",
        type: "Flower",
        water_freq: "Moderate",
        sunlight: "Full Sun",
        fertilizer_freq: "Monthly",
        image: "https://images.unsplash.com/photo-1599573801262-b4c4839cf94e?auto=format&fit=crop&w=800&q=80",
        varieties: ["Elegans", "Lilliput", "Thumbelina", "State Fair", "Cut and Come Again", "Benary's Giant", "Queeny Lime", "Zahara", "Profusion", "California Giant", "Envy", "Purple Prince", "Candy Cane", "Peppermint", "Polar Bear"],
        problems: [
            { name: "Powdery Mildew", type: "disease", symptoms: "White dust on leaves", solution: "Fungicides; avoid overhead water." },
            { name: "Leaf Spot", type: "disease", symptoms: "Reddish-brown spots", solution: "Remove infected parts; rotate crop." }
        ]
    }
];

export const generatePlantData = () => {
    const plants = [];

    basePlants.forEach(base => {
        base.varieties.forEach(variety => {
            plants.push({
                name: `${variety} ${base.name}`,
                type: base.type,
                water_freq: base.water_freq,
                sunlight: base.sunlight,
                fertilizer_freq: base.fertilizer_freq,
                problems: base.problems,
                diseases: base.problems.map(p => p.name).join(", "),
                scientific_name: `${base.name} ${variety.toLowerCase()}`,
                growth_conditions: `Needs ${base.sunlight} and ${base.water_freq} watering.`,
                image: base.image
            });
        });
        // Also add the base plant itself
        plants.push({
            name: base.name,
            type: base.type,
            water_freq: base.water_freq,
            sunlight: base.sunlight,
            fertilizer_freq: base.fertilizer_freq,
            problems: base.problems,
            diseases: base.problems.map(p => p.name).join(", "),
            scientific_name: `${base.name} spp.`,
            growth_conditions: `Needs ${base.sunlight} and ${base.water_freq} watering.`,
            image: base.image
        });
    });

    return plants;
};
