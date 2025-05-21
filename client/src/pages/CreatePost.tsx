import React, { useState, useEffect } from "react";
import { parseISO } from "date-fns";
import { usePostStore } from "@/store/usePostStore";
import { PlatformName } from "@/types";
import PlatformToggle from "@/components/dashboard/PlatformToggle";
import SocialMediaPostPreview from "@/components/ui/social-media-post-preview";
import { postTypes } from "@/commons/constant";
import { useToast } from "@/hooks/use-toast";

// Component receives props now
const CreatePost = () => {
  const {
    mediaUrl,
    scheduledDate,
    postContent,
    postTitle,
    postType,
    socialPlatforms,
    postHashtags,
    setScheduledDate,
    setSocialPlatforms,
    setPostType,
    setMediaUrl,
  } = usePostStore();

  const { toast } = useToast();

  // --- Local UI State Only ---
  const [date, setDate] = useState<Date | undefined>(new Date());

  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [localImageUrl, setLocalImageUrl] = useState<string | null>(null);

  // Show local preview if file is selected, otherwise use mediaUrl
  const imageUrl =
    localImageUrl ||
    (mediaUrl && mediaUrl.length > 0 ? mediaUrl[0] : undefined);

  // Effect to parse the ISO scheduledDate prop and set date and time inputs
  useEffect(() => {
    try {
      if (scheduledDate) {
        const parsedDate = parseISO(scheduledDate);
        setDate(parsedDate); // Set the main date object
      }
    } catch (error) {
      console.error("Error parsing scheduledDate prop:", error);
      // Fallback to current time if parse fails or scheduledDate is invalid
      const now = new Date();
      setDate(now);
    }
  }, [scheduledDate]);

  // Clean up local object URL when file changes
  useEffect(() => {
    if (uploadedImageFile) {
      const url = URL.createObjectURL(uploadedImageFile);
      setLocalImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setLocalImageUrl(null);
    }
  }, [uploadedImageFile]);

  const handlePlatformToggle = (platformName: PlatformName) => {
    setSocialPlatforms({
      ...socialPlatforms,
      [platformName]: !socialPlatforms[platformName],
    });
  };

  // Handle post type click - use prop setter
  const handlePostTypeClick = (type: "post" | "story" | "reel") => {
    setPostType({
      ...postType,
      post: type === "post" ? !postType.post : postType.post ?? false,
      story: type === "story" ? !postType.story : postType.story ?? false,
      reel: type === "reel" ? !postType.reel : postType.reel ?? false,
    });
  };

  // Update the date change handler
  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    setScheduledDate(newDate.toISOString());
  };

  // Image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImageFile(file);
    }
  };

  // Modified handler to handle scheduling
  const handleSchedulePost = async () => {
    try {
      let responseData;
      if (uploadedImageFile) {
        const formData = new FormData();
        formData.append("image", uploadedImageFile);
        formData.append("title", postTitle || "");
        formData.append("content", postContent || "");
        formData.append("hashtags", JSON.stringify(postHashtags));
        formData.append("socialPlatforms", JSON.stringify(socialPlatforms));
        formData.append("postType", JSON.stringify(postType));
        formData.append("scheduledDate", scheduledDate);
        // TODO: Replace with your actual API endpoint
        const response = await fetch("/api/schedule-post", {
          method: "POST",
          body: formData,
        });
        responseData = await response.json();
      } else {
        // Fallback: send as JSON if no image
        const response = await fetch("/api/schedule-post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: postTitle,
            content: postContent,
            hashtags: postHashtags,
            socialPlatforms,
            postType,
            scheduledDate,
          }),
        });
        responseData = await response.json();
      }
      // If backend returns image URL, update mediaUrl and clear local file
      if (responseData && responseData.url) {
        setUploadedImageFile(null);
        setLocalImageUrl(null);
        if (responseData.url) {
          if (typeof setMediaUrl === "function")
            setMediaUrl([responseData.url]);
        }
      }
      toast({
        title: "Success",
        description: `Post successfully scheduled for: ${date}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule post.",
        variant: "destructive",
      });
    }
  };

  // Handle the actual draft post saving
  const handleSaveDraft = () => {
    try {
      // Save draft post logic
      const draftData = {
        title: postTitle,
        content: postContent,
        hashtags: postHashtags,
        platforms: Object.entries(socialPlatforms)
          .filter(([_, isActive]) => isActive)
          .map(([name]) => name),
        scheduledDate: scheduledDate,
        postType: postType,
      };

      // Save draft to localStorage for persistence
      const existingDrafts = JSON.parse(
        localStorage.getItem("postDrafts") || "[]"
      );
      existingDrafts.push({
        ...draftData,
        id: Date.now(), // Simple unique ID
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("postDrafts", JSON.stringify(existingDrafts));

      toast({
        title: "Success",
        description: "Post saved as draft!",
      });
    } catch (error) {
      console.error("Error saving draft:", error);
      toast({
        title: "Error",
        description: "Failed to save draft.",
        variant: "destructive",
      });
    }
  };

  // --- Render using props and local UI state ---
  // Color definitions (remain the same)
  const previewPanelBg = "bg-gray-100";
  // ... other color definitions ...
  const scheduleButtonBg = "bg-cyan-500";
  const datePickerBg = "bg-gray-200";
  const datePickerText = "text-gray-700";

  // Platform Data (remain the same)
  const platformsRow1: { name: PlatformName; icon: string }[] = [
    { name: "Instagram", icon: "I" },
    { name: "X/Twitter", icon: "X" },
    { name: "Threads", icon: "@" },
    { name: "TikTok", icon: "♪" },
    { name: "YouTube", icon: "▶" },
  ];

  return (
    <div className={`flex flex-col ${previewPanelBg} text-black h-full`}>
      {/* Header (remains the same) */}
      <div
        className={`h-[58px] flex items-center px-5 border-b border-gray-200 shrink-0 bg-white`}
      >
        <h2 className={`font-semibold text-gray-800`}>Post Preview</h2>
      </div>

      <div className={`px-5 py-2 border-b border-gray-200 bg-gray-50 shrink-0`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-4 gap-x-4 sm:gap-x-6">
          {[...platformsRow1].map((platform) => (
            <PlatformToggle
              key={platform.name}
              label={platform.name}
              icon={platform.icon}
              active={socialPlatforms?.[platform.name] ?? false} // Use prop with fallback
              onToggle={() => handlePlatformToggle(platform.name)} // Calls prop setter
            />
          ))}
        </div>
      </div>

      <div
        className={`px-5 py-3 border-b border-gray-200 bg-white shrink-0 flex flex-wrap gap-3`}
      >
        {postTypes.map((type) => (
          <button
            key={type.id}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium border ${
              postType?.[type.id]
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
            }`}
            onClick={() => handlePostTypeClick(type.id)}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className={`flex-1 overflow-y-auto bg-white`}>
        <div className="p-6">
          <SocialMediaPostPreview
            userInitials="SC"
            userName="Stephen Conley"
            userHandle="@steveconley"
            userTitle="Product Designer"
            scheduledDate={date}
            onSchedule={handleSchedulePost}
            onDraft={handleSaveDraft}
            onDateChange={handleDateChange}
            hideFooter={false}
            onImageUpload={handleImageUpload}
            uploadedImageFile={uploadedImageFile}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
