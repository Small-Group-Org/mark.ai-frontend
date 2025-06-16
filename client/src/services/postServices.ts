import { BASE_URL } from '@/commons/constant';
import { doGET, doPOST, doPUT, doDELETE } from '@/commons/serviceUtils';
import axios, { AxiosError } from 'axios';
import { PostStatus, PostApiDetails } from '@/types/post';
import { PlatformType } from '@/types';

// Interface for get posts filters
interface GetPostsFilters {
  platform?: PlatformType[];
  status?: PostStatus;
  startDate?: string;
  endDate?: string;
  postId?: string;
}

export const getPosts = async (filters: GetPostsFilters) => {
  try {
    const queryParams = new URLSearchParams();
    
    // Handle multiple platforms
    if (filters.platform) {
      // If platform array contains empty string or is empty, add platform=""
      if (filters.platform.length === 0 || (filters.platform.length === 1 && filters.platform[0] === "" as PlatformType)) {
        queryParams.append('platform', '""');
      } else {
        filters.platform.forEach(platform => {
          queryParams.append('platform', platform);
        });
      }
    } else {
      // If no platform filter provided, add platform=""
      queryParams.append('platform', '""');
    }
    
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.startDate) queryParams.append('startDate', filters.startDate);
    if (filters.endDate) queryParams.append('endDate', filters.endDate);
    if (filters.postId) queryParams.append('postId', filters.postId);

    const response = await doGET(
      `${BASE_URL}/post/user?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message || 'Failed to fetch posts');
    }
    throw error;
  }
};

export const createPost = async (postData: PostApiDetails) => {
  try {
    const response = await doPOST(
      `${BASE_URL}/post/add`,
      postData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message || 'Failed to create post');
    }
    throw error;
  }
};

export const updatePost = async (postData: PostApiDetails, postId: string) => {
  try {
    const response = await doPUT(
      `${BASE_URL}/post/update/${postId}`,
      postData
    );
    return response.data;
  } catch (error) {
      throw new Error((error as Error).message || 'Failed to update post');
  }
};

export const deletePost = async (postId: string) => {
  try {
    const response = await doDELETE(
      `${BASE_URL}/post/delete/${postId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message || 'Failed to delete post');
    }
    throw error;
  }
};

export const searchLocation = async (query: string, signal?: AbortSignal) => {
  try {
    const response = await doPOST(
      `${BASE_URL}/ayrshare/search-location`,
      { query },
      signal
    );
    return response.data.data.facebook;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message || 'Failed to search location');
    }
    throw error;
  }
};

