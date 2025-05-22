import { BASE_URL } from '@/commons/constant';
import { doGET } from '@/commons/serviceUtils';
import axios from 'axios';

export const getPosts = async (params: {
    platform?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
}) => {
    try {
        const queryParams = new URLSearchParams();
        if (params.platform) queryParams.append('platform', params.platform);
        if (params.status) queryParams.append('status', params.status);
        if (params.startDate) queryParams.append('startDate', params.startDate);
        if (params.endDate) queryParams.append('endDate', params.endDate);

        const response = await doGET(
            `${BASE_URL}/post/user?${queryParams.toString()}`
        );

        return response.data.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Failed to fetch posts');
        }
        throw error;
    }
};