import axios from "axios";
import { User } from "@/types";
import { LoginRequest, SignUpRequest } from "@/types/requestTypes";
import { BASE_URL } from "@/commons/constant";
import { doGET, doPUT } from "@/commons/serviceUtils";
import { usePostStore } from '@/store/usePostStore';
import { useAuthStore } from '@/store/useAuthStore';
import { createPost } from './postServices';
import { setValue, STORAGE_KEYS } from '@/commons/storage';
import { PlatformType } from "@/types";

interface AuthResponse {
  data: {
    user: User;
    token: string;
  };
}

export const createDummyLivePost = async () => {
  const postStore = usePostStore.getState();
  const currentTime = new Date();
  const tenMinutesLater = new Date(currentTime.getTime() + 10 * 60000);
  
  const livePost = {
    ...postStore.livePost,
    scheduleDate: tenMinutesLater
  };
  
  const postForDB = {
    ...livePost,
    scheduleDate: tenMinutesLater.toISOString()
  };
  
  postStore.setLivePost(livePost);
  
  try {
    let livePost = await createPost(postForDB);
    livePost = livePost.data;
    postStore.setLivePost({
      ...livePost,
      scheduleDate: tenMinutesLater
    });
  } catch (error) {
    console.error('Failed to create live post:', error);
  }
};

export const verifyToken = async () : Promise<User>=> {
  try {
    const response = await doGET(`${BASE_URL}/auth/me`);
    
    useAuthStore.getState().setTimeZoneLabel(detectUserTimezone());
    
    await createDummyLivePost();
    return response.data.data;
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
    setValue(STORAGE_KEYS.TOKEN, response.data.data.token);
    
    const authStore = useAuthStore.getState();
    authStore.setTimeZoneLabel(detectUserTimezone());
    
    await createDummyLivePost();
    
    await authStore.fetchOnboardingState();
    
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
    setValue(STORAGE_KEYS.TOKEN, response.data.data.token);
    
    const authStore = useAuthStore.getState();
    authStore.setTimeZoneLabel(detectUserTimezone());
    
    await createDummyLivePost();
    
    await authStore.fetchOnboardingState();
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw error;
  }
};

const detectUserTimezone = (): string => {
  try {
    const offset = new Date().getTimezoneOffset();
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset <= 0 ? '+' : '-';
    return `GMT${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  } catch (error) {
    console.error('Error detecting timezone:', error);
    return 'GMT+00:00';
  }
};

export const updatePlatforms = async (activePlatforms: Partial<Record<PlatformType, boolean>>): Promise<User> => {
  try {
    const response = await doPUT(
      `${BASE_URL}/auth/updateplatforms`,
      { activePlatforms }
    );
    
    // Update the auth store with new user details
    const authStore = useAuthStore.getState();
    authStore.setUserDetails(response.data.data);
    
    return response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to update platforms");
    }
    throw error;
  }
};
