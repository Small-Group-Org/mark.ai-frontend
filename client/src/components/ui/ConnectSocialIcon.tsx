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
    <div className="relative h-full flex items-center justify-center cursor-pointer p-[2px] rounded-full border border-gray-700 ">
      <img
        src={image}
        alt="Social Icon"
        className={`h-full w-full rounded-full object-cover ${
          !isConnected ? "grayscale" : ""
        }`}
      />
      {!isConnected && (
        <span className="absolute bottom-[-2px] right-[-6px] w-6 h-6 text-lg bg-gray-700 rounded-full flex items-center justify-center border border-white pb-[2px] pl-[0.5px]">
          <span>+</span>
        </span>
      )}
    </div>
  );
};

export default ConnectSocialIcon;
