import React, { useState, useEffect, useMemo, useRef } from "react";
import { resetLivePost, usePostStore } from "@/store/usePostStore";
import { useAuthStore } from "@/store/useAuthStore";
import { PostStatus } from "@/types/post";
import SocialMediaPostPreview from "@/components/ui/social-media-post-preview";
import { AllPostType, VIDEO_EXTENSIONS_REGEX } from "@/commons/constant";
import { useToast } from "@/hooks/use-toast";
import useEditPost from "@/hooks/use-edit-post";
import { createDummyLivePost } from "@/services/authServices";
import { formatHashtagsForSubmission } from "@/utils/postUtils";
import { SupportedPostType } from "@/types";
import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MediaGuidelinesDialog from "@/components/ui/media-guidelines-dialog";
import { getMediaSupportInfo } from "@/commons/utils";

const CreatePost = () => {
  const { livePost, setLivePost,  } = usePostStore();
  const { isMobileView, socialPlatforms } = useAuthStore();
  const {updatePostHandler} = useEditPost();
  const { platform, postType, scheduleDate, mediaUrl } = livePost;

  const { toast } = useToast();
  const { onSave } = useEditPost();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showMediaConfirm, setShowMediaConfirm] = useState(false);
  const [showMediaGuidelines, setShowMediaGuidelines] = useState(false);
  const [pendingAction, setPendingAction] = useState<"schedule" | "draft" | null>(null);

  const selectedPostTypeRef = useRef<string | null>(null);

  const supportedPostTypes = useMemo(() => {
    if (!livePost.platform || livePost.platform.length === 0) {
      return [];
    }

    let newSupportedPostTypes = [...AllPostType];

    livePost.platform.forEach((selectedPlatform) => {
      const supportedPostTypes = socialPlatforms.find(
        (socialMedia) => socialMedia.value === selectedPlatform
      )?.postType;

      if (supportedPostTypes) {
        newSupportedPostTypes = newSupportedPostTypes.filter(
          (postType) => supportedPostTypes[postType.id]
        );
      } else {
        newSupportedPostTypes = [];
      }
    });

    return newSupportedPostTypes;
  }, [livePost.platform]);

  useEffect(() => {
    try {
      if (livePost.scheduleDate) {
        setDate(livePost.scheduleDate);
      }
    } catch (error) {
      console.error("Error parsing scheduleDate prop:", error);
      const now = new Date();
      setDate(now);
    }
  }, [livePost.scheduleDate]);

  useEffect(() => {
    if(selectedPostTypeRef.current !== null){
      setLivePost({
        ...livePost,
        postType: ""
      })
    }

    selectedPostTypeRef.current = livePost.postType;
  }, [livePost.platform.length])

  const handlePostTypeClick = async (type: SupportedPostType) => {
    if(livePost.postType !== type){
      let filteredMediaUrls = livePost.mediaUrl || [];
      
      if (type === 'video' || type === 'reel' || type === 'story') {
        const videoUrls = filteredMediaUrls.filter(url => url.match(VIDEO_EXTENSIONS_REGEX));
        filteredMediaUrls = videoUrls.length > 0 ? [videoUrls[0]] : [];
      } else if (type === 'carousel') {
        filteredMediaUrls = filteredMediaUrls.filter(url => !url.match(VIDEO_EXTENSIONS_REGEX));
      }

      setLivePost({
        ...livePost,
        postType: type,
        mediaUrl: filteredMediaUrls
      });

     if(postType !== "text" && mediaUrl.length !== filteredMediaUrls.length){
        await updatePostHandler ("mediaUrl", filteredMediaUrls);
     }
    }
  };

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    setLivePost({ scheduleDate: newDate });
  };
  
  const handleMediaChange = async (mediaUrls: string[]) => {
    setLivePost({ ...livePost, mediaUrl: mediaUrls });

    await updatePostHandler("mediaUrl", mediaUrls);
  };

  const handleSave = async (status: PostStatus) => {
    const now = new Date();
    if (date && date < now) {
      toast({
        title: "Invalid Date/Time",
        description: "Please select a future date and time.",
        variant: "destructive",
      });
      return;
    }

    const formattedHashtags = formatHashtagsForSubmission(livePost.hashtag || '');

    const updatedPost = {
      ...livePost,
      hashtag: formattedHashtags,
      scheduleDate: date || new Date(),
      status,
    };

    const response = await onSave(updatedPost);

    if(response){
      resetLivePost();
      createDummyLivePost();
    }
  };

  const handleSavePost = async (type: "schedule" | "draft") => {
    const currentPlatforms = Array.isArray(platform) ? platform : [];
    if (currentPlatforms.length === 0) {
      toast({
        title: "Please select a Platform",
        description: `Please select at least one platform to ${type === "schedule" ? "schedule" : "save"} your post.`,
        variant: "destructive",
      });
      return;
    }

    if(!livePost.postType){
      toast({
        title: "Please select a post type",
        description: `Please select post type to ${type === "schedule" ? "schedule" : "save"} your post.`,
        variant: "destructive",
      });
      return;
    }

    setPendingAction(type);
    setShowMediaConfirm(true);
  };

  const handleMediaConfirm = async () => {
    if (pendingAction) {
      await handleSave(pendingAction);
      setPendingAction(null);
    }
    setShowMediaConfirm(false);
  };

  const previewPanelBg = "bg-gray-100";

  return (
    <div className={`flex flex-col ${previewPanelBg} text-black h-full ${isMobileView ? 'h-[calc(100vh-70px-65px)]' : ''}`}>
      <div className={`flex flex-col ${previewPanelBg} text-black h-full`}>
        <div
          className={`h-[58px] flex items-center px-5 border-b border-gray-200 shrink-0 bg-white`}
        >
          <h2 className={`font-semibold text-gray-800`}>Post Preview</h2>
        </div>

        <div
          className={`px-5 py-3 border-b border-gray-200 bg-white shrink-0 flex flex-wrap gap-3 justify-between items-center`}
        >
          {
            supportedPostTypes.length === 0 
              ? (
                <div className="flex items-center gap-2 text-blue-600 border border-blue-200 bg-blue-50 px-4 py-[5.5px] rounded-lg">
                  <p className="text-gray-500 text-sm italic">
                    <Info className="w-4 h-4 inline-block mb-1" /> Please select a social media to show post-type
                  </p>
                </div>
              )
              : <div className="flex gap-2">
                {
                  supportedPostTypes.map((type) => (
                    <button
                      key={type.id}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium border ${
                        (postType === type.id)
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
                      }`}
                      onClick={() => handlePostTypeClick(type.id)}
                    >
                      {type.label}
                    </button>
                )) }
                </div>
          }

                <div 
                  className={`h-[24px] flex items-center gap-1 ${
                    platform && platform.length > 0 
                      ? 'text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 cursor-pointer' 
                      : 'text-gray-400 border border-gray-200 bg-gray-50 cursor-not-allowed'
                  } px-3 py-0 rounded-sm`}
                  onClick={() => platform && platform.length > 0 && setShowMediaGuidelines(true)}
                >
                  <Info className="w-3 h-3 inline-block mb-1 text-gray-500 mt-[2.5px]" />
                  <p className="text-gray-500 text-xs italic">
                     Media Guidelines
                  </p>
                </div>
        </div>

        <div className={`flex-1 overflow-y-auto bg-white`}>
          <div className="p-4">
            <SocialMediaPostPreview
              scheduledDate={scheduleDate}
              onSchedule={() => handleSavePost("schedule")}
              onDraft={() => handleSavePost("draft")}
              onDateChange={handleDateChange}
              hideFooter={false}
              uploadedMediaFile={mediaUrl}
              onMediaChange={handleMediaChange}
            />
          </div>
        </div>
      </div>
      <Dialog open={showMediaConfirm} onOpenChange={() => {
        setShowMediaConfirm(false);
        setPendingAction(null);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-gray-800">Confirm Media Support</DialogTitle>
            <DialogDescription>
              <p className="mt-2 mb-4">Please confirm that the media uploaded is supported for the selected post type.</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Supported Media for {postType?.charAt(0).toUpperCase() + postType?.slice(1)}:</h4>
                <p className="text-sm text-gray-600">{getMediaSupportInfo(postType as SupportedPostType)}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" className="text-gray-800" onClick={() => {
              setShowMediaConfirm(false);
              setPendingAction(null);
            }}>
              Cancel
            </Button>
            <Button onClick={handleMediaConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <MediaGuidelinesDialog
        open={showMediaGuidelines}
        onOpenChange={setShowMediaGuidelines}
        selectedPlatforms={platform || []}
      />
    </div>
  );
};

export default CreatePost;
