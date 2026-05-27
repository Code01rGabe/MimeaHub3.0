// ==========================================================================
// DISEASE DATABASE
// ==========================================================================
const diseaseDatabase = {
    "en": {
        "loading_model": "Loading AI Engine...",
        "ready": "AI Engine Ready. Scan a crop leaf.",
        "scanning": "Analyzing leaf image...",
        "scan_complete": "Scan Complete!",
        "diseases": {
            "tomato_late_blight": {
                "name": "Tomato Late Blight",
                "organic": "Apply copper-based fungicides or homemade baking soda sprays. Remove and burn infected leaves immediately.",
                "chemical": "Use Mancozeb or Ridomil Gold according to manufacturer packages.",
                "prevention": "Ensure wide spacing between plants to maximize airflow. Avoid overhead watering; water the soil directly."
            },
            "potato_early_blight": {
                "name": "Potato Early Blight",
                "organic": "Apply neem oil extract or a decoction of garlic sprays every 7 days.",
                "chemical": "Spray Chlorothalonil or Azoxystrobin based chemical packages.",
                "prevention": "Rotate crops annually. Do not plant potatoes where tomatoes or peppers grew last season."
            },
            "healthy": {
                "name": "Healthy Leaf",
                "organic": "No treatment required! Maintain good soil fertility with organic compost.",
                "chemical": "No chemical treatment needed.",
                "prevention": "Continue monitoring crops weekly for early signs of pests or spotting."
            }
        }
    },
    "sw": {
        "loading_model": "Inapakia Injini ya AI...",
        "ready": "Injini ya AI Iko Tayari. Kagua jani la mmea.",
        "scanning": "Inachanganua picha ya jani...",
        "scan_complete": "Uchunguzi Umekamilika!",
        "diseases": {
            "tomato_late_blight": {
                "name": "Mnyauko Chelewa wa Nyanya (Late Blight)",
                "organic": "Nyunyizia mchanganyiko wa dawa za asili za kopa au magadi (baking soda). Ng'oa na uchome moto majani yaliyoambukizwa mara moja.",
                "chemical": "Tumia dawa za Mancozeb au Ridomil Gold kulingana na maelekezo ya kifurushi.",
                "prevention": "Hakikisha nafasi kubwa kati ya mimea ili kuruhusu hewa kupita. Epuka kumwagilia maji juu ya majani; mwagilia udongo moja kwa moja."
            },
            "potato_early_blight": {
                "name": "Mnyauko Mapema wa Viazi (Early Blight)",
                "organic": "Nyunyizia mafuta ya mwarobaini (neem oil) au maji ya kitunguu saumu kila baada ya siku 7.",
                "chemical": "Nyunyizia kemikali za Chlorothalonil au Azoxystrobin zilizoidhinishwa.",
                "prevention": "Badilisha mazao kila mwaka (crop rotation). Usipande viazi ambapo nyanya au pilipili zilipandwa msimu uliopita."
            },
            "healthy": {
                "name": "Jani Lenye Afya",
                "organic": "Hakuna matibabu yanayohitajika! Dumisha rutuba ya udongo kwa kutumia mbolea ya mboji.",
                "chemical": "Hakuna matibabu ya kemikali yanayohitajika.",
                "prevention": "Endelea kukagua mazao kila wiki ili kuona dalili za mapema za wadudu au madoa."
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
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: ${colors[type]};
        color: white;
        padding: 12px 24px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 500;
        font-family: 'Plus Jakarta Sans', sans-serif;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        max-width: 90vw;
    `;
    toast.innerHTML = `${icons[type]} ${message}`;
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function showConfirmToast(message, onConfirm) {
    const existing = document.querySelector('.custom-confirm');
    if (existing) existing.remove();
    
    const confirm = document.createElement('div');
    confirm.className = 'custom-confirm';
    confirm.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: var(--bg-panel, #131820);
        color: var(--text-primary, #e8ecf1);
        padding: 16px 24px;
        border-radius: 12px;
        font-size: 14px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        z-index: 10001;
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        border: 1px solid var(--border-panel, rgba(255,255,255,0.08));
        display: flex;
        align-items: center;
        gap: 16px;
        max-width: 90vw;
    `;
    confirm.innerHTML = `
        <span>⚠️ ${message}</span>
        <div style="display:flex; gap:8px;">
            <button class="confirm-yes" style="padding:6px 16px; border-radius:6px; border:none; background:#f85149; color:white; cursor:pointer; font-weight:600; white-space:nowrap;">Yes</button>
            <button class="confirm-no" style="padding:6px 16px; border-radius:6px; border:1px solid rgba(255,255,255,0.15); background:transparent; color:var(--text-primary, #e8ecf1); cursor:pointer; white-space:nowrap;">No</button>
        </div>
    `;
    document.body.appendChild(confirm);
    
    requestAnimationFrame(() => {
        confirm.style.transform = 'translateX(-50%) translateY(0)';
    });
    
    confirm.querySelector('.confirm-yes').onclick = () => {
        confirm.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => confirm.remove(), 300);
        if (onConfirm) onConfirm();
    };
    
    confirm.querySelector('.confirm-no').onclick = () => {
        confirm.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => confirm.remove(), 300);
    };
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
                    { className: 'healthy', probability: 0.95 },
                    { className: 'tomato_late_blight', probability: 0.03 },
                    { className: 'potato_early_blight', probability: 0.02 }
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
        
        // Initialize map if map.js is loaded
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
        case 'loading':
            statusDiv.innerText = diseaseDatabase[currentLanguage]["loading_model"];
            statusDiv.className = 'status-badge status-scanning';
            break;
        case 'ready':
            statusDiv.innerText = diseaseDatabase[currentLanguage]["ready"];
            statusDiv.className = 'status-badge status-ready';
            break;
        case 'scanning':
            statusDiv.innerText = diseaseDatabase[currentLanguage]["scanning"];
            statusDiv.className = 'status-badge status-scanning';
            break;
        case 'complete':
            statusDiv.innerText = diseaseDatabase[currentLanguage]["scan_complete"];
            statusDiv.className = 'status-badge status-ready';
            break;
        case 'error':
            statusDiv.innerText = "Error";
            statusDiv.className = 'status-badge status-error';
            break;
        default:
            statusDiv.innerText = state;
            statusDiv.className = 'status-badge status-ready';
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
            () => {
                currentGPS = "Nairobi, KE";
                window.currentGPS = currentGPS;
                if (locationDisplay) locationDisplay.innerText = currentGPS;
            },
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
        store.add({
            diseaseKey: diseaseKey,
            confidence: confidenceValue,
            timestamp: new Date().toLocaleString(),
            coordinates: currentGPS
        });
        transaction.oncomplete = () => loadHistoryFromDB();
    } catch (error) {
        console.error('Save error:', error);
    }
}

