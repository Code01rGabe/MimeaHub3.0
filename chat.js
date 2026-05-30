// ==========================================================================
// AI FARM ASSISTANT CHAT - Local Knowledge Base
// ==========================================================================

const chatMessages = [];
let isWaitingForResponse = false;

function sendMessage() {
    const input = document.getElementById('chat-input');
    if (!input) return;
    
    const message = input.value.trim();
    if (!message || isWaitingForResponse) return;
    
    addMessage('user', message);
    input.value = '';
    input.focus();
    showTyping();
    
    // Simulate thinking time
    setTimeout(() => {
        removeTyping();
        const response = getLocalResponse(message);
        addMessage('bot', response);
        isWaitingForResponse = false;
    }, 600 + Math.random() * 800);
}

function askQuick(question) {
    const input = document.getElementById('chat-input');
    if (input) {
        input.value = question;
        sendMessage();
    }
}

function addMessage(type, text) {
    const container = document.getElementById('chat-messages');
    if (!container) return;
    
    if (type === 'user') {
        // User message - right aligned, blue
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-msg';
        msgDiv.style.cssText = 'display: flex; justify-content: flex-end;';
        msgDiv.innerHTML = `
            <div style="
                max-width: 80%;
                padding: 10px 16px;
                border-radius: 18px;
                border-bottom-right-radius: 6px;
                font-size: 12px;
                line-height: 1.5;
                background: #58a6ff;
                color: white;
                box-shadow: 0 2px 8px rgba(88, 166, 255, 0.2);
            ">${text}</div>
        `;
        container.appendChild(msgDiv);
    } else {
        // Bot message - left aligned with avatar, glass effect
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-msg';
        msgDiv.style.cssText = 'display: flex; gap: 8px; align-items: flex-start;';
        msgDiv.innerHTML = `
            <div class="bot-avatar">🤖</div>
            <div style="
                max-width: 80%;
                padding: 10px 16px;
                border-radius: 18px;
                border-bottom-left-radius: 6px;
                font-size: 12px;
                line-height: 1.6;
                background: var(--bg-hollow);
                color: var(--text-primary);
                border: 1px solid var(--border-dim);
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            ">
                ${text}
                <div style="font-size: 9px; color: var(--text-secondary); margin-top: 4px; opacity: 0.6;">
                    ${new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                </div>
            </div>
        `;
        container.appendChild(msgDiv);
    }
    
    container.scrollTop = container.scrollHeight;
}

function showTyping() {
    const container = document.getElementById('chat-messages');
    if (!container) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-msg typing-indicator';
    typingDiv.style.cssText = 'display: flex; gap: 8px; align-items: flex-start;';
    typingDiv.innerHTML = `
        <div class="bot-avatar">🤖</div>
        <div style="
            padding: 12px 16px;
            border-radius: 18px;
            border-bottom-left-radius: 6px;
            background: var(--bg-hollow);
            border: 1px solid var(--border-dim);
            display: flex;
            align-items: center;
            gap: 6px;
        ">
            <span style="font-size: 11px; color: var(--text-secondary);">Thinking</span>
            <span class="typing-dots">
                <span></span><span></span><span></span>
            </span>
        </div>
    `;
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
}

function removeTyping() {
    const typing = document.querySelector('.typing-indicator');
    if (typing) typing.remove();
}

