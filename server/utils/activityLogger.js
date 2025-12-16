import SystemLog from '../models/SystemLog.js';

export const logActivity = async (text, type = 'info', userId = null) => {
    try {
        await SystemLog.create({ text, type, user: userId });
        console.log(`[Activity Log] ${text}`); // Also log to console for debug
    } catch (error) {
        console.error('Failed to save system log:', error);
    }
};
