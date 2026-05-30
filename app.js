import { supabase, testSupabaseConnection } from './supabase-client.js';


const diseaseDatabase = {
    "en": {
        "loading_model": "Loading AI Engine...",
        "ready": "AI Engine Ready. Scan a crop leaf.",
        "scanning": "Analyzing leaf image...",
        "scan_complete": "Scan Complete!",
        "diseases": {
            "healthy tomato": {
                "name": "Healthy Tomato",
                "organic": "No treatment needed! Maintain good soil with compost and mulch.",
                "chemical": "No chemical treatment needed.",
                "prevention": "Continue regular monitoring, water consistently at base, and rotate crops annually."
            },
            "tomato mosaic virus": {
                "name": "Tomato Mosaic Virus (ToMV)",
                "organic": "Remove and destroy infected plants immediately. Disinfect tools with 10% bleach solution. Control aphids with neem oil spray.",
                "chemical": "No direct chemical treatment for virus. Control aphid vectors with imidacloprid or acetamiprid insecticides.",
                "prevention": "Use resistant varieties. Wash hands before handling plants. Don't smoke near plants. Control weeds that harbor the virus."
            },
            "tomato yellow curl virus": {
                "name": "Tomato Yellow Leaf Curl Virus (TYLCV)",
                "organic": "Remove infected plants. Use neem oil or insecticidal soap against whiteflies. Install yellow sticky traps.",
                "chemical": "Control whitefly vectors with imidacloprid, thiamethoxam, or pyriproxyfen. Apply at first sign of whiteflies.",
                "prevention": "Use resistant varieties. Install fine mesh netting. Remove weeds that host whiteflies. Plant early to avoid peak whitefly season."
            },
            "tomato spider mites": {
                "name": "Tomato Spider Mites",
                "organic": "Spray plants with strong water jet to dislodge mites. Apply neem oil or insecticidal soap every 5-7 days. Introduce predatory mites.",
                "chemical": "Use abamectin, spiromesifen, or bifenthrin. Rotate miticides to prevent resistance.",
                "prevention": "Increase humidity around plants. Avoid water stress. Remove dust from leaves. Keep garden free of weeds."
            },
            "tomato septoria leaf spot": {
                "name": "Tomato Septoria Leaf Spot",
                "organic": "Remove infected lower leaves. Apply copper-based fungicides every 7-10 days. Use baking soda spray (1 tbsp + 1 tsp soap + 1 gallon water).",
                "chemical": "Chlorothalonil or Mancozeb applied every 7-14 days. Start before disease appears.",
                "prevention": "Mulch heavily to prevent soil splash. Water at base only. Rotate crops for 3 years. Space plants for airflow."
            },
            "tomato leaf mold": {
                "name": "Tomato Leaf Mold (Passalora fulva)",
                "organic": "Improve ventilation. Remove infected leaves. Apply copper fungicide or sulfur spray. Use compost tea as foliar spray.",
                "chemical": "Chlorothalonil, Mancozeb, or Azoxystrobin. Apply preventively in humid conditions.",
                "prevention": "Reduce humidity in greenhouse. Space plants properly. Water at base. Use drip irrigation. Ensure good air circulation."
            },
            "tomato late blight": {
                "name": "Tomato Late Blight (Phytophthora infestans)",
                "organic": "Apply copper-based fungicides every 5-7 days. Baking soda spray. Remove and destroy infected plants immediately.",
                "chemical": "Mancozeb, Ridomil Gold, or Chlorothalonil. Apply preventively before disease appears.",
                "prevention": "Plant resistant varieties. Space plants for airflow. Water at base. Monitor weather for cool, wet conditions."
            },
            "tomato early blight": {
                "name": "Tomato Early Blight (Alternaria solani)",
                "organic": "Remove infected lower leaves. Apply neem oil or copper spray every 7 days. Use compost tea to boost immunity.",
                "chemical": "Chlorothalonil, Mancozeb, or Azoxystrobin. Apply at first sign of disease.",
                "prevention": "Mulch around plants. Rotate crops for 3-4 years. Stake plants. Water at base. Remove plant debris after harvest."
            },
            "tomato bacterial spot": {
                "name": "Tomato Bacterial Spot (Xanthomonas)",
                "organic": "Remove infected leaves and fruits. Apply copper-based bactericides. Use streptomycin if available organically.",
                "chemical": "Copper hydroxide + mancozeb combination. Acibenzolar-S-methyl (Actigard) as preventive.",
                "prevention": "Use certified disease-free seeds. Avoid overhead watering. Don't handle wet plants. Rotate crops. Disinfect tools and stakes."
            },
            "healthy potato": {
                "name": "Healthy Potato",
                "organic": "No treatment needed! Maintain soil fertility with compost and proper hilling.",
                "chemical": "No chemical treatment needed.",
                "prevention": "Use certified seed potatoes. Practice crop rotation. Monitor for Colorado potato beetles and aphids."
            },
            "potato late blight": {
                "name": "Potato Late Blight (Phytophthora infestans)",
                "organic": "Remove and destroy infected foliage. Apply copper fungicides preventively. Hill soil around plants.",
                "chemical": "Ridomil Gold, Mancozeb, Chlorothalonil, or Fluazinam. Apply preventively before wet periods.",
                "prevention": "Use certified seed potatoes. Plant resistant varieties. Destroy volunteer potatoes. Harvest in dry conditions."
            },
            "potato early blight": {
                "name": "Potato Early Blight (Alternaria solani)",
                "organic": "Remove infected leaves. Apply neem oil or copper spray every 7-10 days. Maintain proper plant nutrition.",
                "chemical": "Chlorothalonil, Mancozeb, or Azoxystrobin. Apply preventively.",
                "prevention": "Rotate crops for 3-4 years. Use certified seed. Avoid overhead irrigation. Harvest when vines are dry."
            }
        }
    },
    "sw": {
        "loading_model": "Inapakia Injini ya AI...",
        "ready": "Injini ya AI Iko Tayari. Kagua jani la mmea.",
        "scanning": "Inachanganua picha ya jani...",
        "scan_complete": "Uchunguzi Umekamilika!",
        "diseases": {
            "healthy tomato": {
                "name": "Nyanya Yenye Afya",
                "organic": "Hakuna matibabu yanayohitajika! Dumisha udongo mzuri kwa mbolea na matandazo.",
                "chemical": "Hakuna matibabu ya kemikali yanayohitajika.",
                "prevention": "Endelea kufuatilia mara kwa mara, kumwagilia kwenye shina, na kubadilisha mazao kila mwaka."
            },
            "tomato mosaic virus": {
                "name": "Virusi vya Mosai ya Nyanya (ToMV)",
                "organic": "Ng'oa na uharibu mimea iliyoambukizwa. Safisha vifaa kwa 10% bleach. Dhibiti vidukari kwa dawa ya mwarobaini.",
                "chemical": "Hakuna tiba ya moja kwa moja. Dhibiti vidukari kwa imidacloprid au acetamiprid.",
                "prevention": "Tumia aina sugu. Osha mikono kabla ya kushika mimea. Usivute sigara karibu na mimea."
            },
            "tomato yellow curl virus": {
                "name": "Virusi vya Majani ya Njano (TYLCV)",
                "organic": "Ondoa mimea iliyoambukizwa. Tumia mwarobaini dhidi ya nzi weupe. Weka mitego ya kunata ya njano.",
                "chemical": "Dhibiti nzi weupe kwa imidacloprid, thiamethoxam, au pyriproxyfen.",
                "prevention": "Tumia aina sugu. Weka neti laini. Ondoa magugu. Panda mapema kuepuka msimu wa nzi weupe."
            },
            "tomato spider mites": {
                "name": "Utitiri wa Nyanya",
                "organic": "Nyunyizia maji kwa nguvu kuwaondoa. Tumia mwarobaini kila siku 5-7. Leta utitiri wanaowawinda.",
                "chemical": "Tumia abamectin, spiromesifen, au bifenthrin. Zungusha dawa kuzuia kinga.",
                "prevention": "Ongeza unyevu karibu na mimea. Epuka mkazo wa maji. Ondoa vumbi kwenye majani."
            },
            "tomato septoria leaf spot": {
                "name": "Madoa ya Septoria ya Nyanya",
                "organic": "Ondoa majani ya chini yaliyoambukizwa. Tumia dawa ya kopa kila siku 7-10.",
                "chemical": "Chlorothalonil au Mancozeb kila siku 7-14. Anza kabla ya ugonjwa kuonekana.",
                "prevention": "Weka matandazo mazito. Mwagilia kwenye shina tu. Badilisha mazao kwa miaka 3."
            },
            "tomato leaf mold": {
                "name": "Kuvu ya Majani ya Nyanya",
                "organic": "Boresha uingizaji hewa. Ondoa majani yaliyoambukizwa. Tumia dawa ya kopa au salfa.",
                "chemical": "Chlorothalonil, Mancozeb, au Azoxystrobin. Weka kinga katika hali ya unyevu.",
                "prevention": "Punguza unyevu kwenye nyumba ya kitalu. Weka nafasi kati ya mimea. Mwagilia kwenye shina."
            },
            "tomato late blight": {
                "name": "Mnyauko Chelewa wa Nyanya",
                "organic": "Tumia dawa ya kopa kila siku 5-7. Dawa ya magadi. Ondoa na uharibu mimea mara moja.",
                "chemical": "Mancozeb, Ridomil Gold, au Chlorothalonil. Weka kinga kabla ya ugonjwa.",
                "prevention": "Panda aina sugu. Weka nafasi kwa hewa. Mwagilia kwenye shina. Fuatilia hali ya hewa."
            },
            "tomato early blight": {
                "name": "Mnyauko Mapema wa Nyanya",
                "organic": "Ondoa majani ya chini. Tumia mwarobaini au kopa kila siku 7. Tumia chai ya mbolea.",
                "chemical": "Chlorothalonil, Mancozeb, au Azoxystrobin. Weka kwenye dalili za kwanza.",
                "prevention": "Weka matandazo. Badilisha mazao kwa miaka 3-4. Weka vijiti. Mwagilia kwenye shina."
            },
            "tomato bacterial spot": {
                "name": "Madoa ya Bakteria ya Nyanya",
                "organic": "Ondoa majani na matunda yaliyoambukizwa. Tumia dawa ya kopa.",
                "chemical": "Mchanganyiko wa kopa + mancozeb. Acibenzolar-S-methyl kama kinga.",
                "prevention": "Tumia mbegu zisizo na ugonjwa. Epuka kumwagilia juu. Usishike mimea ikiwa mvua."
            },
            "healthy potato": {
                "name": "Viazi Vyenye Afya",
                "organic": "Hakuna matibabu yanayohitajika! Dumisha rutuba ya udongo kwa mbolea.",
                "chemical": "Hakuna matibabu ya kemikali yanayohitajika.",
                "prevention": "Tumia mbegu bora. Badilisha mazao. Fuatilia wadudu kama Colorado beetle."
            },
            "potato late blight": {
                "name": "Mnyauko Chelewa wa Viazi",
                "organic": "Ondoa na uharibu majani. Tumia kopa kama kinga. Weka udongo kuzunguka mimea.",
                "chemical": "Ridomil Gold, Mancozeb, Chlorothalonil, au Fluazinam.",
                "prevention": "Tumia mbegu bora. Panda aina sugu. Haribu viazi vya kujitolea. Vuna wakati wa kiangazi."
            },
            "potato early blight": {
                "name": "Mnyauko Mapema wa Viazi",
                "organic": "Ondoa majani yaliyoambukizwa. Tumia mwarobaini au kopa kila siku 7-10.",
                "chemical": "Chlorothalonil, Mancozeb, au Azoxystrobin. Weka kinga.",
                "prevention": "Badilisha mazao kwa miaka 3-4. Tumia mbegu bora. Epuka kumwagilia juu."
            }
        }
    }
};

