// ==========================================================================
// INDEXEDDB DATABASE SETUP
// ==========================================================================

const DB_NAME = 'MimeaHubDB';
const DB_VERSION = 3; // Increased version to handle existing databases

function initDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 4); // ← Increased to version 4
        
        request.onupgradeneeded = (e) => {
            const database = e.target.result;
            console.log('Upgrading database to version', DB_NAME, 4);

            // Delete old stores if they exist
            if (database.objectStoreNames.contains("scans")) {
                database.deleteObjectStore("scans");
            }
            if (database.objectStoreNames.contains("preferences")) {
                database.deleteObjectStore("preferences");
            }

            // Create scans store with new fields
            const scanStore = database.createObjectStore("scans", { 
                keyPath: "id", 
                autoIncrement: true 
            });
            
            scanStore.createIndex("diseaseKey", "diseaseKey", { unique: false });
            scanStore.createIndex("timestamp", "timestamp", { unique: false });
            scanStore.createIndex("coordinates", "coordinates", { unique: false });
            scanStore.createIndex("syncStatus", "syncStatus", { unique: false });   // NEW
            scanStore.createIndex("isOutbreak", "isOutbreak", { unique: false });   // NEW

            console.log('Scans store upgraded with sync support');
            
            // Preferences store
            database.createObjectStore("preferences", { keyPath: "key" });
        };
        
        request.onsuccess = (e) => {
            window.db = e.target.result;
            console.log('Database initialized successfully (v4)');
            window.dispatchEvent(new CustomEvent('databaseReady'));
            resolve(window.db);
        };
        
        request.onerror = (e) => {
            console.error("Database error:", e.target.error);
            reject(e.target.error);
        };
    });
}

function deleteAndRecreate() {
    const deleteRequest = indexedDB.deleteDatabase(DB_NAME);
    deleteRequest.onsuccess = () => {
        console.log('Database deleted, recreating...');
        initDatabase().then(() => {
            window.dispatchEvent(new CustomEvent('databaseReady'));
        });
    };
    deleteRequest.onerror = (e) => {
        console.error('Failed to delete database:', e.target.error);
    };
}

function deleteOldDatabase(oldDbName) {
    return new Promise((resolve) => {
        const request = indexedDB.deleteDatabase(oldDbName);
        request.onsuccess = () => {
            console.log(`Old database "${oldDbName}" deleted`);
            resolve();
        };
        request.onerror = () => resolve();
        request.onblocked = () => {
            console.log(`Delete blocked for "${oldDbName}", retrying...`);
            setTimeout(() => {
                indexedDB.deleteDatabase(oldDbName);
                resolve();
            }, 1000);
        };
    });
}

async function cleanupOldDatabases() {
    // List of old database names to clean up
    const oldDatabases = ['CropDetectorDB', 'crop-detector-db', 'plant-disease-db'];
    
    for (const oldDb of oldDatabases) {
        try {
            await deleteOldDatabase(oldDb);
        } catch (error) {
            console.log(`Could not delete ${oldDb}:`, error);
        }
    }
}

async function initializeDatabase() {
    try {
        // First clean up old databases
        await cleanupOldDatabases();
        
        // Try to delete current database to start fresh
        try {
            await new Promise((resolve, reject) => {
                const deleteRequest = indexedDB.deleteDatabase(DB_NAME);
                deleteRequest.onsuccess = () => {
                    console.log('Current database deleted for fresh start');
                    resolve();
                };
                deleteRequest.onerror = () => resolve(); // Ignore errors
                deleteRequest.onblocked = () => {
                    console.log('Delete blocked, waiting...');
                    setTimeout(resolve, 2000);
                };
            });
        } catch (e) {
            console.log('Could not delete current database, continuing...');
        }
        
        // Initialize fresh database
        await initDatabase();
        console.log('Database setup complete');
    } catch (error) {
        console.error('Database setup failed:', error);
        // Try one more time with delete and recreate
        await deleteAndRecreate();
    }
}