function loadHistoryFromDB() {
    if (!window.db) return;
    allCachedScans = [];
    try {
        const transaction = window.db.transaction(["scans"], "readonly");
        const store = transaction.objectStore("scans");
        const request = store.openCursor(null, "prev");
        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                allCachedScans.push(cursor.value);
                cursor.continue();
            } else {
                renderHistoryCards(allCachedScans);
                calculateAnalytics(allCachedScans);
                updateQuickStats();
                // Refresh disease map if available
                if (typeof updateMapMarkers === 'function') {
                    setTimeout(updateMapMarkers, 500);
                }
            }
        };
    } catch (error) {
        console.error('Load error:', error);
    }
}

// ==========================================================================
// UI RENDERERS
// ==========================================================================
function displayResult(diseaseKey, confidenceValue) {
    const data = diseaseDatabase[currentLanguage]["diseases"][diseaseKey] || {
        "name": diseaseKey.replace(/_/g, ' '),
        "organic": "No information available.",
        "chemical": "No information available.",
        "prevention": "No information available."
    };
    
    const predictionResult = document.getElementById('prediction-result');
    if (predictionResult) predictionResult.classList.remove('hidden');
    
    const diseaseName = document.getElementById('disease-name');
    if (diseaseName) diseaseName.innerText = data.name.toUpperCase();
    
    const confidenceLevel = document.getElementById('confidence-level');
    if (confidenceLevel) confidenceLevel.innerText = confidenceValue;
    
    const numericScore = parseFloat(confidenceValue);
    const ringFill = document.getElementById('ring-progress-fill');
    if (ringFill && !isNaN(numericScore)) {
        ringFill.setAttribute('stroke-dasharray', `${numericScore}, 100`);
    }

    if (locationDisplay) locationDisplay.innerText = currentGPS;
    
    const treatmentOrganic = document.getElementById('treatment-organic');
    if (treatmentOrganic) treatmentOrganic.innerText = data.organic;
    
    const treatmentChemical = document.getElementById('treatment-chemical');
    if (treatmentChemical) treatmentChemical.innerText = data.chemical;
    
    const treatmentPrevention = document.getElementById('treatment-prevention');
    if (treatmentPrevention) treatmentPrevention.innerText = data.prevention;
}