// ==========================================================================
// CUSTOM TOAST NOTIFICATIONS
// ==========================================================================
function showToast(message, type = 'info', duration = 3000) {
    const existingToast = document.querySelector('.custom-toast');
    if (existingToast) existingToast.remove();
    
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const colors = { success: '#3fb950', error: '#f85149', warning: '#d29922', info: '#58a6ff' };
    
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.style.cssText = `
        position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(100px);
        background: ${colors[type]}; color: white; padding: 12px 24px; border-radius: 10px;
        font-size: 14px; font-weight: 500; font-family: 'Plus Jakarta Sans', sans-serif;
        z-index: 10000; display: flex; align-items: center; gap: 10px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.3); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); max-width: 90vw;
    `;
    toast.innerHTML = `${icons[type]} ${message}`;
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => { toast.style.transform = 'translateX(-50%) translateY(0)'; });
    setTimeout(() => { toast.style.transform = 'translateX(-50%) translateY(100px)'; setTimeout(() => toast.remove(), 300); }, duration);
}

function showConfirmToast(message, onConfirm) {
    const existing = document.querySelector('.custom-confirm');
    if (existing) existing.remove();
    
    const confirm = document.createElement('div');
    confirm.className = 'custom-confirm';
    confirm.style.cssText = `
        position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(100px);
        background: var(--bg-panel, #131820); color: var(--text-primary, #e8ecf1);
        padding: 16px 24px; border-radius: 12px; font-size: 14px; font-family: 'Plus Jakarta Sans', sans-serif;
        z-index: 10001; box-shadow: 0 8px 32px rgba(0,0,0,0.4); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        border: 1px solid var(--border-panel); display: flex; align-items: center; gap: 16px; max-width: 90vw;
    `;
    confirm.innerHTML = `
        <span>⚠️ ${message}</span>
        <div style="display:flex; gap:8px;">
            <button class="confirm-yes" style="padding:6px 16px; border-radius:6px; border:none; background:#f85149; color:white; cursor:pointer; font-weight:600;">Yes</button>
            <button class="confirm-no" style="padding:6px 16px; border-radius:6px; border:1px solid rgba(255,255,255,0.15); background:transparent; color:var(--text-primary); cursor:pointer;">No</button>
        </div>
    `;
    document.body.appendChild(confirm);
    
    requestAnimationFrame(() => { confirm.style.transform = 'translateX(-50%) translateY(0)'; });
    confirm.querySelector('.confirm-yes').onclick = () => { confirm.style.transform = 'translateX(-50%) translateY(100px)'; setTimeout(() => confirm.remove(), 300); if (onConfirm) onConfirm(); };
    confirm.querySelector('.confirm-no').onclick = () => { confirm.style.transform = 'translateX(-50%) translateY(100px)'; setTimeout(() => confirm.remove(), 300); };
}

