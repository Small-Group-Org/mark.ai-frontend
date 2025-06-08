import React from 'react';
import { Trash2, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Post, PostStatus } from '@/types/post';
import ScheduleActionButton from "@/components/ui/schedule-action-button";
import DatePickerWithButton from "@/components/ui/date-picker-with-button";

interface SchedulingControlsProps {
  editedPost: Post;
  post: Post;
  date: Date;
  timeZoneLabel: string;
  isEditing: boolean;
  hasChanges: boolean;
  onDateChange: (date: Date) => void;
  onSave: (status: PostStatus) => void;
  onDelete: () => void;
  showDeleteConfirmation: (config: any) => void;
}

const SchedulingControls: React.FC<SchedulingControlsProps> = ({
  editedPost,
  post,
  date,
  timeZoneLabel,
  isEditing,
  hasChanges,
  onDateChange,
  onSave,
  onDelete,
  showDeleteConfirmation
}) => (
  <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 bg-white flex-shrink-0">
    <div className="flex justify-between items-center mb-1">
      <div className="text-xs text-gray-500">{timeZoneLabel}</div>
    </div>
    <div className="flex flex-col space-y-2">
      <DatePickerWithButton
        date={date}
        onDateChange={onDateChange}
        disabled={!isEditing}
        className={cn("w-full", !isEditing && "opacity-75")}
      />
      {editedPost.status === 'published' ? (
        <div className="flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md">
          <CheckCircle className="w-5 h-5" />
          <span>Post Published</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={() => showDeleteConfirmation({
              title: 'Delete Post',
              description: 'Are you sure you want to delete this post? This action cannot be undone.',
              confirmText: 'Delete Post',
              confirmButtonClass: 'bg-red-500 text-white hover:bg-red-600 border-0',
              onConfirm: onDelete,
            })}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
            title="Delete post"
          >
            <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
          </button>
          <div className="flex-1">
            <ScheduleActionButton
              onSchedule={() => isEditing && onSave('schedule')}
              onDraft={() => isEditing && onSave('draft')}
              className={!isEditing ? "opacity-70 cursor-not-allowed" : ""}
              disabled={!isEditing}
              initialPostStatus={post.status}
              hasChanges={hasChanges}
            />
          </div>
        </div>
      )}
    </div>
  </div>
);

export default SchedulingControls; 