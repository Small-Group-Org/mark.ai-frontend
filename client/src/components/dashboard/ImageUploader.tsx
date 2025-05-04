import React, { useState } from 'react';
import { UploadIcon } from './IconComponents';

interface ImageUploaderProps {
  onImageUpload?: (file: File) => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, className = '' }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
        onImageUpload?.(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
        onImageUpload?.(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className={`w-full h-[300px] relative ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {imagePreview ? (
        <div className="w-full h-full relative">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="w-full h-full object-cover rounded-lg" 
          />
          <button 
            className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100 transition-all"
            onClick={() => setImagePreview(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <label 
          htmlFor="image-upload" 
          className={`w-full h-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'}`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click or drag</span> to upload an image
            </p>
            <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
          </div>
          <input 
            id="image-upload" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleImageChange} 
          />
        </label>
      )}
    </div>
  );
};

export default ImageUploader;