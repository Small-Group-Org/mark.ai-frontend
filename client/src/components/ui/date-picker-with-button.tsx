import React, { useState } from "react";
import { format } from "date-fns";
import DateTimePicker from "./date-time-picker";

interface DatePickerWithButtonProps {
  date: string;
  onDateChange: (date: Date) => void;
  className?: string;
}

const DatePickerWithButton: React.FC<DatePickerWithButtonProps> = ({
  date,
  onDateChange,
  className = "",
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleButtonClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleDateChange = (newDate: Date) => {
    onDateChange(newDate);
    setIsCalendarOpen(false);
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 ${className}`}
      >
        {date || "Select Date"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-500"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      </button>

      <DateTimePicker
        selectedDate={date ? new Date(date) : new Date()}
        onDateChange={handleDateChange}
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
    </>
  );
};

export default DatePickerWithButton; 