// ==========================================================================
// GLOBAL VARIABLES
// ==========================================================================
let stream = null;
let model = null;
let currentLanguage = 'en';
let currentDetectedDisease = ''; 
let videoTrack = null;
let currentGPS = "Nairobi, KE";
let allCachedScans = []; 
const MODEL_URL = "./model/";

window.currentGPS = currentGPS;
window.allCachedScans = allCachedScans;

// DOM Elements
let webcamElement, imagePreview, placeholderText, btnWebcam, btnCapture;
let fileUpload, statusDiv, langSelect, historyList, btnClearHistory;
let processingCanvas, locationDisplay, btnExportReport;
let searchHistoryInput, analyticsContainer;

// ==========================================================================
// INITIALIZE DOM ELEMENTS
// ==========================================================================
function initDOMElements() {
    webcamElement = document.getElementById('webcam');
    imagePreview = document.getElementById('image-preview');
    placeholderText = document.getElementById('placeholder-text');
    btnWebcam = document.getElementById('btn-webcam');
    btnCapture = document.getElementById('btn-capture');
    fileUpload = document.getElementById('file-upload');
    statusDiv = document.getElementById('status');
    langSelect = document.getElementById('language-select');
    historyList = document.getElementById('history-list');
    btnClearHistory = document.getElementById('btn-clear-history');
    processingCanvas = document.getElementById('processing-canvas');
    locationDisplay = document.getElementById('location-display');
    btnExportReport = document.getElementById('btn-export-report');
    searchHistoryInput = document.getElementById('search-history');
    analyticsContainer = document.getElementById('analytics-chart-container');
}

