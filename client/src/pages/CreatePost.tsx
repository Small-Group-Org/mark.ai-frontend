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
import { CircleHelp, TriangleAlert } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MediaGuidelinesDialog from "@/components/ui/media-guidelines-dialog";
import { getMediaSupportInfo } from "@/commons/utils";
import { Loader2 } from "lucide-react";
import { useLocation } from 'wouter';

const CreatePost = () => {
  const { livePost, setLivePost, setMessages, messages } = usePostStore();
  const { isMobileView, socialPlatforms, getConnectedPlatforms, getActivePlatforms } = useAuthStore();
  const {updatePostHandler} = useEditPost();
  const { postType, scheduleDate, mediaUrl } = livePost;
  const connectedPlatforms = getConnectedPlatforms() || []; 
  const [, navigate] = useLocation();

  // Get active platforms from user's toggle status
  const activePlatforms = getActivePlatforms();

  const { toast } = useToast();
  const { onSave } = useEditPost();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showMediaConfirm, setShowMediaConfirm] = useState(false);
  const [showMediaGuidelines, setShowMediaGuidelines] = useState(false);
  const [pendingAction, setPendingAction] = useState<"schedule" | "draft" | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const selectedPostTypeRef = useRef<string | null>(null);
  const initialMediaUrlRef = useRef<string[] | null>(null);

  useEffect(() => {
    if(!initialMediaUrlRef.current && mediaUrl.length){
      initialMediaUrlRef.current = mediaUrl;
    }
  }, [mediaUrl]);

  const supportedPostTypes = useMemo(() => {
    if (!activePlatforms || activePlatforms.length === 0) {
      return [];
    }

    let newSupportedPostTypes = [...AllPostType];

    activePlatforms.forEach((selectedPlatform) => {
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
  }, [activePlatforms, socialPlatforms]);

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
  }, [scheduleDate]);

  useEffect(() => {
    if(selectedPostTypeRef.current !== null){
      setLivePost({
        ...livePost,
        postType: ""
      })
    }

    selectedPostTypeRef.current = livePost.postType;
  }, [activePlatforms.length]);

  const handlePostTypeClick = async (type: SupportedPostType) => {
    if(livePost.postType !== type){
      let filteredMediaUrls = initialMediaUrlRef.current?.filter(url => !!url) || [];

      if (type === 'video' || type === 'reel') {
        const videoUrls = filteredMediaUrls.filter(url => url?.match(VIDEO_EXTENSIONS_REGEX));
        filteredMediaUrls = videoUrls.length > 0 ? [videoUrls[0]] : [];
      } else if (type === 'carousel') {
        filteredMediaUrls = filteredMediaUrls.filter(url => !url?.match(VIDEO_EXTENSIONS_REGEX));
      } else if(type === "story"){
        filteredMediaUrls = [filteredMediaUrls[0]];
      } else {
        filteredMediaUrls = [];
      }

      setLivePost({
        ...livePost,
        postType: type,
        mediaUrl: filteredMediaUrls
      });
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

  const onOpenEditModal = async (postId: string) => {
    navigate('/calendar');
    // try {
    //   const response = await getPosts({ postId });
    //   if (response && response.length > 0) {
    //     const post = response[0];
    //     editPostContext.onOpen(postId, post);
    //   }
    // } catch (error) {
    //   console.error('Error fetching post:', error);
    // }
  }

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
      platform: activePlatforms,
      hashtag: formattedHashtags,
      scheduleDate: date || new Date(),
      status,
    };

    const response = await onSave(updatedPost);

    if(response){
      resetLivePost();
      createDummyLivePost();
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          text: <>Post added to calendar. <span className="cursor-pointer underline" onClick={() => onOpenEditModal("")}>Click to edit.</span></>,
          sender: "system",
        }
      ])
    }
  };

  const handleSavePost = async (type: "schedule" | "draft") => {
    const currentPlatforms = Array.isArray(activePlatforms) ? activePlatforms : [];
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
      setIsSaving(true);
      try {
        await handleSave(pendingAction);
      } finally {
        setIsSaving(false);
        setPendingAction(null);
        setShowMediaConfirm(false);
      }
    }
  };

  const previewPanelBg = "bg-gray-100";

  return (
    <div className={`flex flex-col ${previewPanelBg} text-black h-full ${isMobileView ? 'h-[calc(100vh-70px-65px)]' : ''}`}>
      <div className={`flex flex-col ${previewPanelBg} text-black h-full`}>
        <div
          className={`h-[58px] flex items-center justify-between px-5 border-b border-gray-200 shrink-0 bg-white`}
        >
          <h2 className={`font-semibold text-gray-800`}>Post Preview</h2>
          <div
            className={`h-[24px] flex items-center gap-1 text-gray-400 border border-gray-200 bg-gray-50 ${
              connectedPlatforms.length > 0
                ? "cursor-pointer"
                : " cursor-not-allowed"
            } px-1 md:px-3 py-0 rounded-sm`}
            onClick={() =>
              connectedPlatforms.length > 0 && setShowMediaGuidelines(true)
            }
          >
            <CircleHelp className="w-4 h-4 md:h-3 md:w-3 inline-block mb-1 text-gray-500 mt-[2.5px]" />
            <p className="text-gray-500 text-xs hidden md:block">
              Media Guidelines
            </p>
          </div>
        </div>

        <div
          className={`px-3 md:px-5 py-3 border-b border-gray-200 bg-white shrink-0 flex flex-wrap gap-2 justify-between items-center`}
        >
          {
            supportedPostTypes.length === 0 
              ? (
                <div className="flex items-center gap-1 text-blue-600 border border-blue-200 bg-blue-50 px-2 py-[5.5px] rounded-sm">
                  <TriangleAlert className="w-4 h-4 inline-block mb-1" /> 
                  <p className="text-gray-500 text-[11px] sm:text-xs italic">
                    Please select a social media to show post-type
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
              initialMediaUrlRef={initialMediaUrlRef}
            />
          </div>
        </div>
      </div>
      <Dialog open={showMediaConfirm} onOpenChange={() => {
        if (!isSaving) {
          setShowMediaConfirm(false);
          setPendingAction(null);
        }
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
            }} disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleMediaConfirm} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Confirm'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <MediaGuidelinesDialog
        open={showMediaGuidelines}
        onOpenChange={setShowMediaGuidelines}
      />
    </div>
  );
};

export default CreatePost;
