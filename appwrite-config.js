// Appwrite Configuration
// Complete guide: https://appwrite.io/docs

import { Client, Account, Databases, Storage, Functions, Teams, ID, Query, Permission, Role } from 'https://cdn.jsdelivr.net/npm/appwrite@14.0.1/dist/esm/sdk.js';

// Appwrite Configuration
const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = '68f563b4000a7ec27b68';

// Database IDs (create these in Appwrite console)
const DATABASE_ID = 'portfolio_db';

const COLLECTIONS = {
    USERS: 'users',
    PROPOSALS: 'proposals',
    MEETINGS: 'meetings',
    CONTACTS: 'contacts',
    ANALYTICS: 'analytics',
    SETTINGS: 'settings'
};

// Storage Bucket IDs - UPDATED FOR FREE TIER (only 1 bucket)
const BUCKETS = {
    ALL_FILES: 'media_files'  // Single bucket for both media and documents
};

// Admin Configuration
const ADMIN_EMAIL = 'ahq.john@gmail.com';

// Initialize Appwrite Client
const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

// Initialize Services
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const functions = new Functions(client);
const teams = new Teams(client);

// Helper Functions
const appwriteHelpers = {
    // Check if user is logged in
    async isLoggedIn() {
        try {
            await account.get();
            return true;
        } catch (error) {
            return false;
        }
    },

    // Get current user
    async getCurrentUser() {
        try {
            return await account.get();
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    },

    // Check if user is admin
    async isAdmin() {
        try {
            const user = await account.get();
            return user && user.email === ADMIN_EMAIL;
        } catch (error) {
            return false;
        }
    },

    // Create user session
    async createSession(email, password) {
        try {
            return await account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    },

    // Create new account
    async createAccount(email, password, name) {
        try {
            return await account.create(ID.unique(), email, password, name);
        } catch (error) {
            throw error;
        }
    },

    // Logout
    async logout() {
        try {
            return await account.deleteSession('current');
        } catch (error) {
            throw error;
        }
    },

    // OAuth Login
    async loginWithGoogle() {
        try {
            account.createOAuth2Session(
                'google',
                `${window.location.origin}/user-dashboard.html`,
                `${window.location.origin}/login.html`
            );
        } catch (error) {
            throw error;
        }
    },

    async loginWithGithub() {
        try {
            account.createOAuth2Session(
                'github',
                `${window.location.origin}/user-dashboard.html`,
                `${window.location.origin}/login.html`
            );
        } catch (error) {
            throw error;
        }
    },

    // Password Reset
    async sendPasswordReset(email) {
        try {
            return await account.createRecovery(
                email,
                `${window.location.origin}/reset-password.html`
            );
        } catch (error) {
            throw error;
        }
    },

    // Database Operations
    async createDocument(collectionId, data, permissions = []) {
        try {
            return await databases.createDocument(
                DATABASE_ID,
                collectionId,
                ID.unique(),
                data,
                permissions
            );
        } catch (error) {
            throw error;
        }
    },

    async getDocument(collectionId, documentId) {
        try {
            return await databases.getDocument(
                DATABASE_ID,
                collectionId,
                documentId
            );
        } catch (error) {
            throw error;
        }
    },

    async listDocuments(collectionId, queries = []) {
        try {
            return await databases.listDocuments(
                DATABASE_ID,
                collectionId,
                queries
            );
        } catch (error) {
            throw error;
        }
    },

    async updateDocument(collectionId, documentId, data) {
        try {
            return await databases.updateDocument(
                DATABASE_ID,
                collectionId,
                documentId,
                data
            );
        } catch (error) {
            throw error;
        }
    },

    async deleteDocument(collectionId, documentId) {
        try {
            return await databases.deleteDocument(
                DATABASE_ID,
                collectionId,
                documentId
            );
        } catch (error) {
            throw error;
        }
    },

    // Storage Operations (Updated for single bucket with file type prefix)
    async uploadFile(file, fileType = 'media') {
        try {
            const fileId = `${fileType}_${ID.unique()}`;
            return await storage.createFile(
                BUCKETS.ALL_FILES,
                fileId,
                file
            );
        } catch (error) {
            throw error;
        }
    },

    async getFilePreview(fileId, width = 500, height = 500) {
        return storage.getFilePreview(BUCKETS.ALL_FILES, fileId, width, height);
    },

    async getFileView(fileId) {
        return storage.getFileView(BUCKETS.ALL_FILES, fileId);
    },

    async getFileDownload(fileId) {
        return storage.getFileDownload(BUCKETS.ALL_FILES, fileId);
    },

    async listFiles() {
        try {
            return await storage.listFiles(BUCKETS.ALL_FILES);
        } catch (error) {
            throw error;
        }
    },

    async deleteFile(fileId) {
        try {
            return await storage.deleteFile(BUCKETS.ALL_FILES, fileId);
        } catch (error) {
            throw error;
        }
    },

    // Real-time Subscriptions
    subscribeToCollection(collectionId, callback) {
        return client.subscribe(
            `databases.${DATABASE_ID}.collections.${collectionId}.documents`,
            callback
        );
    }
};

// Export for use in other files
window.appwrite = {
    client,
    account,
    databases,
    storage,
    functions,
    teams,
    ID,
    Query,
    Permission,
    Role,
    helpers: appwriteHelpers,
    config: {
        DATABASE_ID,
        COLLECTIONS,
        BUCKETS,
        ADMIN_EMAIL,
        ENDPOINT: APPWRITE_ENDPOINT,
        PROJECT_ID: APPWRITE_PROJECT_ID
    }
};

console.log('Appwrite initialized successfully!');
console.log('Endpoint:', APPWRITE_ENDPOINT);
console.log('Project ID:', APPWRITE_PROJECT_ID);