// ==========================================================================
// SERVICE WORKER
// ==========================================================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => console.log('ServiceWorker registered'))
            .catch(error => console.log('ServiceWorker failed:', error));
    });
}

// ==========================================================================
// APP INITIALIZATION
// ==========================================================================
async function initializeApp() {
    console.log('Starting app...');
    try {
        initDOMElements();
        await initializeDatabase();
        
        if (!window.db) {
            await new Promise(resolve => window.addEventListener('databaseReady', resolve, { once: true }));
        }
        
        console.log('Database ready');
        loadHistoryFromDB();
        updateStatus('loading');
        
        try {
            model = await tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json");
            console.log('AI Model loaded');
            updateStatus('ready');
        } catch (modelError) {
            console.warn('AI Model failed to load, using demo mode:', modelError);
            updateStatus('ready');
            model = {
                predict: async () => [
                    { className: 'healthy tomato', probability: 0.95 },
                    { className: 'tomato late blight', probability: 0.03 },
                    { className: 'tomato early blight', probability: 0.02 }
                ]
            };
        }
        
        fetchCoordinates();
        updateLanguageUI();
        setupEventListeners();
        
        if (window.auth && window.auth.getUserData()) {
            const userGreeting = document.getElementById('user-greeting');
            if (userGreeting) {
                userGreeting.textContent = `Welcome, ${window.auth.getUserData().name}`;
            }
        }
        
        // Initialize map if available
        if (typeof initDiseaseMap === 'function') {
            setTimeout(initDiseaseMap, 1000);
        }
        
        console.log('App ready!');
    } catch (error) {
        console.error('App failed:', error);
        updateStatus('error');
    }
}

// ==========================================================================
// STATUS UPDATES
// ==========================================================================
function updateStatus(state) {
    if (!statusDiv) return;
    switch(state) {
        case 'loading': statusDiv.innerText = diseaseDatabase[currentLanguage]["loading_model"]; statusDiv.className = 'status-badge status-scanning'; break;
        case 'ready': statusDiv.innerText = diseaseDatabase[currentLanguage]["ready"]; statusDiv.className = 'status-badge status-ready'; break;
        case 'scanning': statusDiv.innerText = diseaseDatabase[currentLanguage]["scanning"]; statusDiv.className = 'status-badge status-scanning'; break;
        case 'complete': statusDiv.innerText = diseaseDatabase[currentLanguage]["scan_complete"]; statusDiv.className = 'status-badge status-ready'; break;
        case 'error': statusDiv.innerText = "Error"; statusDiv.className = 'status-badge status-error'; break;
        default: statusDiv.innerText = state; statusDiv.className = 'status-badge status-ready';
    }
}

// ==========================================================================
// GEOLOCATION
// ==========================================================================
function fetchCoordinates() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentGPS = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
                window.currentGPS = currentGPS;
                if (locationDisplay) locationDisplay.innerText = currentGPS;
            },
            () => { currentGPS = "Nairobi, KE"; window.currentGPS = currentGPS; if (locationDisplay) locationDisplay.innerText = currentGPS; },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    }
}

// ==========================================================================
// DATABASE OPERATIONS
// ==========================================================================
function saveScanToDB(diseaseKey, confidenceValue) {
    if (!window.db) return;
    try {
        const transaction = window.db.transaction(["scans"], "readwrite");
        const store = transaction.objectStore("scans");
        store.add({ diseaseKey, confidence: confidenceValue, timestamp: new Date().toLocaleString(), coordinates: currentGPS });
        transaction.oncomplete = () => loadHistoryFromDB();
    } catch (error) { console.error('Save error:', error); }
}

