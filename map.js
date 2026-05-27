// map.js - Fixed Visibility + Smaller Markers
let map = null;
let markersCluster = null;
let heatLayer = null;
let currentHeatData = [];

async function initDiseaseMap() {
    const container = document.getElementById('disease-map');
    if (!container) return console.error("Map container not found");

    if (map) map.remove();

    map = L.map('disease-map', { zoomControl: true }).setView([-1.2921, 36.8219], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    markersCluster = L.markerClusterGroup({ maxClusterRadius: 45 });
    map.addLayer(markersCluster);

    addMapControls();
    addLegendPanel();
    await loadAllMarkers();
}

function addMapControls() {
    const control = L.control({ position: 'topright' });
    control.onAdd = function () {
        const div = L.DomUtil.create('div');
        // Reduced padding, font-size, and width to make the overlay smaller
        div.style.cssText = `
            background: rgba(255,255,255,0.98); 
            padding: 8px 10px; 
            border-radius: 8px; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.15); 
            max-width: 180px;
            font-size: 13px;
        `;
        div.innerHTML = `
            <select id="map-filter" style="width:100%; padding: 6px; margin-bottom: 6px; border-radius: 6px; border: 1px solid #ccc; font-size: 13px; cursor: pointer;">
                <option value="all">🌐 All Outbreaks</option>
                <option value="tomato">🍅 Tomato Only</option>
                <option value="potato">🥔 Potato Only</option>
                <option value="last7">📅 Last 7 Days</option>
            </select>
            <button id="toggle-heatmap" class="map-btn" style="width:100%; padding: 6px; margin-bottom: 4px; font-size: 12px; cursor: pointer;">🔥 Show Heatmap</button>
            <button id="near-me-btn" class="map-btn" style="width:100%; padding: 6px; margin-bottom: 4px; font-size: 12px; cursor: pointer;">📍 Outbreaks Near Me</button>
            <button id="fullscreen-btn" class="map-btn" style="width:100%; padding: 6px; font-size: 12px; cursor: pointer;">⛶ Full Screen</button>
        `;
        return div;
    };
    control.addTo(map);

    setTimeout(() => {
        document.getElementById('map-filter').addEventListener('change', loadAllMarkers);
        document.getElementById('toggle-heatmap').addEventListener('click', toggleHeatmap);
        document.getElementById('near-me-btn').addEventListener('click', zoomToUserLocation);
        document.getElementById('fullscreen-btn').addEventListener('click', toggleFullScreen);
    }, 600);
}

function addLegendPanel() {
    const legend = L.control({ position: 'bottomright' });
    
    legend.onAdd = function () {
        const div = L.DomUtil.create('div');
        div.style.cssText = `
            background: rgba(255,255,255,0.98);
            padding: 16px 18px;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.22);
            font-size: 14px;
            line-height: 1.8;
            min-width: 190px;
            color: #222;
        `;
        div.innerHTML = `
            <strong style="font-size:16px; margin-bottom:10px; display:block;">📍 Legend</strong>
            
            <div style="display:flex; align-items:center; gap:12px; margin:7px 0;">
                <div style="width:18px; height:18px; border-radius:50%; background:#d32f2f; border:2px solid white;"></div>
                <span>Late Blight</span>
            </div>
            <div style="display:flex; align-items:center; gap:12px; margin:7px 0;">
                <div style="width:18px; height:18px; border-radius:50%; background:#f57c00; border:2px solid white;"></div>
                <span>Early Blight</span>
            </div>
            <div style="display:flex; align-items:center; gap:12px; margin:7px 0;">
                <div style="width:18px; height:18px; border-radius:50%; background:#7b1fa2; border:2px solid white;"></div>
                <span>Virus Diseases</span>
            </div>
            <div style="display:flex; align-items:center; gap:12px; margin:7px 0;">
                <div style="width:18px; height:18px; border-radius:50%; background:#1976d2; border:2px solid white;"></div>
                <span>Bacterial Spot</span>
            </div>
            
            <hr style="margin:12px 0 8px 0; border:none; border-top:1px solid #eee;">
            <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-size:18px;">🌍</span>
                <span>Community Reports</span>
            </div>
        `;
        return div;
    };
    legend.addTo(map);
}

// Smaller Markers
function getMarkerColor(diseaseName) {
    const name = (diseaseName || '').toLowerCase();
    if (name.includes('late blight')) return '#d32f2f';
    if (name.includes('early blight')) return '#f57c00';
    if (name.includes('mosaic') || name.includes('virus')) return '#7b1fa2';
    if (name.includes('bacterial')) return '#1976d2';
    return '#388e3c';
}

async function loadAllMarkers() {
    if (!map || !markersCluster) return;

    markersCluster.clearLayers();
    currentHeatData = [];

    const filter = document.getElementById('map-filter')?.value || 'all';

    // Local Outbreaks - Smaller
    const localOutbreaks = allCachedScans.filter(s => s.isOutbreak);
    localOutbreaks.forEach(scan => {
        if (!scan.latitude || !scan.longitude) return;
        const color = getMarkerColor(scan.diseaseName || scan.diseaseKey);
        
        const marker = L.marker([scan.latitude, scan.longitude], {
            icon: L.divIcon({
                html: `<div style="background:${color}; width:14px; height:14px; border-radius:50%; border:2px solid white; box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>`,
                iconSize: [14, 14]
            })
        }).bindPopup(`<b>📍 ${scan.diseaseName}</b><br>Your Report`);

        markersCluster.addLayer(marker);
        currentHeatData.push([scan.latitude, scan.longitude, 0.6]);
    });

    // Community Outbreaks - Slightly bigger than local
    if (navigator.onLine) {
        let community = await getCommunityOutbreaks();
        if (filter === 'tomato') community = community.filter(o => o.crop_type?.toLowerCase().includes('tomato'));
        if (filter === 'potato') community = community.filter(o => o.crop_type?.toLowerCase().includes('potato'));
        if (filter === 'last7') {
            const sevenDaysAgo = new Date(Date.now() - 7*24*60*60*1000);
            community = community.filter(o => new Date(o.created_at) > sevenDaysAgo);
        }

        community.forEach(out => {
            if (!out.latitude || !out.longitude) return;
            const color = getMarkerColor(out.disease_name);
            
            const marker = L.marker([out.latitude, out.longitude], {
                icon: L.divIcon({
                    html: `<div style="background:${color}; width:17px; height:17px; border-radius:50%; border:2.5px solid white; box-shadow:0 2px 5px rgba(0,0,0,0.5);"></div>`,
                    iconSize: [17, 17]
                })
            }).bindPopup(`<b>🌍 ${out.disease_name}</b><br>Community Report`);

            markersCluster.addLayer(marker);
            currentHeatData.push([out.latitude, out.longitude, 1.0]);
        });
    }
}

function toggleHeatmap() { /* same as before */ }
async function zoomToUserLocation() { /* same as before */ }
function toggleFullScreen() { /* same as before */ }

window.updateMapMarkers = loadAllMarkers;