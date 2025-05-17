import React from "react";

interface ConnectSocialIconProps {
  image: string;
  isConnected: boolean;
}

const ConnectSocialIcon: React.FC<ConnectSocialIconProps> = ({
  image,
  isConnected,
}) => {
  return (
    <div className="relative h-full flex items-center justify-center cursor-pointer p-[2px] rounded-full border border-gray-200 ">
      <img
        src={image}
        alt="Social Icon"
        className={`h-full w-full rounded-full object-cover ${!isConnected ? "grayscale" : ""}`}
      />
      {!isConnected && (
        <span className="absolute bottom-[-4px] right-[-8px] w-7 h-7 text-lg bg-gray-700 rounded-full flex items-center justify-center border-2 border-white pb-[1px] pl-[1px]">
          +
        </span>
      )}
    </div>
  );
};

export default ConnectSocialIcon;