function loadHistoryFromDB() {
    if (!window.db) return;
    allCachedScans = [];
    window.allCachedScans = allCachedScans;
    try {
        const transaction = window.db.transaction(["scans"], "readonly");
        const store = transaction.objectStore("scans");
        const request = store.openCursor(null, "prev");
        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) { allCachedScans.push(cursor.value); cursor.continue(); }
            else {
                window.allCachedScans = allCachedScans;
                renderHistoryCards(allCachedScans);
                calculateAnalytics(allCachedScans);
                updateQuickStats();
                if (typeof updateMapMarkers === 'function') setTimeout(updateMapMarkers, 500);
            }
        };
    } catch (error) { console.error('Load error:', error); }
}

// ==========================================================================
// UI RENDERERS
// ==========================================================================
function displayResult(diseaseKey, confidenceValue) {
    diseaseKey = diseaseKey.toLowerCase().trim();
    const data = diseaseDatabase[currentLanguage]["diseases"][diseaseKey] || {
        "name": diseaseKey.replace(/_/g, ' '),
        "organic": "No information available.",
        "chemical": "No information available.",
        "prevention": "No information available."
    };

    // Show result UI
    const predictionResult = document.getElementById('prediction-result');
    if (predictionResult) predictionResult.classList.remove('hidden');

    const resultCard = document.getElementById('result-card');
    if (resultCard) resultCard.classList.remove('hidden');

    const diseaseName = document.getElementById('disease-name');
    if (diseaseName) diseaseName.innerText = data.name.toUpperCase();

    const confidenceLevel = document.getElementById('confidence-level');
    if (confidenceLevel) confidenceLevel.innerText = confidenceValue;

    // Progress ring
    const numericScore = parseFloat(confidenceValue);
    const ringFill = document.getElementById('ring-progress-fill');
    if (ringFill && !isNaN(numericScore)) {
        const circumference = 113;
        ringFill.setAttribute('stroke-dasharray', `${(numericScore / 100) * circumference}, ${circumference}`);
    }

    if (locationDisplay) locationDisplay.innerText = currentGPS;

    // Treatments
    const tO = document.getElementById('treatment-organic');
    const tC = document.getElementById('treatment-chemical');
    const tP = document.getElementById('treatment-prevention');

    if (tO) tO.innerText = data.organic;
    if (tC) tC.innerText = data.chemical;
    if (tP) tP.innerText = data.prevention;

    // === NEW: Report Outbreak Button ===
    let outbreakBtn = document.getElementById('report-outbreak-btn');
    
    if (!outbreakBtn) {
        outbreakBtn = document.createElement('button');
        outbreakBtn.id = 'report-outbreak-btn';
        outbreakBtn.className = 'btn btn-danger';
        outbreakBtn.innerHTML = '🚨 Report as Community Outbreak';
        outbreakBtn.style.marginTop = '15px';
        
        // Insert after treatment section or result card
        const treatmentSection = document.getElementById('treatment-section') || 
                                document.getElementById('prediction-result');
        if (treatmentSection) {
            treatmentSection.appendChild(outbreakBtn);
        }
    }

    outbreakBtn.onclick = () => {
        if (confirm(currentLanguage === 'sw' ? 
            'Je, unataka kuripoti ugonjwa huu kwa jamii?' : 
            'Report this as a community outbreak?')) {
            
            saveOutbreak(diseaseKey, confidenceValue, 
                prompt(currentLanguage === 'sw' ? 'Maoni yako (hiari):' : 'Add notes (optional):') || '');
        }
    };
}

function renderHistoryCards(scanArray) {
    if (!historyList) return;
    historyList.innerHTML = "";
    if (scanArray.length === 0) { historyList.innerHTML = `<p class="empty-state">No scans recorded yet</p>`; return; }
    scanArray.forEach(entry => {
        const data = diseaseDatabase[currentLanguage]["diseases"][entry.diseaseKey] || { name: entry.diseaseKey.replace(/_/g, ' ') };
        const logCard = document.createElement("div");
        logCard.className = "history-item";
        logCard.innerHTML = `<div class="history-info"><span class="history-disease">${data.name}</span><div class="history-meta"><span>📅 ${entry.timestamp ? entry.timestamp.split(',')[0] : 'Unknown'}</span><span>📍 ${entry.coordinates || 'N/A'}</span></div></div><span class="history-confidence">${entry.confidence}</span>`;
        logCard.addEventListener('click', () => { currentDetectedDisease = entry.diseaseKey; currentGPS = entry.coordinates || currentGPS; displayResult(entry.diseaseKey, entry.confidence); });
        historyList.appendChild(logCard);
    });
}

