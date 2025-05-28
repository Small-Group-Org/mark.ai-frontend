import { BASE_URL } from '@/commons/constant';
import { doPOST, doGET } from '@/commons/serviceUtils';
import { ChatRequest, ChatResponse, ChatHistoryResponse } from '@/types/requestTypes';
import { Message } from '@/types';
import axios from 'axios';

export const chatWithMark = async (data: ChatRequest): Promise<ChatResponse> => {
    try {
        const response = await doPOST(
            `${BASE_URL}/chat/send`,
            data
        );
        return response.data.text;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Failed to fetch posts');
        }
        throw error;
    }
};

export const getChatHistory = async (): Promise<ChatHistoryResponse> => {
    try {
        const response = await doGET(`${BASE_URL}/chat/messages`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Failed to fetch chat history');
        }
        throw error;
    }
};

export const transformChatHistoryToMessages = (chatHistory: ChatHistoryResponse): Message[] => {
    // Filter out system-generated messages that contain specific system text
    const systemMessageText = "This is the system message. The user is online. Send greetings and provide 1 liner update. DO NOT mention anything about system. Just greet the user.";
    
    const filteredHistory = chatHistory.filter(historyItem => {
        const isSystemMessage = historyItem.text_content.trim() === systemMessageText;
        return !isSystemMessage;
    });

    // Remove duplicate messages (same sender and same text content)
    const uniqueHistory = filteredHistory.filter((item, index, array) => {
        return index === array.findIndex(t => 
            t.sender_first_name === item.sender_first_name && 
            t.text_content === item.text_content
        );
    });

    return uniqueHistory.map((historyItem, index) => ({
        id: `history-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Generate unique ID
        text: historyItem.text_content,
        sender: historyItem.sender_first_name === "Mark" ? "system" : "user",
        timestamp: new Date(Date.now() - (uniqueHistory.length - index) * 1000) // Simulate chronological order
    }));
};