function getLocalResponse(message) {
    const msg = message.toLowerCase();
    
    // =====================================================================
    // GREETINGS
    // =====================================================================
    if (msg.includes('hello') || msg.includes('hi ') || msg.includes('hey') || msg === 'hi') {
        return "👋 Hello farmer! I'm your MimeaHub assistant. I can help with plant diseases, organic treatments, pest control, watering tips, soil management, and much more. What would you like to know?";
    }
    
    if (msg.includes('habari') || msg.includes('jambo') || msg.includes('vipi')) {
        return "👋 Habari! Mimi ni msaidizi wako wa MimeaHub. Ninaweza kusaidia kuhusu magonjwa ya mimea, matibabu, udhibiti wa wadudu, na kilimo kwa ujumla. Unauliza nini?";
    }
    
    if (msg.includes('how are you') || msg.includes('how do you work')) {
        return "I'm doing great! 🌱 I'm your offline farming assistant with knowledge about plant diseases, treatments, and best farming practices. Just ask me anything about farming and I'll help!";
    }
    
    if (msg.includes('who are you') || msg.includes('what are you')) {
        return "I'm the MimeaHub Farm Assistant 🤖! I help farmers diagnose plant diseases, recommend treatments (organic & chemical), and share farming best practices. I work completely offline so you can use me anywhere!";
    }


    
    // =====================================================================
    // TOMATO DISEASES
    // =====================================================================
    if ((msg.includes('tomato') || msg.includes('nyanya')) && (msg.includes('blight') || msg.includes('mnyauko'))) {
        return "🍅 Tomato Late Blight (Phytophthora infestans):\n\n• Symptoms: Dark water-soaked spots on leaves, white fuzzy growth underneath, brown lesions on stems\n• Organic treatment: Copper fungicide or baking soda spray (1 tbsp soda + 1 tsp liquid soap + 1 gallon water) every 7 days\n• Chemical: Mancozeb or Ridomil Gold\n• Prevention: Space plants 2-3 feet apart, water at base, mulch around plants, rotate crops for 3 years";
    }
    
    if (msg.includes('tomato') && msg.includes('spot')) {
        return "🍅 Tomato Septorifa Leaf Spot:\n\n• Symptoms: Small dark spots with light centers on lower leaves first\n• Organic: Remove infected leaves, apply copper spray\n• Chemical: Chlorothalonil every 7-14 days\n• Prevention: Water at base, mulch heavily, improve air circulation";
    }
    
    if (msg.includes('tomato') && msg.includes('wilt')) {
        return "🍅 Tomato Fusarium Wilt:\n\n• Symptoms: Yellowing leaves on one side, wilting during day, brown streaks in stems\n• Treatment: No cure once infected - remove and destroy plants\n• Prevention: Use resistant varieties (labeled 'F' resistant), solarize soil, maintain soil pH 6.5-7.0";
    }
    
    if (msg.includes('tomato') && msg.includes('yellow')) {
        return "🍅 Yellowing Tomato Leaves could mean:\n• Overwatering - let soil dry between watering\n• Nitrogen deficiency - add compost or fish emulsion\n• Magnesium deficiency - add Epsom salt (1 tbsp per gallon)\n• Early blight - apply fungicide\n• Check undersides for pests like aphids or whiteflies";
    }
    
    // =====================================================================
    // POTATO DISEASES
    // =====================================================================
    if ((msg.includes('potato') || msg.includes('viazi')) && (msg.includes('blight') || msg.includes('mnyauko'))) {
        return "🥔 Potato Early Blight (Alternaria solani):\n\n• Symptoms: Dark brown spots with concentric rings on older leaves, yellowing around spots\n• Organic: Neem oil spray every 7 days, remove infected leaves\n• Chemical: Chlorothalonil or Azoxystrobin\n• Prevention: 3-year crop rotation, use certified seed potatoes, avoid overhead irrigation";
    }
    
    if (msg.includes('potato') && msg.includes('scab')) {
        return "🥔 Potato Scab:\n\n• Symptoms: Rough, corky patches on tubers\n• Treatment: Lower soil pH to 5.0-5.2 using sulfur\n• Prevention: Keep soil evenly moist during tuber formation, use resistant varieties, avoid fresh manure";
    }
    
    // =====================================================================
    // GENERAL DISEASES
    // =====================================================================
    if (msg.includes('powdery mildew') || msg.includes('white powder')) {
        return "🔍 Powdery Mildew:\n\n• Symptoms: White powdery coating on leaves, distorted growth\n• Organic: Baking soda spray (1 tbsp + 1 tsp soap + 1 gallon water), milk spray (1 part milk : 9 parts water)\n• Chemical: Sulfur-based fungicides\n• Prevention: Improve air circulation, avoid overhead watering, plant resistant varieties";
    }
    
    if (msg.includes('rust') && msg.includes('leaf')) {
        return "🔍 Leaf Rust:\n\n• Symptoms: Orange-brown pustules on leaf undersides\n• Organic: Neem oil, sulfur spray\n• Chemical: Propiconazole or Tebuconazole\n• Prevention: Remove infected leaves, improve air flow, avoid wetting foliage";
    }
    
    if (msg.includes('root rot') || msg.includes('rotting root')) {
        return "🔍 Root Rot:\n\n• Symptoms: Wilting despite moist soil, brown mushy roots, stunted growth\n• Treatment: Remove affected plants, improve drainage\n• Prevention: Don't overwater, ensure good drainage, use raised beds, avoid compacted soil";
    }
    
    // =====================================================================
    // ORGANIC TREATMENTS
    // =====================================================================
    if (msg.includes('organic') || msg.includes('natural') || msg.includes('asili') || msg.includes('kikabaila')) {
        return "🌿 Organic Treatment Options:\n\n• Neem oil - Broad spectrum pest & fungus control\n• Copper fungicide - For blights and leaf spots\n• Baking soda spray - Prevents powdery mildew\n• Compost tea - Boosts plant immunity\n• Garlic spray - Repels insects\n• Diatomaceous earth - Controls crawling pests\n• Companion planting - Marigolds repel nematodes\n• Beneficial insects - Ladybugs eat aphids\n\nStart with prevention through healthy soil!";
    }
    
    if (msg.includes('neem') || msg.includes('mwarobaini')) {
        return "🌿 Neem Oil:\n\n• Mix 2 tsp neem oil + 1 tsp liquid soap + 1 quart warm water\n• Spray on all leaf surfaces every 7-14 days\n• Controls: Aphids, whiteflies, mites, powdery mildew, early blight\n• Apply in evening to avoid leaf burn\n• Don't use on stressed plants or in hot sun";
    }
    
    if (msg.includes('baking soda') || msg.includes('magadi')) {
        return "🧂 Baking Soda Spray:\n\n• Mix 1 tablespoon baking soda + 1 teaspoon liquid soap + 1 gallon water\n• Spray weekly for powdery mildew and fungal diseases\n• Works by changing leaf surface pH\n• Don't overuse - can build up in soil\n• Test on small area first";
    }
    
    if (msg.includes('compost tea')) {
        return "🍵 Compost Tea:\n\n• Steep finished compost in water for 24-48 hours\n• Use 1 part compost to 5 parts water\n• Aerate with aquarium pump for best results\n• Apply as soil drench or foliar spray\n• Adds beneficial microbes to soil and plants";
    }
    
    // =====================================================================
    // CHEMICAL TREATMENTS
    // =====================================================================
    if (msg.includes('chemical') || msg.includes('kemikali') || msg.includes('synthetic')) {
        return "🧪 Chemical Treatments (Use as last resort):\n\n• Chlorothalonil - Broad spectrum fungicide\n• Mancozeb - Protective fungicide for blights\n• Azoxystrobin - Systemic fungicide\n• Imidacloprid - Systemic insecticide\n\n⚠️ Always: Wear protective gear, follow label instructions, observe pre-harvest intervals, rotate chemicals to prevent resistance";
    }
    
    if (msg.includes('pesticide') || msg.includes('insecticide') || msg.includes('dawa ya wadudu')) {
        return "🦟 Pesticide Guidelines:\n\n• Identify the pest before treating\n• Start with least toxic option first\n• Apply in evening when bees aren't active\n• Don't spray during bloom period\n• Observe pre-harvest intervals (PHI)\n• Store safely away from children\n• Dispose of containers properly";
    }
    
    // =====================================================================
    // PEST CONTROL
    // =====================================================================
    if (msg.includes('aphid') || msg.includes('aphids') || msg.includes('vidukari')) {
        return "🟢 Aphids Control:\n\n• Spray with strong water jet to dislodge\n• Neem oil or insecticidal soap spray\n• Introduce ladybugs or lacewings\n• Plant nasturtiums as trap crop\n• Yellow sticky traps for winged aphids\n• Check leaf undersides regularly";
    }
    
    if (msg.includes('whitefly') || msg.includes('white fly')) {
        return "🔘 Whitefly Control:\n\n• Yellow sticky traps - very effective\n• Neem oil spray every 5-7 days\n• Vacuum adults in early morning\n• Reflective mulch repels them\n• Introduce Encarsia wasps (natural predator)\n• Remove heavily infested leaves";
    }
    
    if (msg.includes('caterpillar') || msg.includes('worm') || msg.includes('viwavi')) {
        return "🐛 Caterpillar Control:\n\n• Hand pick and remove (check undersides)\n• Bt (Bacillus thuringiensis) spray - organic and effective\n• Neem oil disrupts feeding\n• Row covers prevent moths from laying eggs\n• Encourage birds in your garden";
    }
    
    if (msg.includes('mite') || msg.includes('spider mite')) {
        return "🕷️ Spider Mites:\n\n• Tiny red/brown dots on leaf undersides\n• Fine webbing on plants\n• Spray with water to knock them off\n• Neem oil or insecticidal soap\n• Increase humidity - mites hate moisture\n• Predatory mites for biological control";
    }
    
    if (msg.includes('pest') || msg.includes('insect') || msg.includes('wadudu')) {
        return "🐛 General Pest Management:\n\n1. Identify the pest first\n2. Start with physical controls (hand pick, water spray)\n3. Use organic sprays (neem, soap, garlic)\n4. Introduce beneficial insects\n5. Use chemicals only as last resort\n6. Practice prevention: healthy soil, companion planting, crop rotation";
    }

    // Add these inside the getLocalResponse function, before the default return

// Tomato Mosaic Virus
if (msg.includes('mosaic') || msg.includes('mosai')) {
    return "🦠 Tomato Mosaic Virus (ToMV): Causes light/dark green mottling on leaves, stunted growth, and distorted fruits. Spread by aphids, tools, and hands. Remove infected plants immediately. Disinfect tools with 10% bleach. Control aphids with neem oil. Prevention: Use resistant varieties, wash hands before handling plants.";
}

// Tomato Yellow Curl Virus
if (msg.includes('curl') || msg.includes('yellow curl') || msg.includes('njano')) {
    return "🟡 Tomato Yellow Leaf Curl Virus (TYLCV): Leaves curl upward and turn yellow, plant growth stunts. Transmitted by whiteflies. Remove infected plants. Use yellow sticky traps and neem oil for whiteflies. Prevention: resistant varieties, fine mesh netting, remove weed hosts.";
}

// Spider Mites
if (msg.includes('spider mite') || msg.includes('utitiri') || msg.includes('web')) {
    return "🕷️ Spider Mites: Tiny pests causing stippled yellow leaves and fine webbing. Thrive in hot, dry conditions. Spray plants with strong water jet, apply neem oil every 5-7 days. Increase humidity. For severe cases, use miticides. Prevention: avoid water stress, keep leaves dust-free.";
}

// Septoria Leaf Spot
if (msg.includes('septoria') || msg.includes('leaf spot')) {
    return "🍂 Septoria Leaf Spot: Small dark spots with light centers on lower leaves first, then spreads upward. Remove infected leaves immediately. Apply copper fungicide every 7-10 days. Mulch heavily to prevent soil splash. Water at base only. Rotate crops for 3 years.";
}

// Leaf Mold
if (msg.includes('leaf mold') || msg.includes('kuvu ya majani')) {
    return "🌫️ Tomato Leaf Mold (Passalora fulva): Yellow spots on upper leaf surface, olive-green fuzzy growth underneath. Common in greenhouses and humid conditions. Improve ventilation, reduce humidity. Apply copper fungicide or sulfur. Prevention: space plants properly, drip irrigation.";
}

// Bacterial Spot
if (msg.includes('bacterial spot') || msg.includes('bakteria')) {
    return "🦠 Bacterial Spot: Dark, water-soaked spots on leaves and fruits. Spread by rain splash and contaminated tools. Remove infected parts. Apply copper-based bactericides. Avoid overhead watering. Don't handle wet plants. Use certified disease-free seeds.";
}

// Healthy tomato
if ((msg.includes('healthy') || msg.includes('afya')) && msg.includes('tomato')) {
    return "🍅✅ Healthy Tomato Plants: Look for vibrant green leaves without spots, strong stems, and regular flowering. Maintain with consistent watering, mulching, and compost. Monitor weekly for early signs of pests. Prevention is key: crop rotation, proper spacing, and resistant varieties!";
}

// Healthy potato
if ((msg.includes('healthy') || msg.includes('afya')) && msg.includes('potato')) {
    return "🥔✅ Healthy Potato Plants: Look for dark green leaves, sturdy stems, and proper tuber development. Hill soil around plants. Maintain even moisture. Watch for Colorado potato beetles. Use certified seed potatoes and practice 3-year crop rotation.";
}
    
    // =====================================================================
    // CROP MANAGEMENT
    // =====================================================================
    if (msg.includes('rotation') || msg.includes('crop rotation') || msg.includes('mazao')) {
        return "🔄 Crop Rotation Guide:\n\n• Don't plant same crop family in same spot for 3-4 years\n• Example 4-year rotation:\n  Year 1: Tomatoes/Potatoes (nightshades)\n  Year 2: Beans/Peas (legumes - fix nitrogen)\n  Year 3: Corn (heavy feeder)\n  Year 4: Cabbage/Kale (brassicas)\n\n• Benefits: Breaks disease cycles, improves soil, reduces pests";
    }
    
    if (msg.includes('companion') || msg.includes('planting together')) {
        return "🌱 Companion Planting:\n\n• Tomatoes + Marigolds (repels nematodes)\n• Tomatoes + Basil (repels flies & mosquitoes)\n• Potatoes + Beans (beans fix nitrogen)\n• Corn + Beans + Squash ('Three Sisters')\n• Carrots + Onions (onions repel carrot fly)\n• Avoid: Tomatoes near potatoes (share diseases)\n• Avoid: Beans near onions (stunts growth)";
    }
    
    if (msg.includes('spacing') || msg.includes('distance') || msg.includes('nafasi')) {
        return "📏 Plant Spacing Guide:\n\n• Tomatoes: 18-24 inches apart, rows 3-4 feet\n• Potatoes: 12-15 inches apart, rows 2-3 feet\n• Maize: 8-12 inches apart, rows 2-3 feet\n• Beans: 3-4 inches apart, rows 18-24 inches\n• Kale/Cabbage: 18-24 inches apart\n\nGood spacing = better airflow = less disease!";
    }
    
    if (msg.includes('mulch') || msg.includes('mulching') || msg.includes('matandazo')) {
        return "🌾 Mulching Benefits:\n\n• Retains soil moisture (less watering)\n• Suppresses weeds\n• Prevents soil splash onto leaves (reduces disease)\n• Regulates soil temperature\n• Adds organic matter as it breaks down\n\nMaterials: straw, grass clippings, leaves, wood chips, black plastic (for heat-loving crops)";
    }
    
    // =====================================================================
    // WATERING
    // =====================================================================
    if (msg.includes('water') || msg.includes('irrigation') || msg.includes('maji') || msg.includes('kumwagilia')) {
        return "💧 Watering Best Practices:\n\n• Water early morning (reduces evaporation)\n• Water at soil level, not on leaves\n• Deep watering (1-2 inches/week) encourages deep roots\n• Drip irrigation is most efficient\n• Mulch to retain moisture\n• Wilting in morning = needs water\n• Wilting in afternoon heat = normal\n• Overwatering causes root rot";
    }
    
    if (msg.includes('drip') || msg.includes('drip irrigation')) {
        return "💧 Drip Irrigation:\n\n• Most efficient watering method\n• Delivers water directly to roots\n• Reduces weed growth (only waters crops)\n• Prevents leaf wetness (reduces disease)\n• Can be made from recycled materials\n• Use timer for automation\n• Combine with mulch for best results";
    }
    
    // =====================================================================
    // SOIL MANAGEMENT
    // =====================================================================
    if (msg.includes('soil') || msg.includes('udongo') || msg.includes('compost') || msg.includes('mbolea')) {
        return "🌍 Soil Health:\n\n• Add compost regularly (2-3 inches per season)\n• Test pH - most crops prefer 6.0-6.8\n• Add lime to raise pH, sulfur to lower\n• Avoid walking on wet soil (compacts it)\n• Use cover crops in off-season\n• Mulch protects soil structure\n• Healthy soil = healthy plants!\n\nNPK Basics:\n• N (Nitrogen) = Leaf growth\n• P (Phosphorus) = Root & flower development\n• K (Potassium) = Overall plant health";
    }
    
    if (msg.includes('fertilizer') || msg.includes('manure') || msg.includes('mbolea')) {
        return "🧪 Fertilizer Guide:\n\nOrganic options:\n• Compost - slow release, improves soil\n• Well-rotted manure - rich in nutrients\n• Fish emulsion - quick nitrogen boost\n• Bone meal - phosphorus for roots\n• Wood ash - potassium (use sparingly)\n\nApply during growing season, follow package rates, don't over-fertilize!";
    }
    
    if (msg.includes('ph') || msg.includes('acid') || msg.includes('alkaline')) {
        return "📊 Soil pH:\n\n• Most vegetables prefer pH 6.0-6.8\n• Too acidic (below 5.5): Add lime\n• Too alkaline (above 7.5): Add sulfur\n• Test soil before adjusting\n• Tomatoes like slightly acidic (6.0-6.5)\n• Potatoes like acidic (5.0-5.5) - prevents scab\n• Adjust pH gradually over months";
    }
    
    // =====================================================================
    // PLANTING & HARVESTING
    // =====================================================================
    if (msg.includes('plant') && (msg.includes('when') || msg.includes('season') || msg.includes('time'))) {
        return "📅 Planting Seasons (Kenya/East Africa):\n\nLong rains (March-May):\n• Tomatoes, potatoes, maize, beans, kale, cabbage\n\nShort rains (October-December):\n• Tomatoes, beans, peas, carrots, onions\n\nDry season (with irrigation):\n• Leafy greens, quick-maturing vegetables\n\nCheck local extension office for specific dates!";
    }
    
    if (msg.includes('harvest') || msg.includes('pick') || msg.includes('kupanda') || msg.includes('kuvuna')) {
        return "🌾 Harvest Tips:\n\n• Tomatoes: Pick when fully colored but still firm\n• Potatoes: Harvest when vines die back\n• Beans: Pick young for tender pods\n• Maize: Harvest when silks turn brown\n• Leafy greens: Pick outer leaves, let center grow\n\n• Harvest in morning for best flavor\n• Handle gently to avoid damage\n• Store in cool, dry place";
    }
    
    if (msg.includes('seed') && (msg.includes('save') || msg.includes('store'))) {
        return "🌱 Seed Saving:\n\n• Save seeds from best plants only\n• Let fruits fully ripen before collecting\n• Clean and dry seeds thoroughly\n• Store in paper envelopes (not plastic)\n• Label with variety and date\n• Keep in cool, dry, dark place\n• Most seeds last 2-5 years if stored properly\n• Don't save hybrid seeds (won't breed true)";
    }
    
    // =====================================================================
    // PREVENTION
    // =====================================================================
    if (msg.includes('prevent') || msg.includes('prevention') || msg.includes('kinga') || msg.includes('healthy')) {
        return "🛡️ Disease Prevention Checklist:\n\n✅ Use disease-resistant varieties\n✅ Practice crop rotation\n✅ Space plants properly\n✅ Water at base, not on leaves\n✅ Mulch around plants\n✅ Remove infected plants immediately\n✅ Clean tools between plants\n✅ Monitor crops weekly\n✅ Build healthy soil with compost\n✅ Control insect pests\n\nPrevention is always easier than cure!";
    }
    
    // =====================================================================
    // SPECIFIC CROPS
    // =====================================================================
    if (msg.includes('maize') || msg.includes('corn') || msg.includes('mahindi')) {
        return "🌽 Maize/Corn Tips:\n\n• Plant in blocks (not single rows) for better pollination\n• Heavy feeder - needs nitrogen-rich soil\n• Common diseases: leaf blight, rust, smut\n• Pest: Fall armyworm - use neem or Bt spray\n• Companion plants: beans and squash\n• Harvest when silks are brown and kernels are plump";
    }
    
    if (msg.includes('bean') || msg.includes('maharagwe')) {
        return "🫘 Beans:\n\n• Fix nitrogen in soil - great for crop rotation\n• Don't over-fertilize with nitrogen\n• Common issues: rust, aphids, bean beetles\n• Harvest regularly to encourage more production\n• Dry beans: let pods dry on plant before harvesting";
    }
    
    if (msg.includes('cabbage') || msg.includes('kale') || msg.includes('sukuma') || msg.includes('kabichi')) {
        return "🥬 Cabbage/Kale (Brassicas):\n\n• Heavy feeders - need rich soil\n• Common pests: aphids, cabbage worms, diamondback moth\n• Use Bt spray for caterpillars\n• Row covers prevent pest infestation\n• Rotate with non-brassica crops for 3 years\n• Harvest outer leaves of kale for continuous production";
    }
    
    if (msg.includes('onion') || msg.includes('garlic') || msg.includes('kitunguu')) {
        return "🧅 Onions/Garlic:\n\n• Plant in well-drained soil\n• Don't overwater - bulbs may rot\n• Harvest when tops fall over and dry\n• Cure in warm, dry place for 2 weeks before storage\n• Garlic planted in fall for summer harvest\n• Onions can be intercropped with carrots";
    }
    
    if (msg.includes('pepper') || msg.includes('pilipili')) {
        return "🌶️ Peppers:\n\n• Related to tomatoes - similar disease issues\n• Blossom end rot: add calcium, water consistently\n• Sunscald: provide some shade in hot areas\n• Harvest regularly to encourage more fruiting\n• Can be perennial in warm climates";
    }
    
    // =====================================================================
    // WEATHER & CLIMATE
    // =====================================================================
    if (msg.includes('rain') || msg.includes('mvua') || msg.includes('wet')) {
        return "🌧️ Rainy Season Farming:\n\n• Increase fungicide applications (preventive)\n• Improve drainage in fields\n• Stake plants to improve air flow\n• Harvest frequently to prevent rot\n• Watch for increased slug and snail activity\n• Plant on raised beds to prevent waterlogging";
    }
    
    if (msg.includes('dry') || msg.includes('drought') || msg.includes('ukame')) {
        return "☀️ Dry Season Farming:\n\n• Mulch heavily to retain moisture\n• Water deeply and less frequently\n• Use drip irrigation if possible\n• Choose drought-tolerant varieties\n• Plant in early morning or evening\n• Collect rainwater when available\n• Shade sensitive crops during hottest hours";
    }
    
    // =====================================================================
    // GENERAL TIPS
    // =====================================================================
    if (msg.includes('tip') || msg.includes('advice') || msg.includes('help') || msg.includes('saidia')) {
        return "💡 Top Farming Tips:\n\n1. Start with healthy soil - add compost\n2. Choose disease-resistant varieties\n3. Practice crop rotation\n4. Water in the morning at soil level\n5. Mulch everything\n6. Monitor plants weekly for problems\n7. Remove diseased plants immediately\n8. Keep garden tools clean\n9. Attract beneficial insects\n10. Keep records of what works!";
    }
    
    if (msg.includes('beginner') || msg.includes('start') || msg.includes('new farmer') || msg.includes('anza')) {
        return "🌱 Beginner Farmer Tips:\n\nStart small! Try these easy crops first:\n• Tomatoes (in pots or ground)\n• Kale/Sukuma Wiki (very hardy)\n• Beans (quick to harvest)\n• Onions (low maintenance)\n\n1. Prepare soil with compost\n2. Water regularly\n3. Watch for pests daily\n4. Harvest and enjoy!\n5. Learn from each season\n\nUse MimeaHub to scan plants when you see problems!";
    }
    
    // =====================================================================
    // THANKS & GOODBYE
    // =====================================================================
    if (msg.includes('thank') || msg.includes('thanks') || msg.includes('asante') || msg.includes('shukrani')) {
        return "You're welcome! 🌱 Happy farming! Remember to scan your plants regularly with the camera for early disease detection. Is there anything else I can help with?";
    }
    
    if (msg.includes('bye') || msg.includes('goodbye') || msg.includes('kwaheri')) {
        return "Kwaheri! 👋 Happy farming and remember - healthy plants start with healthy soil. Come back anytime you need help!";
    }
    
    // =====================================================================
    // DEFAULT / FALLBACK
    // =====================================================================
    return "I can help with many farming topics! Try asking about:\n\n🍅 Tomato diseases (blight, wilt, spots)\n🥔 Potato diseases (blight, scab)\n🌿 Organic treatments (neem, baking soda)\n🧪 Chemical options\n🐛 Pest control (aphids, whiteflies, caterpillars)\n💧 Watering tips\n🌍 Soil management\n🔄 Crop rotation\n🌱 Planting seasons\n\nOr scan your plant with the camera for instant disease diagnosis! 📷";
}

// =====================================================================
// INITIALIZE
// =====================================================================
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});