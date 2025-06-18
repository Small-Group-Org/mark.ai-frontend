import React from "react";
import { CircleUser } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { getPlatformImage } from "@/commons/utils";

interface UserProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserProfileDialog: React.FC<UserProfileDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { userDetails, getConnectedPlatforms } = useAuthStore();
  const connectedPlatforms = getConnectedPlatforms();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <CircleUser className="w-5 h-5" />
            User Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* User Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {userDetails?.name 
                    ? userDetails.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('').slice(0, 2)
                    : '?'
                  }
                </div>
                <div>
                  <p className="text-gray-800 font-medium">
                    {userDetails?.name 
                      ? userDetails.name.split(' ').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                        ).join(' ')
                      : 'User Name'
                    }
                  </p>
                  <p className="text-gray-600 text-sm">{userDetails?.email || 'user@example.com'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Connected Platforms */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-light text-sm text-gray-800 mb-3 inline-block">Connected Platforms</h3>
            {connectedPlatforms.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {connectedPlatforms.map((platform) => (
                  <div 
                    key={platform.value} 
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-gray-200"
                  >
                    <img 
                      src={getPlatformImage(platform.value)} 
                      alt={platform.label}
                      className="w-4 h-4 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-700">{platform.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No platforms connected</p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={() => onOpenChange(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog; 