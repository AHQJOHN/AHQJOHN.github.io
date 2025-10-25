// Appwrite Initialization - Load this file FIRST before any other scripts
import { Client, Account, Databases, Storage, Functions, Teams, ID, Query, Permission, Role } from 'https://cdn.jsdelivr.net/npm/appwrite@14.0.1/dist/esm/sdk.js';

// Configuration
const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = '68f563b4000a7ec27b68';
const DATABASE_ID = 'portfolio_db';
const ADMIN_EMAIL = 'ahq.john@gmail.com';

const COLLECTIONS = {
    USERS: 'users',
    PROPOSALS: 'proposals',
    MEETINGS: 'meetings',
    CONTACTS: 'contacts',
    ANALYTICS: 'analytics',
    SETTINGS: 'settings'
};

const BUCKETS = {
    ALL_FILES: 'media_files'
};

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
    async isLoggedIn() {
        try {
            await account.get();
            return true;
        } catch (error) {
            return false;
        }
    },

    async getCurrentUser() {
        try {
            return await account.get();
        } catch (error) {
            return null;
        }
    },

    async isAdmin() {
        try {
            const user = await account.get();
            return user && user.email === ADMIN_EMAIL;
        } catch (error) {
            return false;
        }
    },

    async createSession(email, password) {
        return await account.createEmailPasswordSession(email, password);
    },

    async createAccount(email, password, name) {
        return await account.create(ID.unique(), email, password, name);
    },

    async logout() {
        return await account.deleteSession('current');
    },

    async loginWithGoogle() {
        account.createOAuth2Session(
            'google',
            `${window.location.origin}/user-dashboard.html`,
            `${window.location.origin}/login.html`
        );
    },

    async loginWithGithub() {
        account.createOAuth2Session(
            'github',
            `${window.location.origin}/user-dashboard.html`,
            `${window.location.origin}/login.html`
        );
    },

    async sendPasswordReset(email) {
        return await account.createRecovery(
            email,
            `${window.location.origin}/reset-password.html`
        );
    },

    async createDocument(collectionId, data, permissions = []) {
        return await databases.createDocument(
            DATABASE_ID,
            collectionId,
            ID.unique(),
            data,
            permissions
        );
    },

    async getDocument(collectionId, documentId) {
        return await databases.getDocument(DATABASE_ID, collectionId, documentId);
    },

    async listDocuments(collectionId, queries = []) {
        return await databases.listDocuments(DATABASE_ID, collectionId, queries);
    },

    async updateDocument(collectionId, documentId, data) {
        return await databases.updateDocument(DATABASE_ID, collectionId, documentId, data);
    },

    async deleteDocument(collectionId, documentId) {
        return await databases.deleteDocument(DATABASE_ID, collectionId, documentId);
    },

    async uploadFile(file, fileType = 'media') {
        const fileId = `${fileType}_${ID.unique()}`;
        return await storage.createFile(BUCKETS.ALL_FILES, fileId, file);
    },

    getFilePreview(fileId, width = 500, height = 500) {
        return storage.getFilePreview(BUCKETS.ALL_FILES, fileId, width, height);
    },

    getFileView(fileId) {
        return storage.getFileView(BUCKETS.ALL_FILES, fileId);
    },

    getFileDownload(fileId) {
        return storage.getFileDownload(BUCKETS.ALL_FILES, fileId);
    },

    async listFiles() {
        return await storage.listFiles(BUCKETS.ALL_FILES);
    },

    async deleteFile(fileId) {
        return await storage.deleteFile(BUCKETS.ALL_FILES, fileId);
    }
};

// Export globally
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

console.log('✅ Appwrite initialized successfully!');
console.log('Project ID:', APPWRITE_PROJECT_ID);
console.log('Database ID:', DATABASE_ID);
