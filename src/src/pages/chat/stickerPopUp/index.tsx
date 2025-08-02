import type { Message, Sticker, StickerPack } from "@/src/utils/types";
import { useEffect, useState } from "react";
import StickerDisplay from "../stickerdisplay";


const StickerPopUp:React.FC<{setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
   connectionRef:React.RefObject<signalR.HubConnection | null>,
   isConnected:boolean, showStickerPicker:boolean, 
   stickerPickerRef:React.RefObject<HTMLDivElement | null>,
   setShowStickerPicker:React.Dispatch<React.SetStateAction<boolean>>
}> = ({setMessages, connectionRef, isConnected, stickerPickerRef, showStickerPicker, setShowStickerPicker}) => {
          
          const [stickerPacks, setStickerPacks] = useState<StickerPack[]>([]);
          const [currentPack, setCurrentPack] = useState<StickerPack | null>(null);
          const [activeTabIndex, setActiveTabIndex] = useState(0);
          const [isLoadingStickers, setIsLoadingStickers] = useState(false);
          const [stickerError, setStickerError] = useState<string | null>(null);


          // Load sticker packs
            useEffect(() => {
              const loadStickerPacks = async () => {
                try {
                  setIsLoadingStickers(true);
                  setStickerError(null);
                  
                  const response = await fetch('https://chat.kiuvinme.ge/sticker/GetStickerPacks');
                  
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  
                  const packs = await response.json();
                  setStickerPacks(packs);
                  
                  // Select the first pack by default
                  if (packs.length > 0) {
                    selectStickerPack(packs[0], 0);
                  }
                } catch (err) {
                  console.error("Failed to load sticker packs:", err);
                  setStickerError(err instanceof Error ? err.message : 'Unknown error');
                } finally {
                  setIsLoadingStickers(false);
                }
              };
          
              loadStickerPacks();
            }, []);
          
            // Select sticker pack handler
            const selectStickerPack = async (pack: StickerPack, index: number) => {
              try {
                setIsLoadingStickers(true);
                setActiveTabIndex(index);
                setStickerError(null);
                
                // Only fetch stickers if we don't have them already
                if (!pack.stickers) {
                  const response = await fetch(
                    `https://chat.kiuvinme.ge/sticker/GetStickersFromPack?packId=${pack.uid}`
                  );
                  
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  
                  const stickers: Sticker[] = await response.json();
                  
                  // Create updated pack with stickers
                  const updatedPack = { ...pack, stickers };
                  
                  // Update the pack with the loaded stickers
                  setStickerPacks(prevPacks =>
                    prevPacks.map(p => 
                      p.uid === pack.uid ? updatedPack : p
                    )
                  );
                  
                  // Set the current pack to the updated pack with stickers
                  setCurrentPack(updatedPack);
                } else {
                  // Pack already has stickers, just set it as current
                  setCurrentPack(pack);
                }
              } catch (err) {
                console.error("Failed to load stickers:", err);
                setStickerError(err instanceof Error ? err.message : 'Unknown error');
              } finally {
                setIsLoadingStickers(false);
              }
            };
          

      const sendSticker = async (stickerId: string, stickerUrl: string, displayName: string) => {
    if (!connectionRef.current) return;

    try {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: displayName,
        sender: "You",
        timestamp: new Date(),
        isOwn: true,
        isSticker: true,
        stickerUrl: stickerUrl
      };
      setMessages(prev => [...prev, newMessage]);
      setShowStickerPicker(false); // Close sticker picker after sending

      await connectionRef.current.invoke("SendSticker", stickerId, stickerUrl, displayName);
    } catch (err) {
      console.error("Error sending sticker:", err);
    }
  };

    return(
                 <div className="relative">
                  <button
  onClick={() => isConnected && setShowStickerPicker((prev) => !prev)}
  className={`w-[38px] 2xl:w-[48px] h-[38px] 2xl:h-[48px] cursor-pointer group flex items-center justify-center rounded-md transition-colors duration-200 ${
    !isConnected ? 'opacity-50' : ''
  }`}
  disabled={!isConnected}
  aria-label="Toggle sticker picker"
>

  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
  <path  className={`group-hover:stroke-main duration-200 ${
        showStickerPicker ? "stroke-main" : "stroke-[#E5E9F0]"
      }`} d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16" stroke-width="1.5" stroke-linecap="round"></path>
  <ellipse  className={`group-hover:fill-main duration-200 ${
        showStickerPicker ? "fill-main" : "fill-[#E5E9F0]"
      }`} cx="15" cy="10.5" rx="1" ry="1.5"></ellipse>
  <ellipse  className={`group-hover:fill-main duration-200 ${
        showStickerPicker ? "fill-main" : "fill-[#E5E9F0]"
      }`} cx="9" cy="10.5" rx="1" ry="1.5" fill="#1C274C"></ellipse>
  <path className={`group-hover:stroke-main duration-200 ${
        showStickerPicker ? "stroke-main" : "stroke-[#E5E9F0]"
      }`} d="M15 22H12C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12V15M15 22C18.866 22 22 18.866 22 15M15 22C15 20.1387 15 19.2081 15.2447 18.4549C15.7393 16.9327 16.9327 15.7393 18.4549 15.2447C19.2081 15 20.1387 15 22 15" stroke-width="1.5">
  </path> </g></svg>

  {/* <svg
    className="w-full h-full" // Ensures SVG fills the button
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={`group-hover:fill-main duration-200 ${
        showStickerPicker ? "fill-main" : "fill-[#E5E9F0]"
      }`}
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM7 12C7 10.34 8.34 9 10 9C11.66 9 13 10.34 13 12C13 13.66 11.66 15 10 15C8.34 15 7 13.66 7 12ZM14 9C15.66 9 17 10.34 17 12C17 13.66 15.66 15 14 15C12.34 15 11 13.66 11 12C11 10.34 12.34 9 14 9Z"
    />
  </svg> */}
</button>
       
                   {/* Sticker Picker Popup */}
                   {showStickerPicker && (
                     <div
                       className="absolute bottom-full right-0 mb-6 z-50 w-[400px] h-[500px] bg-[#2E3440] rounded-[10px] border border-[#3B4252] shadow-[7px_8px_0px_rgba(0,0,0,0.25)] p-4 overflow-hidden flex flex-col"
                       ref={stickerPickerRef}
                     >
                       <h2 className="text-xl text-[#E5E9F0] font-semibold mb-4">Stickers</h2>
                       
                       {stickerError ? (
                         <div className="text-red-400 flex-1 flex items-center justify-center">Error: {stickerError}</div>
                       ) : (
                         <>
                           {/* Sticker pack tabs */}
                           <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                             {stickerPacks.map((pack, index) => (
                               <button
                                 key={pack.id}
                                 onClick={() => selectStickerPack(pack, index)}
                                 className={`px-3 py-1 font-semibold cursor-pointer rounded-md text-sm whitespace-nowrap ${
                                   index === activeTabIndex
                                     ? 'bg-main text-white'
                                     : 'bg-[#3B4252] text-[#E5E9F0] hover:bg-[#434C5E]'
                                 }`}
                               >
                                 {pack.name} 
                                 {/* ({pack.stickerCount}) */}
                               </button>
                             ))}
                           </div>
       
                           {/* Stickers grid */}
                           <div className="grid grid-cols-4 gap-2 flex-1 overflow-y-auto pr-2 customScrollbar relative">
                             {isLoadingStickers ? (
                         <div className="text-[#D8DEE9] font-semibold text-xl flex-1 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">Loading stickers...</div>
                       ) :  currentPack?.stickers ? (
                               currentPack.stickers.map((sticker) => (
                                 <button
                                   key={sticker.uid}
                                   onClick={() => sendSticker(sticker.uid, sticker.imageUrl, sticker.displayName)}
                                   className="p-1 hover:bg-[#3B4252] cursor-pointer rounded transition-colors flex items-center justify-center"
                                   title={sticker.displayName}
                                 >
                                   <StickerDisplay sticker={sticker} />
                                 </button>
                               ))
                             ) : (
                               <div className="col-span-4 flex items-center justify-center text-[#D8DEE9]">
                                 No stickers loaded
                               </div>
                             )}
                           </div>
                         </>
                       )}
                     </div>
                   )}
                 </div>
    )
}


export default StickerPopUp;