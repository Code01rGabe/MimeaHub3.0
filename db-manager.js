// ==========================================================================
// DATABASE MANAGER - Utility functions
// ==========================================================================

const DatabaseManager = {
    // List all databases
    listDatabases: async function() {
        if (indexedDB.databases) {
            const databases = await indexedDB.databases();
            console.log('Available databases:', databases);
            return databases;
        } else {
            console.log('indexedDB.databases() not supported');
            return [];
        }
    },
    
    // Delete specific database
    deleteDatabase: function(dbName) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.deleteDatabase(dbName);
            request.onsuccess = () => {
                console.log(`Database "${dbName}" deleted`);
                resolve();
            };
            request.onerror = (e) => reject(e.target.error);
        });
    },
    
    // Get database size estimate
    getStorageEstimate: async function() {
        if (navigator.storage && navigator.storage.estimate) {
            const estimate = await navigator.storage.estimate();
            console.log('Storage usage:', {
                usage: (estimate.usage / 1024 / 1024).toFixed(2) + ' MB',
                quota: (estimate.quota / 1024 / 1024).toFixed(2) + ' MB',
                percentUsed: ((estimate.usage / estimate.quota) * 100).toFixed(1) + '%'
            });
            return estimate;
        }
    },
    
    // Export all scans to JSON
    exportScans: function() {
        if (!window.db) return;
        
        const transaction = window.db.transaction(["scans"], "readonly");
        const store = transaction.objectStore("scans");
        const request = store.getAll();
        
        request.onsuccess = () => {
            const data = JSON.stringify(request.result, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'mimeahub-scans.json';
            a.click();
            URL.revokeObjectURL(url);
        };
    },
    
    // Import scans from JSON
    importScans: function(jsonData) {
        if (!window.db) return;
        
        const scans = JSON.parse(jsonData);
        const transaction = window.db.transaction(["scans"], "readwrite");
        const store = transaction.objectStore("scans");
        
        scans.forEach(scan => {
            store.add(scan);
        });
        
        transaction.oncomplete = () => {
            console.log('Scans imported successfully');
            // Reload history if function exists
            if (typeof loadHistoryFromDB === 'function') {
                loadHistoryFromDB();
            }
        };
    }
};

// Make available globally
window.DatabaseManager = DatabaseManager;