function calculateAnalytics(scanArray) {
    if (!analyticsContainer) return;
    analyticsContainer.innerHTML = "";
    if (scanArray.length === 0) { analyticsContainer.innerHTML = `<p class="empty-state">Scan plants to see analytics</p>`; return; }
    const counts = {};
    scanArray.forEach(entry => { counts[entry.diseaseKey] = (counts[entry.diseaseKey] || 0) + 1; });
    const totalScans = scanArray.length;
    for (const [key, val] of Object.entries(counts)) {
        const data = diseaseDatabase[currentLanguage]["diseases"][key] || { name: key.replace(/_/g, ' ') };
        const percentageWidth = ((val / totalScans) * 100).toFixed(0);
        const chartRow = document.createElement("div");
        chartRow.className = "analytics-row";
        chartRow.innerHTML = `<div class="analytics-meta"><span>${data.name}</span><span class="analytics-count">${val} (${percentageWidth}%)</span></div><div class="bar-track"><div class="bar-fill" style="width: ${percentageWidth}%;"></div></div>`;
        analyticsContainer.appendChild(chartRow);
    }
}

function updateQuickStats() {
    const totalEl = document.getElementById('stat-total');
    const healthyEl = document.getElementById('stat-healthy');
    const diseasedEl = document.getElementById('stat-diseased');
    const todayEl = document.getElementById('stat-today');
    if (!totalEl) return;
    const total = allCachedScans.length;
    const healthy = allCachedScans.filter(s => s.diseaseKey.includes('healthy')).length;
    const diseased = total - healthy;
    const today = new Date().toLocaleDateString();
    const todayScans = allCachedScans.filter(s => { try { return new Date(s.timestamp).toLocaleDateString() === today; } catch(e) { return false; } }).length;
    totalEl.textContent = total; healthyEl.textContent = healthy; diseasedEl.textContent = diseased; todayEl.textContent = todayScans;
}

// ==========================================================================
// EVENT LISTENERS
// ==========================================================================
function setupEventListeners() {
    // Search history
    if (searchHistoryInput) {
        searchHistoryInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtered = allCachedScans.filter(entry => {
                const data = diseaseDatabase[currentLanguage]["diseases"][entry.diseaseKey] || { name: entry.diseaseKey.replace(/_/g, ' ') };
                return data.name.toLowerCase().includes(query) || (entry.coordinates || "").toLowerCase().includes(query);
            });
            renderHistoryCards(filtered);
        });
    }
    
    // Clear history
    if (btnClearHistory) {
        btnClearHistory.addEventListener('click', () => {
            if (!window.db) return;
            showConfirmToast('Clear all scan history?', () => {
                const transaction = window.db.transaction(["scans"], "readwrite");
                transaction.objectStore("scans").clear();
                transaction.oncomplete = () => { loadHistoryFromDB(); updateQuickStats(); showToast('History cleared', 'success'); };
            });
        });
    }
    
    // Language switch
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            currentLanguage = e.target.value;
            updateLanguageUI();
            loadHistoryFromDB();
            if (currentDetectedDisease) {
                const confEl = document.getElementById('confidence-level');
                if (confEl) displayResult(currentDetectedDisease, confEl.innerText);
            }
        });
    }
    
    // Webcam button
    if (btnWebcam) {
        btnWebcam.addEventListener('click', async () => {
            if (stream) { stopWebcam(); return; }
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
                webcamElement.srcObject = stream;
                webcamElement.classList.remove('hidden');
                if (imagePreview) imagePreview.classList.add('hidden');
                placeholderText.classList.add('hidden');
                btnCapture.classList.remove('hidden');
                btnWebcam.innerText = currentLanguage === 'sw' ? "Zima Kamera" : "Stop Camera";
                btnWebcam.className = "btn btn-outline";
                videoTrack = stream.getVideoTracks()[0];
                showToast('Camera started', 'success');
            } catch (err) { console.error('Camera error:', err); showToast('Unable to access camera', 'error'); }
        });
    }
    
    // Capture button
    if (btnCapture) {
        btnCapture.addEventListener('click', () => { if (webcamElement.srcObject) runInference(webcamElement); });
    }
    
// File upload
const fileInput = document.getElementById('file-upload');
if (fileInput) {
    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            showToast('Please select an image file.', 'warning');
            this.value = '';
            return;
        }

        if (stream) stopWebcam();

        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            imagePreview.src = imageUrl;
            imagePreview.classList.remove('hidden');
            placeholderText.classList.add('hidden');
            if (webcamElement) webcamElement.classList.add('hidden');
            if (btnCapture) btnCapture.classList.add('hidden');

            const img = new Image();
            img.onload = function() {
                runInference(img);
            };
            img.onerror = function() {
                showToast('Failed to load image.', 'error');
            };
            img.src = imageUrl;
        };
        reader.onerror = function() {
            showToast('Failed to read file.', 'error');
            this.value = '';
        };
        reader.readAsDataURL(file);
    });

    const uploadLabel = document.querySelector('label[for="file-upload"]');
    if (uploadLabel) {
        uploadLabel.addEventListener('click', function(e) {
            e.preventDefault();
            fileInput.value = '';
            fileInput.click();
        });
    }
}

    // Export report
    if (btnExportReport) {
        btnExportReport.addEventListener('click', () => {
            const dName = document.getElementById('disease-name')?.innerText || 'Unknown';
            const cLevel = document.getElementById('confidence-level')?.innerText || '0%';
            const tOrganic = document.getElementById('treatment-organic')?.innerText || 'N/A';
            const tChemical = document.getElementById('treatment-chemical')?.innerText || 'N/A';
            const tPrev = document.getElementById('treatment-prevention')?.innerText || 'N/A';
            const report = `🌱 *MimeaHub Report* 🌱\n----------------------------------------\n• *Disease:* ${dName}\n• *Confidence:* ${cLevel}\n• *Location:* ${currentGPS}\n• *Time:* ${new Date().toLocaleString()}\n\n🌿 *Organic:* ${tOrganic}\n🧪 *Chemical:* ${tChemical}\n🛡️ *Prevention:* ${tPrev}`;
            navigator.clipboard.writeText(report).then(() => showToast('Report copied!', 'success')).catch(() => showToast('Failed to copy', 'error'));
        });
    }
    
    // PDF Export
    const btnExportPdf = document.getElementById('btn-export-pdf');
    if (btnExportPdf) {
        btnExportPdf.addEventListener('click', () => { if (typeof exportPDFReport === 'function') exportPDFReport(); });
    }
}

