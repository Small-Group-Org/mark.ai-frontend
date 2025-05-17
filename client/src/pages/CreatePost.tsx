import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";
import { usePostStore } from "@/store/usePostStore";
import { PlatformName } from "@/types";
import PlatformToggle from "@/components/dashboard/PlatformToggle";
import SocialMediaPostPreview from "@/components/ui/social-media-post-preview";
import { postTypes } from "@/commons/constant";

// Simple ChevronDownIcon (can be moved to IconComponents later)
const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

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

  // --- Local UI State Only ---
  const [date, setDate] = useState<Date | undefined>(new Date()); // Initialize with current date
  const [displayDate, setDisplayDate] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // New state for time inputs
  const [inputHour, setInputHour] = useState<string>("09"); // e.g., "01" through "12"
  const [inputMinute, setInputMinute] = useState<string>("00"); // e.g., "00", "15", "30", "45"
  const [inputAmPm, setInputAmPm] = useState<"AM" | "PM">("AM");

  // State for schedule options dropdown
  const [isScheduleOptionsOpen, setIsScheduleOptionsOpen] = useState(false);
  const [selectedButtonType, setSelectedButtonType] = useState<
    "schedule" | "draft"
  >("schedule");
  const scheduleButtonRef = useRef<HTMLDivElement>(null); // For closing dropdown on outside click

  const calendarRef = useRef<HTMLDivElement>(null);
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [localImageUrl, setLocalImageUrl] = useState<string | null>(null);

  // Show local preview if file is selected, otherwise use mediaUrl
  const imageUrl =
    localImageUrl ||
    (mediaUrl && mediaUrl.length > 0 ? mediaUrl[0] : undefined);

  // Options for time dropdowns
  const hourOptions = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );

  // Create a more manageable set of minute options (increments of 5, plus the exact current minute)
  const generateMinuteOptions = () => {
    // First create standard 5-minute increments
    const fiveMinIncrements = Array.from({ length: 12 }, (_, i) =>
      (i * 5).toString().padStart(2, "0")
    );

    // Get current selected minute
    const currentSelectedMinute = inputMinute;

    // If the current selected minute is not in the 5-minute increments, add it
    if (
      currentSelectedMinute &&
      !fiveMinIncrements.includes(currentSelectedMinute)
    ) {
      fiveMinIncrements.push(currentSelectedMinute);
      // Sort numerically
      fiveMinIncrements.sort((a, b) => parseInt(a) - parseInt(b));
    }

    return fiveMinIncrements;
  };

  // For direct input, create all 60 options in case user needs specific minute
  const allMinuteOptions = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  // Use the reduced set for display
  const minuteOptions = generateMinuteOptions();

  console.log(
    "[PostPreviewPanel Render] isScheduleOptionsOpen:",
    isScheduleOptionsOpen
  );

  // Effect to parse the ISO scheduledDate prop and set date and time inputs
  useEffect(() => {
    try {
      if (scheduledDate) {
        const parsedDate = parseISO(scheduledDate);
        setDate(parsedDate); // Set the main date object

        let hours = parsedDate.getHours();
        const minutes = parsedDate.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convert to 12-hour format

        setInputHour(hours.toString().padStart(2, "0"));
        setInputMinute(minutes.toString().padStart(2, "0"));
        setInputAmPm(ampm);
      }
    } catch (error) {
      console.error("Error parsing scheduledDate prop:", error);
      // Fallback to current time if parse fails or scheduledDate is invalid
      const now = new Date();
      setDate(now);
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      setInputHour(hours.toString().padStart(2, "0"));
      setInputMinute(minutes.toString().padStart(2, "0"));
      setInputAmPm(ampm);
    }
  }, [scheduledDate]);

  // Effect to update the display date string whenever the main 'date' object changes
  useEffect(() => {
    if (date) {
      // Format date to "MMMM d, yyyy • h:mm aa" (e.g., May 10, 2025 • 9:30 AM)
      setDisplayDate(format(date, "MMMM d, yyyy • h:mm aa"));
    }
  }, [date]); // Re-run when the main date object changes

  // Effect for handling changes from time inputs (hour, minute, AM/PM)
  useEffect(() => {
    if (!date) return; // Guard if date is not yet initialized

    const currentHours = parseInt(inputHour, 10);
    const currentMinutes = parseInt(inputMinute, 10);

    if (isNaN(currentHours) || isNaN(currentMinutes)) return; // Guard against invalid number parsing

    let newHours24 = currentHours;
    if (inputAmPm === "PM" && currentHours < 12) {
      newHours24 += 12;
    } else if (inputAmPm === "AM" && currentHours === 12) {
      // Midnight case (12 AM)
      newHours24 = 0;
    }

    const newDate = new Date(date); // Start with a copy of the current date (to keep day, month, year)
    newDate.setHours(newHours24, currentMinutes, 0, 0); // Set new hours and minutes

    // Check if this newDate is actually different from the current 'date' state to avoid infinite loops
    if (date && newDate.getTime() !== date.getTime()) {
      setDate(newDate); // Update the main date state
      setScheduledDate(newDate.toISOString()); // Update parent state
    }
    // IMPORTANT: Add date to dependency array if we want time changes to reflect on a *newly picked date* immediately.
    // However, be cautious of infinite loops. A more robust solution might be to have explicit update button or blur handlers.
    // For now, this effect primarily reacts to manual changes in time inputs.
  }, [inputHour, inputMinute, inputAmPm, date, setScheduledDate]); // Added date back, as newDate is derived from it.

  // Effect for closing calendar and dropdown on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close calendar if click is outside
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }

      // Close schedule options dropdown if click is outside
      if (
        scheduleButtonRef.current &&
        !scheduleButtonRef.current.contains(event.target as Node)
      ) {
        setIsScheduleOptionsOpen(false);
      }
    };

    // Close dropdown on escape key
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCalendarOpen(false);
        setIsScheduleOptionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

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

  // Toggle calendar visibility
  const handleDateChange = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  // Handle date selection from calendar
  const handleSelectDate = (selectedDateFromCalendar: Date | undefined) => {
    if (selectedDateFromCalendar && date) {
      // Ensure local 'date' is available for time preservation
      const newDate = new Date(selectedDateFromCalendar);

      let hours24 = parseInt(inputHour, 10);
      if (isNaN(hours24)) hours24 = new Date().getHours(); // Fallback if inputHour is not a number

      let minutes = parseInt(inputMinute, 10);
      if (isNaN(minutes)) minutes = new Date().getMinutes(); // Fallback if inputMinute is not a number

      if (inputAmPm === "PM" && hours24 < 12) hours24 += 12;
      if (inputAmPm === "AM" && hours24 === 12) hours24 = 0;

      newDate.setHours(hours24, minutes, 0, 0);

      setDate(newDate);
      setScheduledDate(newDate.toISOString());
      setIsCalendarOpen(false);
    }
  };

  // New robust input handlers (simplified for select dropdowns)
  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputHour(e.target.value);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputMinute(e.target.value);
  };

  const handleAmPmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputAmPm(e.target.value as "AM" | "PM");
  };

  // Image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImageFile(file);
    }
  };

  // Modified handler to handle either scheduling or drafting based on selected type
  const handleSchedulePost = async () => {
    try {
      // Check which action to perform based on the selected button type
      if (selectedButtonType === "schedule") {
        // Schedule post action
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
            // Assuming setMediaUrl is available via props (if not, lift state up)
            if (typeof setMediaUrl === "function")
              setMediaUrl([responseData.url]);
          }
        }
        alert(`Post successfully scheduled for: ${displayDate}`);
      } else {
        // This is a draft action
        handleSaveDraft();
      }
    } catch (error) {
      if (selectedButtonType === "schedule") {
        alert("Failed to schedule post.");
      } else {
        alert("Failed to save draft.");
      }
    }
  };

  // Handlers for dropdown menu
  const handleToggleScheduleOptions = () => {
    setIsScheduleOptionsOpen(!isScheduleOptionsOpen);
  };

  // Handle dropdown option toggle - this is called by SocialMediaPostPreview component
  const handleToggleDropdownOption = () => {
    // Toggle between 'schedule' and 'draft'
    setSelectedButtonType((prev) =>
      prev === "schedule" ? "draft" : "schedule"
    );
  };

  // Handle the actual draft post saving when button is clicked
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

      console.log("[PostPreviewPanel] Post saved as draft:", draftData);
      alert("Post saved as draft!");
    } catch (error) {
      console.error("Error saving draft:", error);
      alert("Failed to save draft.");
    }
  };

  // Effect to parse the ISO scheduledDate prop and set date and time inputs
  // This is Effect A - Prop to Local Time Inputs
  useEffect(() => {
    try {
      if (scheduledDate) {
        const parsedDateFromProp = parseISO(scheduledDate);

        // Current time represented by input fields
        let currentInputHoursNum = parseInt(inputHour, 10);
        let currentInputMinutesNum = parseInt(inputMinute, 10);

        if (isNaN(currentInputHoursNum) || isNaN(currentInputMinutesNum)) {
          // If inputs are somehow not valid numbers, force update from prop
          console.warn(
            "[PostPreviewPanel Effect A] Invalid current time inputs, forcing update from prop."
          );
        } else {
          let currentInputHours24 = currentInputHoursNum;
          if (inputAmPm === "PM" && currentInputHoursNum < 12)
            currentInputHours24 += 12;
          if (inputAmPm === "AM" && currentInputHoursNum === 12)
            currentInputHours24 = 0;

          const propHours24 = parsedDateFromProp.getHours();
          const propMinutes = parsedDateFromProp.getMinutes();

          // Check if the time from prop is actually different from what inputs represent
          if (
            propHours24 === currentInputHours24 &&
            propMinutes === currentInputMinutesNum
          ) {
            // Time is the same, only update main 'date' object if its date part changed or it's not set
            if (
              !date ||
              parsedDateFromProp.toDateString() !== date.toDateString()
            ) {
              setDate(parsedDateFromProp);
            }
            return; // Avoid resetting input fields if time is effectively the same
          }
        }

        // If we reach here, it means the time from prop IS different, or inputs were invalid.
        // So, reset the input fields based on the scheduledDate prop.
        console.log(
          "[PostPreviewPanel Effect A] scheduledDate prop change caused time input reset. Prop time:",
          parsedDateFromProp.toLocaleTimeString(),
          "Current input time effectively:",
          `${currentInputHoursNum}:${inputMinute} ${inputAmPm}`
        );
        setDate(parsedDateFromProp);

        let displayHours = parsedDateFromProp.getHours();
        const displayMinutes = parsedDateFromProp.getMinutes();
        const newAmPm = displayHours >= 12 ? "PM" : "AM";
        displayHours = displayHours % 12 || 12;

        setInputHour(displayHours.toString().padStart(2, "0"));
        setInputMinute(displayMinutes.toString().padStart(2, "0"));
        setInputAmPm(newAmPm);
      }
    } catch (error) {
      console.error(
        "[PostPreviewPanel Effect A] Error parsing scheduledDate prop:",
        error,
        "Value:",
        scheduledDate
      );
      const now = new Date();
      setDate(now);
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      setInputHour(hours.toString().padStart(2, "0"));
      setInputMinute(minutes.toString().padStart(2, "0"));
      setInputAmPm(ampm);
    }
  }, [scheduledDate]); // Only react to external prop changes for setting inputs

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
            scheduledDate={displayDate} // Use local display state
            onSchedule={handleSchedulePost}
            onDateChange={handleDateChange}
            onToggleOptions={handleToggleDropdownOption}
            hideFooter={false}
            onImageUpload={handleImageUpload}
            uploadedImageFile={uploadedImageFile}
            buttonType={selectedButtonType} // Pass the selected button type
          />

          {isCalendarOpen && (
            <div
              ref={calendarRef}
              className="fixed right-1/4 top-1/3 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-3"
            >
              <div className="flex flex-col">
                <Calendar
                  mode="single"
                  selected={date} // Use local date state
                  onSelect={handleSelectDate} // Updates local state and calls prop setter
                  className="rounded-md border"
                />
                <div className="mt-3 border-t pt-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Select Time:
                  </h4>
                  <div className="flex items-center space-x-2">
                    {/* Hour Dropdown */}
                    <select
                      value={inputHour}
                      onChange={handleHourChange}
                      className="hour-select w-auto p-1.5 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm time-select"
                      size={1}
                    >
                      {hourOptions.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                    <span className="text-gray-700">:</span>
                    {/* Minute Dropdown with controlled height */}
                    <select
                      value={inputMinute}
                      onChange={handleMinuteChange}
                      className="minute-select w-auto p-1.5 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm time-select"
                      size={1}
                    >
                      {minuteOptions.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                      {/* Add a "Custom..." option that shows all minutes */}
                      <option
                        value="custom"
                        disabled
                        style={{ fontStyle: "italic", color: "#aaa" }}
                      >
                        ───────────
                      </option>
                      {allMinuteOptions
                        .filter((m) => !minuteOptions.includes(m)) // Only show minutes not already in the list
                        .map((m) => (
                          <option key={`all-${m}`} value={m}>
                            {m}
                          </option>
                        ))}
                    </select>
                    {/* AM/PM Selector */}
                    <select
                      value={inputAmPm}
                      onChange={handleAmPmChange}
                      className="w-auto p-1.5 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
