import axios from "axios";
import { User } from "@/types";
import { LoginRequest, SignUpRequest } from "@/types/requestTypes";
import { BASE_URL } from "@/commons/constant";
import { doGET, doPOST } from "@/commons/serviceUtils";
import { usePostStore } from '@/store/usePostStore';
import { PostStatus, PlatformType } from '@/types/post';
import { createPost } from './postServices';

interface AuthResponse {
  data: {
    user: User;
    token: string;
  };
}

const createDummyLivePost = async () => {
  const postStore = usePostStore.getState();
  const currentTime = new Date();
  
  const livePost = {
    ...postStore.livePost,
    scheduleDate: currentTime
  };
  
  const postForDB = {
    ...livePost,
    scheduleDate: currentTime.toISOString()
  };
  
  postStore.setLivePost(livePost);
  
  try {
    const savedPost = await createPost(postForDB);
    postStore.setLivePost({ ...livePost, _id: savedPost._id });
  } catch (error) {
    console.error('Failed to create live post:', error);
  }
};

export const verifyToken = async () : Promise<User>=> {
  try {
    const response = await doGET(`${BASE_URL}/auth/me`);
    await createDummyLivePost();
    return response.data.data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
    throw error;
  }
};

export const handleSignUp = async (
  userData: SignUpRequest
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(
      `${BASE_URL}/auth/signup`,
      userData
    );
    await createDummyLivePost();
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
    throw error;
  }
};

export const handleLogin = async (
  credentials: LoginRequest
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(
      `${BASE_URL}/auth/login`,
      credentials
    );
    await createDummyLivePost();
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw error;
  }
};