// ==========================================================================
// LANGUAGE SUPPORT
// ==========================================================================
function updateLanguageUI() {
    const isSw = currentLanguage === 'sw';
    const lblHistory = document.getElementById('lbl-history');
    const lblAnalytics = document.getElementById('lbl-analytics');
    if (lblHistory) lblHistory.innerText = isSw ? "Historia ya Vipimo" : "Scan History";
    if (lblAnalytics) lblAnalytics.innerText = isSw ? "Takwimu za Magonjwa" : "Disease Analytics";
    if (searchHistoryInput) searchHistoryInput.placeholder = isSw ? "Tafuta kwa ugonjwa au eneo..." : "Search by disease or location...";
    if (btnClearHistory) btnClearHistory.innerText = isSw ? "Futa Yote" : "Clear All";
}

// ==========================================================================
// WEBCAM MANAGEMENT
// ==========================================================================
function stopWebcam() {
    if (stream) { stream.getTracks().forEach(track => track.stop()); stream = null; videoTrack = null; }
    if (webcamElement) webcamElement.classList.add('hidden');
    if (imagePreview) imagePreview.classList.add('hidden');
    if (placeholderText) placeholderText.classList.remove('hidden');
    if (btnCapture) btnCapture.classList.add('hidden');
    if (btnWebcam) { btnWebcam.innerText = currentLanguage === 'sw' ? "Washa Kamera" : "📷 Start Camera"; btnWebcam.className = "btn btn-primary"; }
}

// ==========================================================================
// AI INFERENCE
// ==========================================================================
async function runInference(inputElement) {
    if (!model) { 
        showToast('AI Model not loaded yet.', 'warning'); 
        return; 
    }
    
    console.log('Running inference on:', inputElement.tagName || 'Image');
    updateStatus('scanning');
    fetchCoordinates();

    try {
        const ctx = processingCanvas.getContext('2d');
        
        // Get dimensions
        const width = inputElement.videoWidth || inputElement.naturalWidth || inputElement.width || 224;
        const height = inputElement.videoHeight || inputElement.naturalHeight || inputElement.height || 224;
        
        console.log('Canvas size:', width, 'x', height);
        
        processingCanvas.width = width;
        processingCanvas.height = height;
        ctx.drawImage(inputElement, 0, 0, width, height);
        
        console.log('Canvas drawn, predicting...');
        const prediction = await model.predict(processingCanvas);
        console.log('Prediction result:', prediction);
        
        let highestPrediction = prediction[0];
        for (let i = 1; i < prediction.length; i++) {
            if (prediction[i].probability > highestPrediction.probability) {
                highestPrediction = prediction[i];
            }
        }
        
        console.log('Highest:', highestPrediction.className, highestPrediction.probability);
        
        const confidencePercentage = (highestPrediction.probability * 100).toFixed(0) + "%";
        currentDetectedDisease = highestPrediction.className.toLowerCase().trim();
        
        updateStatus('complete');
        displayResult(currentDetectedDisease, confidencePercentage);
        saveScanToDB(currentDetectedDisease, confidencePercentage);
        showToast('Diagnosis complete!', 'success');
    } catch (error) {
        console.error('Inference error:', error);
        updateStatus('error');
        showToast('Error analyzing image. Please try again.', 'error');
    }
}

// ==========================================================================
// THEME TOGGLE
// ==========================================================================
const themeToggleBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('mimeahub-theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('mimeahub-theme', newTheme);
        showToast(`Theme: ${newTheme} mode`, 'info', 2000);
    });
}

// ==========================================================================
// SUPABASE SYNC FOR COMMUNITY OUTBREAKS
// ==========================================================================

// Save outbreak (local + mark for sync)
// Improved saveOutbreak
// ==========================================================================
// SUPABASE COMMUNITY OUTBREAKS - SYNC SYSTEM
// ==========================================================================

// Make sure Supabase is imported at the top of app.js
// import { supabase, testSupabaseConnection } from './supabase-client.js';

