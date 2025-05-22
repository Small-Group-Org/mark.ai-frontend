import { BASE_URL } from '@/commons/constant';
import { doPOST } from '@/commons/serviceUtils';
import axios from 'axios';

export const generateAyrshareToken = async () => {
    try {
        const response = await doPOST(
            `${BASE_URL}/ayrshare/connect-profile-url`,
            {}
        );

        console.log("[Response]", response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Failed to fetch posts');
        }
        throw error;
    }
};