import { BASE_URL } from "@/commons/constant";
import { doPOST } from "@/commons/serviceUtils";
import axios from "axios";

export const uploadSingleMedia = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('mediaFile', file);

      const response = await doPOST(
        `${BASE_URL}/upload/single`,
        formData
      );
      return response.data.data?.[0]?.cloudinaryUrl || "";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to upload media');
      }
      throw error;
    }
  };

export const uploadMultipleMedia = async (files: File[]) => {
    try {
      if (files.length > 10) {
        throw new Error('Maximum 10 files allowed');
      }

      const formData = new FormData();
      files.forEach(file => formData.append('mediaFiles', file));

      const response = await doPOST(
        `${BASE_URL}/upload/multiple`,
        formData
      );
      
      // Return array of URLs from the response
      return response.data.data?.map((item: any) => item.cloudinaryUrl) || [];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to upload media');
      }
      throw error;
    }
  };
  