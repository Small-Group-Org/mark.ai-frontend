import axios from 'axios';
import { User } from '@/types';
import { LoginRequest, SignUpRequest } from '@/types/requestTypes';
import { BASE_URL } from '@/commons/constant';

interface AuthResponse {
    user: User;
    token: string;
}

export const handleSignUp = async (userData: SignUpRequest): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(
            `${BASE_URL}/auth/signup`,
            userData
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Signup failed');
        }
        throw error;
    }
};

export const handleLogin = async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(
            `${BASE_URL}/auth/login`,
            credentials
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
        throw error;
    }
};
