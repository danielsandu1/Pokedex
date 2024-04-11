import React from "react";

const SkeletonCard = () => {
  return (
    <div className="flex items-center border border-gray-300 p-2 mb-2 rounded-md group px-5 py-4 transition-colors">
      <div className="w-12 h-12 mr-4">
        <div className="bg-gray-200 rounded-xl w-[48px] h-[48px]"></div>
      </div>
      <div className="flex-grow space-y-2">
        <div className="bg-gray-200 h-2 max-w-[200px]"></div>
        <div className="bg-gray-200 h-2 max-w-[200px]"></div>
        <div className="bg-gray-200 h-2 max-w-[200px]"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
