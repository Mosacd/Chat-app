import { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import * as signalR from '@microsoft/signalr';
import StickerDisplay from './stickerdisplay';
import type { Message, Sticker, StickerPack } from '@/src/utils/types';
import MessageItem from '@/src/components/messages';
import AdvertTab from './advertTabs';



const Chat = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  // const [users, setUsers] = useState<User[]>([]);
  // const [userId, setUserId] = useState<string>('');
  const [chatStatus, setChatStatus] = useState<string>('Connecting...');
  
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const stickerPickerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const connectionRef = useRef<signalR.HubConnection | null>(null);

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
      setCurrentPack(pack);
      
      // Only fetch stickers if we don't have them already
      if (!pack.stickers) {
        const response = await fetch(
          `https://chat.kiuvinme.ge/sticker/GetStickersFromPack?packId=${pack.uid}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const stickers: Sticker[] = await response.json();
        
        // Update the pack with the loaded stickers
        setStickerPacks(prevPacks =>
          prevPacks.map(p => 
            p.uid === pack.uid ? { ...p, stickers } : p
          )
        );
      }
    } catch (err) {
      console.error("Failed to load stickers:", err);
      setStickerError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoadingStickers(false);
    }
  };

  // Initialize SignalR connection
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://chat.kiuvinme.ge/chatHub")
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

      
    console.log(connectionRef.current)
    connectionRef.current = connection;

    // Setup message handlers
    connection.on("ReceiveMessage", (messageData: any) => {
      console.log(messageData.type);
      if(messageData.type !== "sticker"){
         setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: messageData.content,
        sender: messageData.senderId || 'Stranger',
        timestamp: new Date(messageData.timestamp),
        isOwn: false,
      }]);
      } else{
         setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: messageData.displayName,
        sender: messageData.senderId || 'Stranger',
        timestamp: new Date(messageData.timestamp),
        isOwn: false,
        isSticker: true,
        stickerUrl: messageData.stickerUrl
      }]);
      }

     
    });

    // connection.on("ReceiveSticker", (stickerData: any) => {
    //   setMessages(prev => [...prev, {
    //     id: Date.now().toString(),
    //     text: stickerData.displayName,
    //     sender: stickerData.senderId || 'Stranger',
    //     timestamp: new Date(stickerData.timestamp),
    //     isOwn: false,
    //     isSticker: true,
    //     stickerUrl: stickerData.stickerUrl
    //   }]);
    // });

    connection.on("WaitingForMatch", (message: string) => {
      setChatStatus(message);
      setMessages([]);
    });

    connection.on("Matched", (message: string) => {
      setChatStatus(message);
      setMessages([]);
    });

    connection.on("ChatEnded", (reason: string) => {
      setChatStatus(reason);
      setMessages([]);
    });

    const startConnection = async () => {
      try {
        await connection.start();
        setIsConnected(true);
        setChatStatus('Looking for someone to chat with...');
      } catch (err) {
        console.error("Connection failed:", err);
        setTimeout(startConnection, 5000);
      }
    };

    startConnection();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
      }
    };
  }, []);

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
      if (stickerPickerRef.current && !stickerPickerRef.current.contains(event.target as Node)) {
        setShowStickerPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    setInputText(prev => prev + emojiData.emoji);
    inputRef.current?.focus();
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '' || !connectionRef.current) return;

    try {
      // Optimistic update
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: "You",
        timestamp: new Date(),
        isOwn: true
      };
      setMessages(prev => [...prev, newMessage]);
      setInputText('');

      await connectionRef.current.invoke("SendMessage", inputText);
    } catch (err) {
      console.error("Error sending message:", err);
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

  const requestNextChat = async () => {
    if (!connectionRef.current) return;
    try {
      await connectionRef.current.invoke("NextChat");
    } catch (err) {
      console.error("Error requesting next chat:", err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  

  return (
    <div className="w-full max-w-[1896px] h-full max-h-[876px] flex items-center justify-center gap-8">
      {/* Sidebar Left - Users list */}
      <AdvertTab side='left'/>

      {/* Chat Main */}
      <div className="w-full max-w-[1232px] h-full flex flex-col justify-between rounded-[10px] 2xl:rounded-[15px] bg-[#2E3440] shadow-[7px_8px_0px_rgba(0,0,0,0.25)]">
        {/* Header */}
        <div className="flex items-center justify-between px-3 h-[75px] 2xl:h-[88px] bg-[#3B4252] rounded-t-[15px] gap-1 shadow-[0px_4px_0px_rgba(0,0,0,0.25)]">
           <button 
          onClick={requestNextChat}
          className="mt-4  w-full max-w-26 2xl:max-w-34 font-semibold bg-main text-md 2xl:text-xl text-white px-2 py-2 rounded-lg hover:bg-opacity-80 transition"
        >
         {'<'} Menu
        </button>
          <div className='flex flex-col items-center gap-1'>
          <h1 className="text-3xl 2xl:text-4xl text-white interSemibold border-b-2 border-[#D8DEE9]">
            <span className="text-main">KIU</span>Vinme
          </h1>
          <span className="text-lg 2xl:text-xl text-[#E5E9F0] leading-none">
            {isConnected ? 'Connected' : 'Connecting...'}
          </span>
          </div>
          <button 
          onClick={requestNextChat}
          className="mt-4 w-full max-w-26 2xl:max-w-34 font-semibold bg-main text-md 2xl:text-xl text-white px-2 py-2 rounded-lg hover:bg-opacity-80 transition"
        >
          Next Chat {'>'}
        </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 px-4 my-2 overflow-y-auto customScrollbar">
          {messages.length === 0 ? (
            <div className="flex items-center text-xl 2xl:text-2xl justify-center h-full text-[#D8DEE9]">
              {chatStatus}
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <MessageItem key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Bar */}
        <div className="max-h-[77px] py-3 2xl:max-h-[88px] w-full flex items-center gap-5 px-3 bg-[#3B4252] rounded-b-[15px] relative">
        <textarea
  ref={inputRef}
  className=" min-h-[35px] h-[35px] 2xl:min-h-[45px] 2xl:h-[45px] 2xl:max-h-[70px] w-full text-xl 2xl:text-2xl interRegular rounded-[10px] px-4 2xl:px-6 bg-[#E5E9F0] shadow-[inset_0_0_1px_2px_rgba(0,0,0,0.25)] leading-[35px] 2xl:leading-[45px]"
  type="text"
  value={inputText}
  onChange={(e) => setInputText(e.target.value)}
  onKeyPress={handleKeyPress}
  placeholder={isConnected ? "Type a message..." : "Connecting..."}
  disabled={!isConnected}
/>

          {/* Sticker Picker Button */}
          <div className="relative">
            <svg
              onClick={() => isConnected && setShowStickerPicker((prev) => !prev)}
              className={`w-[38px] 2xl:w-[48px] h-[38px] 2xl:h-[48px] cursor-pointer group ${
                !isConnected ? 'opacity-50' : ''
              }`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={`group-hover:fill-main duration-200 ${showStickerPicker ? "fill-main" : ""}`}
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM7 12C7 10.34 8.34 9 10 9C11.66 9 13 10.34 13 12C13 13.66 11.66 15 10 15C8.34 15 7 13.66 7 12ZM14 9C15.66 9 17 10.34 17 12C17 13.66 15.66 15 14 15C12.34 15 11 13.66 11 12C11 10.34 12.34 9 14 9Z"
                fill={showStickerPicker ? "#D08770" : "#E5E9F0"}
              />
            </svg>

            {/* Sticker Picker Popup */}
            {showStickerPicker && (
              <div
                className="absolute bottom-full right-0 mb-6 z-50 w-[400px] h-[500px] bg-[#2E3440] rounded-[10px] border border-[#3B4252] shadow-[7px_8px_0px_rgba(0,0,0,0.25)] p-4 overflow-hidden flex flex-col"
                ref={stickerPickerRef}
              >
                <h2 className="text-xl text-[#E5E9F0] mb-4">Stickers</h2>
                
                {isLoadingStickers ? (
                  <div className="text-[#D8DEE9] flex-1 flex items-center justify-center">Loading stickers...</div>
                ) : stickerError ? (
                  <div className="text-red-400 flex-1 flex items-center justify-center">Error: {stickerError}</div>
                ) : (
                  <>
                    {/* Sticker pack tabs */}
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                      {stickerPacks.map((pack, index) => (
                        <button
                          key={pack.id}
                          onClick={() => selectStickerPack(pack, index)}
                          className={`px-3 py-1 rounded-md text-sm whitespace-nowrap ${
                            index === activeTabIndex
                              ? 'bg-main text-white'
                              : 'bg-[#3B4252] text-[#E5E9F0] hover:bg-[#434C5E]'
                          }`}
                        >
                          {pack.name} ({pack.stickerCount})
                        </button>
                      ))}
                    </div>

                    {/* Stickers grid */}
                    <div className="grid grid-cols-4 gap-2 flex-1 overflow-y-auto pr-2 customScrollbar">
                      {currentPack?.stickers ? (
                        currentPack.stickers.map((sticker) => (
                          <button
                            key={sticker.uid}
                            onClick={() => sendSticker(sticker.uid, sticker.imageUrl, sticker.displayName)}
                            className="p-1 hover:bg-[#3B4252] rounded transition-colors flex items-center justify-center"
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

          {/* Emoji Picker */}
          <div className="relative">
            <svg
              onClick={() => isConnected && setShowEmojiPicker((prev) => !prev)}
              className={`w-[38px] 2xl:w-[48px]  h-[38px] 2xl:h-[48px] cursor-pointer group ${
                !isConnected ? 'opacity-50' : ''
              }`}
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

            {showEmojiPicker && (
              <div
                className="absolute bottom-full right-0 mb-6 z-50"
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
          <button 
            onClick={handleSendMessage}
            disabled={!inputText.trim() || !isConnected} 
            className={`w-[44px] 2xl:w-[50px] h-[40px] 2xl:h-[48px] p-1 bg-black group transition-colors rounded-[5px] hover:cursor-pointer ${
              !inputText.trim() || !isConnected ? 'opacity-50' : ''
            }`}
          >
           <svg className={"group-hover:fill-main fill-[#E5E9F0]"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="send"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21.66,12a2,2,0,0,1-1.14,1.81L5.87,20.75A2.08,2.08,0,0,1,5,21a2,2,0,0,1-1.82-2.82L5.46,13H11a1,1,0,0,0,0-2H5.46L3.18,5.87A2,2,0,0,1,5.86,3.25h0l14.65,6.94A2,2,0,0,1,21.66,12Z"></path></g></svg>
          </button>
        </div>
      </div>
       <AdvertTab side='right'/>
    </div>
  );
};

export default Chat;