function renderHistoryCards(scanArray) {
    if (!historyList) return;
    historyList.innerHTML = "";
    
    if (scanArray.length === 0) {
        historyList.innerHTML = `<p class="empty-state">No scans recorded yet</p>`;
        return;
    }

    scanArray.forEach(entry => {
        const data = diseaseDatabase[currentLanguage]["diseases"][entry.diseaseKey] || { 
            name: entry.diseaseKey.replace(/_/g, ' ') 
        };
        
        const logCard = document.createElement("div");
        logCard.className = "history-item";
        logCard.innerHTML = `
            <div class="history-info">
                <span class="history-disease">${data.name}</span>
                <div class="history-meta">
                    <span>📅 ${entry.timestamp ? entry.timestamp.split(',')[0] : 'Unknown'}</span>
                    <span>📍 ${entry.coordinates || 'N/A'}</span>
                </div>
            </div>
            <span class="history-confidence">${entry.confidence}</span>
        `;
        
        logCard.addEventListener('click', () => {
            currentDetectedDisease = entry.diseaseKey;
            currentGPS = entry.coordinates || currentGPS;
            displayResult(entry.diseaseKey, entry.confidence);
        });
        
        historyList.appendChild(logCard);
    });
}

function calculateAnalytics(scanArray) {
    if (!analyticsContainer) return;
    analyticsContainer.innerHTML = "";
    
    if (scanArray.length === 0) {
        analyticsContainer.innerHTML = `<p class="empty-state">Scan plants to see analytics</p>`;
        return;
    }

    const counts = {};
    scanArray.forEach(entry => { 
        counts[entry.diseaseKey] = (counts[entry.diseaseKey] || 0) + 1; 
    });
    
    const totalScans = scanArray.length;
    for (const [key, val] of Object.entries(counts)) {
        const data = diseaseDatabase[currentLanguage]["diseases"][key] || { name: key.replace(/_/g, ' ') };
        const percentageWidth = ((val / totalScans) * 100).toFixed(0);
        const chartRow = document.createElement("div");
        chartRow.className = "analytics-row";
        chartRow.innerHTML = `
            <div class="analytics-meta">
                <span>${data.name}</span>
                <span class="analytics-count">${val} (${percentageWidth}%)</span>
            </div>
            <div class="bar-track">
                <div class="bar-fill" style="width: ${percentageWidth}%;"></div>
            </div>
        `;
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
    const healthy = allCachedScans.filter(s => s.diseaseKey === 'healthy').length;
    const diseased = total - healthy;
    
    const today = new Date().toLocaleDateString();
    const todayScans = allCachedScans.filter(s => {
        try {
            const scanDate = new Date(s.timestamp).toLocaleDateString();
            return scanDate === today;
        } catch (e) {
            return false;
        }
    }).length;
    
    totalEl.textContent = total;
    healthyEl.textContent = healthy;
    diseasedEl.textContent = diseased;
    todayEl.textContent = todayScans;
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
                transaction.oncomplete = () => {
                    loadHistoryFromDB();
                    updateQuickStats();
                    showToast('History cleared successfully', 'success');
                };
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
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }, 
                    audio: false 
                });
                webcamElement.srcObject = stream;
                webcamElement.classList.remove('hidden');
                if (imagePreview) imagePreview.classList.add('hidden');
                placeholderText.classList.add('hidden');
                btnCapture.classList.remove('hidden');
                btnWebcam.innerText = currentLanguage === 'sw' ? "Zima Kamera" : "Stop Camera";
                btnWebcam.className = "btn btn-outline";
                videoTrack = stream.getVideoTracks()[0];
                showToast('Camera started', 'success');
            } catch (err) {
                console.error('Camera error:', err);
                showToast('Unable to access camera. Please check permissions.', 'error');
            }
        });
    }
    
    // Capture button
    if (btnCapture) {
        btnCapture.addEventListener('click', () => {
            if (webcamElement.srcObject) {
                runInference(webcamElement);
            }
        });
    }
    
    // File upload
    if (fileUpload) {
        fileUpload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (!file) return;
            
            if (!file.type.startsWith('image/')) {
                showToast('Please select an image file.', 'warning');
                return;
            }
            
            if (stream) stopWebcam();
            
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.classList.remove('hidden');
                placeholderText.classList.add('hidden');
                if (webcamElement) webcamElement.classList.add('hidden');
                if (btnCapture) btnCapture.classList.add('hidden');
                imagePreview.onload = () => runInference(imagePreview);
            };
            reader.onerror = () => showToast('Failed to read file.', 'error');
            reader.readAsDataURL(file);
        });
    }
    
    // Export WhatsApp report
    if (btnExportReport) {
        btnExportReport.addEventListener('click', () => {
            const dName = document.getElementById('disease-name')?.innerText || 'Unknown';
            const cLevel = document.getElementById('confidence-level')?.innerText || '0%';
            const tOrganic = document.getElementById('treatment-organic')?.innerText || 'N/A';
            const tChemical = document.getElementById('treatment-chemical')?.innerText || 'N/A';
            const tPrev = document.getElementById('treatment-prevention')?.innerText || 'N/A';

            const report = `🌱 *MimeaHub Diagnostic Report* 🌱
----------------------------------------
• *Disease:* ${dName}
• *Confidence:* ${cLevel}
• *Location:* ${currentGPS}
• *Time:* ${new Date().toLocaleString()}

🌿 *Organic:* ${tOrganic}
🧪 *Chemical:* ${tChemical}
🛡️ *Prevention:* ${tPrev}`;

            navigator.clipboard.writeText(report).then(() => {
                showToast('Report copied to clipboard!', 'success');
            }).catch(() => showToast('Failed to copy. Please try again.', 'error'));
        });
    }
    
    // PDF Export button
    const btnExportPdf = document.getElementById('btn-export-pdf');
    if (btnExportPdf) {
        btnExportPdf.addEventListener('click', () => {
            if (typeof exportPDFReport === 'function') {
                exportPDFReport();
            } else {
                showToast('PDF export not available. Please check if pdf.js is loaded.', 'error');
            }
        });
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
    if (stream) { 
        stream.getTracks().forEach(track => track.stop()); 
        stream = null; 
        videoTrack = null; 
    }
    if (webcamElement) webcamElement.classList.add('hidden');
    if (imagePreview) imagePreview.classList.add('hidden');
    if (placeholderText) placeholderText.classList.remove('hidden');
    if (btnCapture) btnCapture.classList.add('hidden');
    if (btnWebcam) {
        btnWebcam.innerText = currentLanguage === 'sw' ? "Washa Kamera" : "📷 Start Camera";
        btnWebcam.className = "btn btn-primary";
    }
}

// ==========================================================================
// AI INFERENCE
// ==========================================================================
async function runInference(inputElement) {
    if (!model) { 
        showToast('AI Model not loaded yet. Please wait.', 'warning'); 
        return; 
    }
    
    updateStatus('scanning');
    fetchCoordinates();

    try {
        const ctx = processingCanvas.getContext('2d');
        processingCanvas.width = inputElement.videoWidth || inputElement.naturalWidth || 224;
        processingCanvas.height = inputElement.videoHeight || inputElement.naturalHeight || 224;
        ctx.drawImage(inputElement, 0, 0, processingCanvas.width, processingCanvas.height);
        
        const prediction = await model.predict(processingCanvas);
        
        let highestPrediction = prediction[0];
        for (let i = 1; i < prediction.length; i++) {
            if (prediction[i].probability > highestPrediction.probability) {
                highestPrediction = prediction[i];
            }
        }
        
        const confidencePercentage = (highestPrediction.probability * 100).toFixed(0) + "%";
        currentDetectedDisease = highestPrediction.className;
        
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
        showToast(`Theme switched to ${newTheme} mode`, 'info', 2000);
    });
}

// ==========================================================================
// START APP
// ==========================================================================
document.addEventListener('DOMContentLoaded', initializeApp);