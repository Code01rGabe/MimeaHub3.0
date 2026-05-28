# 🌿 MimeaHub 3.0 — AI-Powered Offline Crop Disease Diagnosis

**MimeaHub** is a lightweight, fully offline **Progressive Web App (PWA)** designed to help smallholder farmers diagnose crop diseases instantly using their smartphone cameras — even in remote areas with no internet.

Built with pure vanilla JavaScript, TensorFlow.js, and IndexedDB, it runs entirely in the browser.

![MimeaHub Screenshot](https://github.com/Code01rGabe/MimeaHub3.0/blob/main/preview.png)

## ✨ Key Features

- **Offline AI Disease Detection** — TensorFlow.js model runs 100% on-device
- **Camera + File Upload** — Real-time leaf scanning with image enhancement
- **Multilingual Support** — English & Kiswahili
- **Local Storage** — Full scan history with IndexedDB
- **Geolocation Tracking** — Records farm/field locations
- **Treatment Recommendations** — Organic, chemical, and prevention guides
- **Analytics Dashboard** — Disease trends and statistics
- **Interactive Disease Map** — Visualizes scan locations
- **AI Farm Assistant** — Chat interface for farming advice
- **PDF Report Export** — Professional scan reports
- **PWA Ready** — Installable on Android/iOS

## 🧠 Supported Crops & Diseases

### Tomato
- Healthy Tomato
- Tomato Mosaic Virus (ToMV)
- Tomato Yellow Leaf Curl Virus (TYLCV)
- Tomato Spider Mites
- Septoria Leaf Spot
- Tomato Leaf Mold
- Late Blight
- Early Blight
- Bacterial Spot

### Potato
- Healthy Potato
- Late Blight
- Early Blight

## 🚀 Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **AI/ML**: TensorFlow.js + Teachable Machine
- **Storage**: IndexedDB (via db.js)
- **Maps**: Leaflet.js
- **PDF Generation**: jsPDF
- **Offline**: Service Worker (`sw.js`)
- **Styling**: Custom modern dark UI (with light mode support)

## 📁 Project Structure

```bash
MimeaHub3.0/
├── index.html              # Landing page
├── dashboard.html          # Main app interface
├── styles.css              # Design system
├── app.js                  # Core logic + AI inference
├── db.js                   # IndexedDB management
├── db-manager.js           # Database utilities
├── auth.js                 # Simple auth simulation
├── chat.js                 # AI assistant chat
├── map.js                  # Leaflet disease map
├── pdf.js                  # PDF report generation
├── sw.js                   # PWA Service Worker
├── landing.js              # Landing page scripts
├── supabase-client.js      # (Optional) Supabase integration
└── model/                  # TensorFlow.js model files
    ├── model.json
    ├── metadata.json
    └── weights.bin