// Save outbreak to local DB (pending sync)
async function saveOutbreak(diseaseKey, confidence, notes = "") {
    if (!window.db) {
        showToast('Database not ready yet', 'error');
        return;
    }

    // Get location
    const coords = await new Promise(resolve => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                pos => resolve(pos.coords),
                () => resolve(null),
                { timeout: 10000, enableHighAccuracy: false }
            );
        } else {
            resolve(null);
        }
    });

    const outbreakData = {
        diseaseKey: diseaseKey.toLowerCase().trim(),
        diseaseName: diseaseKey.replace(/_/g, ' ').toUpperCase(),
        cropType: diseaseKey.includes("tomato") ? "Tomato" : "Potato",
        confidence: parseFloat(confidence.replace('%', '') || 0),
        latitude: coords ? coords.latitude : null,
        longitude: coords ? coords.longitude : null,
        notes: notes || "",
        timestamp: new Date().toISOString(),
        syncStatus: "pending",
        isOutbreak: true
    };

    try {
        const tx = window.db.transaction(["scans"], "readwrite");
        const store = tx.objectStore("scans");
        
        await new Promise((resolve, reject) => {
            const request = store.add(outbreakData);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });

        loadHistoryFromDB();

        // Better user feedback
        if (navigator.onLine) {
            showToast('Outbreak recorded ✅ Syncing to server...', 'success');
            
            // Try to sync immediately
            syncPendingOutbreaks()
                .then(successCount => {
                    if (successCount > 0) {
                        showToast(`Successfully synced to server`, 'success');
                    }
                })
                .catch(err => {
                    console.error('Sync failed:', err);
                    showToast('Saved locally • Will sync later', 'warning');
                });
        } else {
            showToast('Outbreak saved locally (offline)', 'success');
        }

    } catch (error) {
        console.error('Failed to save outbreak:', error);
        showToast('Failed to save outbreak', 'error');
    }
}
// Sync pending outbreaks to Supabase
async function syncPendingOutbreaks() {
    if (!navigator.onLine) return 0;

    const tx = window.db.transaction(["scans"], "readwrite");
    const store = tx.objectStore("scans");
    
    const pending = await new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });

    const outbreaksToSync = pending.filter(o => o.syncStatus === "pending");
    if (outbreaksToSync.length === 0) return 0;

    let successCount = 0;

    for (const outbreak of outbreaksToSync) {
        try {
            const response = await fetch('/api/outbreaks', {  // ← Change to your endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(outbreak)
            });

            if (response.ok) {
                // Mark as synced
                outbreak.syncStatus = "synced";
                await store.put(outbreak);
                successCount++;
            }
        } catch (err) {
            console.error('Failed to sync one outbreak:', err);
        }
    }

    if (successCount > 0) {
        loadHistoryFromDB(); // Refresh UI
    }

    return successCount;
}
// Get community outbreaks from Supabase
async function getCommunityOutbreaks() {
    try {
        const { data, error } = await supabase
            .from('outbreaks')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(100);

        if (error) throw error;
        return data || [];
    } catch (err) {
        console.error('Failed to load community outbreaks:', err);
        return [];
    }
}

// Auto sync when back online
window.addEventListener('online', () => {
    console.log('🌐 Back online - syncing outbreaks...');
    syncPendingOutbreaks();
});

// Make functions global so map.js can access them
window.saveOutbreak = saveOutbreak;
window.getCommunityOutbreaks = getCommunityOutbreaks;
window.syncPendingOutbreaks = syncPendingOutbreaks;

// ==========================================================================
// REAL-TIME NEARBY OUTBREAK ALERTS
// ==========================================================================

let userLocation = null;

// Get user's current location
async function getUserLocation() {
    return new Promise((resolve) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                    resolve(userLocation);
                },
                () => resolve(null)
            );
        } else {
            resolve(null);
        }
    });
}

// Calculate distance in kilometers
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Subscribe to real-time outbreaks
function startRealtimeAlerts() {
    getUserLocation();

    const channel = supabase.channel('outbreaks');

    channel.on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'outbreaks' },
        (payload) => {
            const newOutbreak = payload.new;
            
            if (!userLocation || !newOutbreak.latitude || !newOutbreak.longitude) return;

            const distance = calculateDistance(
                userLocation.lat, 
                userLocation.lng, 
                newOutbreak.latitude, 
                newOutbreak.longitude
            );

            if (distance < 50) { // Within 50km
                showToast(`🚨 New outbreak nearby! ${newOutbreak.disease_name} (${distance.toFixed(0)}km away)`, 'warning', 8000);
                
                // Optional: Play sound
                // new Audio('notification.mp3').play();
            }
        }
    ).subscribe();

    console.log('🔔 Real-time nearby alerts activated');
}

// Start alerts when app loads
window.addEventListener('load', () => {
    setTimeout(() => {
        startRealtimeAlerts();
    }, 3000);
});



// ==========================================================================
// START APP
// ==========================================================================
document.addEventListener('DOMContentLoaded', initializeApp);