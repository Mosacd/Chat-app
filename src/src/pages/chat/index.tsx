import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';

const Chat = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputText, setInputText] = useState('');
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Handle outside click to close emoji picker
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target as Node)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    setInputText((prev) => prev + emojiData.emoji);
    inputRef.current?.focus()
  };

  return (
    <div className="w-full max-w-[1896px] h-full max-h-[876px] flex items-center justify-center gap-8">
      {/* Sidebar Left */}
      <div className="w-full max-w-[300px] h-full bg-[#2E3440] rounded-[15px] border border-[#3B4252] shadow-[7px_8px_0px_rgba(0,0,0,0.25)]" />

      {/* Chat Main */}
      <div className="w-full max-w-[1232px] h-full flex flex-col justify-between rounded-[15px] bg-[#2E3440] shadow-[7px_8px_0px_rgba(0,0,0,0.25)]">
        {/* Header */}
        <div className="flex flex-col items-center justify-center h-[88px] bg-[#3B4252] rounded-t-[15px] gap-1 shadow-[0px_4px_0px_rgba(0,0,0,0.25)]">
          <h1 className="text-[36px] text-white interSemibold border-b-2 border-[#D8DEE9]">
            <span className="text-main">KIU</span>Vinme
          </h1>
          <span className="text-[20px] text-[#E5E9F0] leading-none">X people online</span>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Chat messages would go here */}
        </div>

        {/* Input Bar */}
        <div className="h-[82px] w-full flex items-center gap-5 px-3 bg-[#3B4252] rounded-b-[15px] relative">
          <input
            ref={inputRef}
            className="h-[45px] w-full text-[24px] interRegular rounded-[15px] px-6 bg-[#E5E9F0] shadow-[inset_0_0_1px_2px_rgba(0,0,0,0.25)]"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
          />

          {/* Emoji Picker Trigger and Popup */}
          <div className="relative">
            
           <svg
  onClick={() => setShowEmojiPicker((prev) => !prev)}
  className="w-[48px] h-[48px] cursor-pointer group"
  viewBox="0 0 48 48"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
  className={`group-hover:fill-main duration-200 ${showEmojiPicker ? "fill-main" : ""}`}
    d="M24 4C35.046 4 44 12.954 44 24C44 35.046 35.046 44 24 44C12.954 44 4 35.046 4 24C4 12.954 12.954 4 24 4ZM24 8C19.7565 8 15.6869 9.68571 12.6863 12.6863C9.68571 15.6869 8 19.7565 8 24C8 28.2435 9.68571 32.3131 12.6863 35.3137C15.6869 38.3143 19.7565 40 24 40C28.2435 40 32.3131 38.3143 35.3137 35.3137C38.3143 32.3131 40 28.2435 40 24C40 19.7565 38.3143 15.6869 35.3137 12.6863C32.3131 9.68571 28.2435 8 24 8ZM29.6 27.714C29.7866 27.5258 30.0087 27.3765 30.2535 27.2749C30.4983 27.1732 30.7609 27.1213 31.0259 27.122C31.291 27.1227 31.5532 27.1761 31.7974 27.2791C32.0417 27.3821 32.263 27.5326 32.4485 27.7219C32.6341 27.9111 32.7802 28.1354 32.8783 28.3816C32.9764 28.6278 33.0246 28.8911 33.0201 29.1561C33.0156 29.4211 32.9584 29.6826 32.852 29.9253C32.7455 30.168 32.5919 30.3872 32.4 30.57C30.1592 32.7723 27.1418 34.0044 24 34C20.8582 34.0044 17.8408 32.7723 15.6 30.57C15.2301 30.1968 15.0219 29.693 15.0204 29.1675C15.019 28.642 15.2244 28.1371 15.5923 27.7619C15.9601 27.3866 16.4609 27.1712 16.9863 27.1623C17.5117 27.1533 18.0195 27.3515 18.4 27.714C19.8932 29.1832 21.9053 30.0045 24 30C26.18 30 28.154 29.13 29.6 27.714ZM17 16C17.7956 16 18.5587 16.3161 19.1213 16.8787C19.6839 17.4413 20 18.2044 20 19C20 19.7956 19.6839 20.5587 19.1213 21.1213C18.5587 21.6839 17.7956 22 17 22C16.2044 22 15.4413 21.6839 14.8787 21.1213C14.3161 20.5587 14 19.7956 14 19C14 18.2044 14.3161 17.4413 14.8787 16.8787C15.4413 16.3161 16.2044 16 17 16ZM31 16C31.7956 16 32.5587 16.3161 33.1213 16.8787C33.6839 17.4413 34 18.2044 34 19C34 19.7956 33.6839 20.5587 33.1213 21.1213C32.5587 21.6839 31.7956 22 31 22C30.2044 22 29.4413 21.6839 28.8787 21.1213C28.3161 20.5587 28 19.7956 28 19C28 18.2044 28.3161 17.4413 28.8787 16.8787C29.4413 16.3161 30.2044 16 31 16Z"
    fill={showEmojiPicker ? "#D08770" : "#E5E9F0"}
  />
</svg>


           {true && (
  <div
    className={`absolute bottom-full right-0 mb-6 ${
      showEmojiPicker ? 'opacity-100 visible' : 'opacity-0 invisible'
    } transition-all duration-200 animate-slideIn custom-emoji-picker z-50`}
    ref={emojiPickerRef}
  >
    <EmojiPicker
      onEmojiClick={handleEmojiClick}
      width={350}
      height={400}
      theme="dark"
      searchDisabled={false}
      skinTonesDisabled={true}
      previewConfig={{ showPreview: false }}
    />
  </div>
)}
          </div>

          {/* Send Button */}
          <button className="w-[50px] h-[48px] group transition-colors rounded-[5px] hover:cursor-pointer">
        <svg width="48" height="48" viewBox="0 0 35 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path className='group-hover:fill-main duration-200' d="M17.5635 31.153L0.278564 9.97534L34.0759 0.0435747L17.5635 31.153ZM16.9704 25.0222L27.2576 5.60574L6.16737 11.7861L9.94844 16.4187L19.5126 11.9239L13.1894 20.3895L16.9704 25.0222ZM16.9704 25.0222L11.5689 18.4041L6.16737 11.7861L9.94844 16.4187L13.1894 20.3895L16.9704 25.0222Z" fill="#E5E9F0"/>
</svg>


          </button>
        </div>
      </div>

      {/* Sidebar Right */}
      <div className="w-full max-w-[300px] h-full bg-[#2E3440] rounded-[15px] border border-[#3B4252] shadow-[7px_8px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
};

export default Chat;
