import type { Sticker } from "@/src/utils/types";
import { useState } from "react";


const StickerDisplay = ({ sticker }: { sticker: Sticker }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Construct the full URL - handle cases where imageUrl might already include the base path
  const imageUrl = sticker.imageUrl.startsWith('http') 
    ? sticker.imageUrl 
    : `https://chat.kiuvinme.ge/${sticker.imageUrl.replace(/^\//, '')}`;

  if (hasError) {
    return (
      <div className="w-full h-24 flex items-center justify-center bg-[#3B4252] rounded text-xs text-[#D8DEE9]">
        Sticker not available
      </div>
    );
  }

  return (
    <div className="relative w-full h-24">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#3B4252] rounded">
          <div className="animate-pulse text-xs text-[#D8DEE9]">Loading...</div>
        </div>
      )}
      <img 
        src={imageUrl}
        alt={sticker.displayName}
        className={`w-full h-full object-contain ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
};

export default StickerDisplay;