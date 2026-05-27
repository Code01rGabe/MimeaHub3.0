// ==========================================================================
// DISEASE MAP - Simplified Working Version
// ==========================================================================

let diseaseMap = null;
let mapMarkers = [];
let currentMapFilter = 'all';
let isHeatMapMode = false;

function initDiseaseMap() {
    const mapContainer = document.getElementById('disease-map');
    if (!mapContainer) {
        console.log('Map container not found');
        return;
    }
    
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.log('Leaflet not loaded yet, retrying...');
        setTimeout(initDiseaseMap, 1000);
        return;
    }
    
    console.log('Initializing map...');
    
    // If map already exists, remove it
    if (diseaseMap) {
        diseaseMap.remove();
        diseaseMap = null;
    }
    
    // Initialize map
    diseaseMap = L.map('disease-map', {
        center: [-1.2921, 36.8219],
        zoom: 7
    });
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 18
    }).addTo(diseaseMap);
    
    // Add click handler
    diseaseMap.on('click', function(e) {
        onMapClick(e.latlng);
    });
    
    // Load markers
    updateMapMarkers();
    
    // Fix size issue
    setTimeout(() => {
        diseaseMap.invalidateSize();
    }, 500);
    
    console.log('Map initialized');
}

function updateMapMarkers() {
    if (!diseaseMap) {
        console.log('Map not initialized');
        return;
    }
    
    // Clear existing markers
    mapMarkers.forEach(marker => diseaseMap.removeLayer(marker));
    mapMarkers = [];
    
    // Filter scans with real coordinates
    const scansWithCoords = allCachedScans.filter(scan => {
        return scan.coordinates && 
               scan.coordinates !== 'Nairobi, KE' && 
               scan.coordinates.includes(',');
    });
    
    console.log('Scans with coordinates:', scansWithCoords.length);
    
    if (scansWithCoords.length === 0) {
        // Show a message on the map
        const defaultIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background:#58a6ff; width:12px; height:12px; border-radius:50%; border:2px solid white;"></div>',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });
        
        L.marker([-1.2921, 36.8219], { icon: defaultIcon })
            .bindPopup('<b>Nairobi, Kenya</b><br>Enable GPS for precise location')
            .addTo(diseaseMap);
        
        return;
    }
    
    scansWithCoords.forEach(scan => {
        try {
            const [lat, lon] = scan.coordinates.split(',').map(Number);
            if (isNaN(lat) || isNaN(lon)) return;
            
            const isHealthy = scan.diseaseKey === 'healthy';
            const color = isHealthy ? '#3fb950' : '#f85149';
            
            const icon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="background:${color}; width:12px; height:12px; border-radius:50%; border:2px solid white; box-shadow:0 0 4px rgba(0,0,0,0.3);"></div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            });
            
            const data = diseaseDatabase[currentLanguage]["diseases"][scan.diseaseKey] || {
                name: scan.diseaseKey.replace(/_/g, ' ')
            };
            
            const marker = L.marker([lat, lon], { 
                icon: icon,
                diseaseKey: scan.diseaseKey 
            }).bindPopup(`
                <div style="font-family:sans-serif; font-size:12px;">
                    <b>${data.name}</b><br>
                    Confidence: ${scan.confidence}<br>
                    ${scan.timestamp ? scan.timestamp.split(',')[0] : ''}<br>
                    <span style="color:${color};">${isHealthy ? 'Healthy' : 'Disease Detected'}</span>
                </div>
            `);
            
            marker.addTo(diseaseMap);
            mapMarkers.push(marker);
            
        } catch (e) {
            console.log('Marker error:', e);
        }
    });
    
    // Fit bounds
    if (mapMarkers.length > 0) {
        const group = L.featureGroup(mapMarkers);
        diseaseMap.fitBounds(group.getBounds().pad(0.1));
    }
}

function onMapClick(latlng) {
    if (!diseaseMap) return;
    
    const nearbyScans = [];
    
    allCachedScans.forEach(scan => {
        if (!scan.coordinates || !scan.coordinates.includes(',')) return;
        
        try {
            const [scanLat, scanLon] = scan.coordinates.split(',').map(Number);
            if (isNaN(scanLat) || isNaN(scanLon)) return;
            
            const distance = getDistance(latlng.lat, latlng.lng, scanLat, scanLon);
            
            if (distance < 0.1) { // Within 100 meters
                nearbyScans.push({ ...scan, distance: distance });
            }
        } catch (e) {}
    });
    
    nearbyScans.sort((a, b) => a.distance - b.distance);
    
    let popupContent = `<div style="font-family:sans-serif; font-size:12px; min-width:200px;">
        <b>📍 Selected Location</b><br>
        <span style="color:#888;">${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}</span><br><br>`;
    
    if (nearbyScans.length > 0) {
        popupContent += `<b>🔍 ${nearbyScans.length} scan(s) within 100m:</b><br>`;
        nearbyScans.slice(0, 5).forEach(scan => {
            const data = diseaseDatabase[currentLanguage]["diseases"][scan.diseaseKey] || { name: scan.diseaseKey };
            const icon = scan.diseaseKey === 'healthy' ? '✅' : '⚠️';
            const meters = (scan.distance * 1000).toFixed(0);
            popupContent += `
                <div style="margin:4px 0; padding:4px; background:#f5f5f5; border-radius:4px;">
                    ${icon} ${data.name}<br>
                    <span style="font-size:10px;">${scan.confidence} • ${meters}m away</span>
                </div>`;
        });
    } else {
        popupContent += `<span style="color:#888;">No scans within 100m</span>`;
    }
    
    popupContent += `</div>`;
    
    L.popup().setLatLng(latlng).setContent(popupContent).openOn(diseaseMap);
}

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c / 1000;
}

function filterMapByDisease(diseaseKey) {
    currentMapFilter = diseaseKey;
    
    document.querySelectorAll('.map-filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === diseaseKey) btn.classList.add('active');
    });
    
    mapMarkers.forEach(marker => {
        diseaseMap.removeLayer(marker);
        if (diseaseKey === 'all' || marker.diseaseKey === diseaseKey) {
            marker.addTo(diseaseMap);
        }
    });
}

function toggleMapView() {
    const mapContainer = document.getElementById('disease-map');
    if (!mapContainer) return;
    
    mapContainer.style.height = mapContainer.style.height === '400px' ? '250px' : '400px';
    
    if (diseaseMap) {
        setTimeout(() => diseaseMap.invalidateSize(), 200);
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initDiseaseMap, 1500);
});