import React from 'react';
import { Edit, XSquare, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Post } from '@/types/post';
import { ENABLE_AI_GENERATE } from '@/commons/constant';

interface PostFormFieldsProps {
  editedPost: Post;
  characterCount: number;
  isEditing: boolean;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onHashtagsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerate?: () => void;
  textareaHeight?: string;
}

const PostFormFields: React.FC<PostFormFieldsProps> = ({
  editedPost,
  characterCount,
  isEditing,
  onTextChange,
  onHashtagsChange,
  onGenerate,
  textareaHeight = "h-20 sm:h-24"
}) => (
  <>
    {/* Title input */}
    <div className={cn("mb-3", !isEditing && "opacity-50")}>
      <label className="block text-xs sm:text-sm text-gray-600 mb-1">Title</label>
      <input
        type="text"
        name="title"
        className={cn(
          "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 text-sm",
          !isEditing && "bg-gray-50 cursor-default"
        )}
        value={editedPost.title}
        onChange={onTextChange}
        placeholder="Enter post title"
        readOnly={!isEditing}
      />
    </div>
    
    {/* Content textarea */}
    <div className={cn("mb-3", !isEditing && "opacity-50")}>
      <div className="flex justify-between items-center mb-1">
        <label className="block text-xs sm:text-sm text-gray-600">Caption</label>
        <span className="text-xs text-gray-400">{characterCount}/2,200</span>
      </div>
      {!isEditing ? (
        <div className={cn("w-full px-3 py-2 border border-gray-300 rounded-md resize-none overflow-y-auto text-gray-800 bg-gray-50 text-sm", textareaHeight)}>
          {editedPost.content.split('\n').map((line, i) => (
            <div key={i} className="mb-1 relative flex items-center">
              {line.includes("Netflix and Chill") && (
                <div className="flex items-center">
                  <span>{line}</span>
                  <XSquare className="ml-1 text-red-500 h-4 w-4" />
                </div>
              )}
              {line.includes("Mountain-ing and Hill") && (
                <div className="flex items-center">
                  <span>{line}</span>
                  <CheckSquare className="ml-1 text-green-600 h-4 w-4" />
                </div>
              )}
              {!line.includes("Netflix and Chill") && !line.includes("Mountain-ing and Hill") && (
                <span>{line}</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <textarea
          name="content"
          className={cn("w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none text-gray-800 text-sm", textareaHeight)}
          value={editedPost.content}
          onChange={onTextChange}
          placeholder="Write your caption..."
          maxLength={2200}
        />
      )}
    </div>
    
    {/* Hashtags input */}
    <div className={cn("mb-4", !isEditing && "opacity-50")}>
      <div className="flex justify-between items-center mb-1">
        <label className="block text-xs sm:text-sm text-gray-600">Hashtags</label>
        <span className="text-xs text-gray-400">0/2,200</span>
      </div>
      <input
        type="text"
        className={cn(
          "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 text-sm",
          !isEditing && "bg-gray-50 cursor-default"
        )}
        value={editedPost.hashtag}
        onChange={onHashtagsChange}
        placeholder="#hashtag1 #hashtag2 #hashtag3"
        readOnly={!isEditing}
      />
    </div>
    
    {/* AI Generation Button */}
    {onGenerate && ENABLE_AI_GENERATE && (
      <div className={cn("mb-4", !isEditing && "opacity-50")}>
        <button 
          className={cn(
            "inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 w-full",
            isEditing 
              ? "hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              : "cursor-not-allowed"
          )}
          onClick={onGenerate}
          disabled={!isEditing}
        >
          <Edit className="mr-2 h-4 w-4" />
          AI Generate
        </button>
      </div>
    )}
  </>
);

export default PostFormFields; 