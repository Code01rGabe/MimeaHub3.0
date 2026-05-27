// ==========================================================================
// INDEXEDDB DATABASE SETUP
// ==========================================================================

const DB_NAME = 'MimeaHubDB';
const DB_VERSION = 3; // Increased version to handle existing databases

function initDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onupgradeneeded = (e) => {
            const database = e.target.result;
            console.log('Upgrading database to version', DB_VERSION);
            
            // Delete old object stores if they exist
            if (database.objectStoreNames.contains("scans")) {
                database.deleteObjectStore("scans");
                console.log('Deleted old scans store');
            }
            if (database.objectStoreNames.contains("preferences")) {
                database.deleteObjectStore("preferences");
                console.log('Deleted old preferences store');
            }
            
            // Create new scans store
            const scanStore = database.createObjectStore("scans", { 
                keyPath: "id", 
                autoIncrement: true 
            });
            scanStore.createIndex("diseaseKey", "diseaseKey", { unique: false });
            scanStore.createIndex("timestamp", "timestamp", { unique: false });
            scanStore.createIndex("coordinates", "coordinates", { unique: false });
            console.log('Scans store created');
            
            // Create preferences store
            database.createObjectStore("preferences", { keyPath: "key" });
            console.log('Preferences store created');
        };
        
        request.onsuccess = (e) => {
            window.db = e.target.result;
            console.log('Database initialized successfully, version:', window.db.version);
            window.dispatchEvent(new CustomEvent('databaseReady'));
            resolve(window.db);
        };
        
        request.onerror = (e) => {
            console.error("Database error:", e.target.error);
            // If version error, try to delete and recreate
            if (e.target.error.name === 'VersionError') {
                console.log('Version error detected, attempting to delete and recreate...');
                deleteAndRecreate();
            }
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