import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlatformType } from "@/types";
import { initialSocialPlatforms } from "@/commons/constant";
import { X } from "lucide-react";
import { getPlatformImage } from '@/commons/utils';
import { useAuthStore } from "@/store/useAuthStore";

interface MediaGuidelinesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MediaGuidelinesDialog: React.FC<MediaGuidelinesDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { getConnectedPlatforms } = useAuthStore();
  const connectedPlatforms = getConnectedPlatforms();

  const getPlatformGuidelines = () => {
    return connectedPlatforms.map(platform => {
      const platformInfo = initialSocialPlatforms.find(sp => sp.value === platform.value);

      return {
        platform: platform.value,
        label: platformInfo?.label || platform.value,
        guidelines: platformInfo?.mediaGuidelines || 'No specific guidelines available for this platform.',
        img: getPlatformImage(platformInfo?.value as PlatformType)
      };
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-800">Media Guidelines</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full border border-gray-300"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
          <DialogDescription className="text-gray-500">
            Guidelines for media uploads on your connected platforms
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {getPlatformGuidelines().map((guideline, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 p-4 bg-gray-50 border-b border-gray-200">
                {guideline.img && (
                  <div className="w-10 h-10 rounded-full bg-white p-1.5 shadow-sm">
                    <img
                      src={guideline.img}
                      alt={guideline.label}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-800 capitalize">
                  {guideline.label}
                </h3>
              </div>
              <div className="p-4">
                <div className="prose prose-sm max-w-none text-gray-600">
                  {guideline.guidelines.split('. ').map((sentence, i) => (
                    <p key={i} className="mb-2 last:mb-0">
                      {sentence.trim()}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MediaGuidelinesDialog; 