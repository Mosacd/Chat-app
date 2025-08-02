import { useState, useRef, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import type { Message } from "@/src/utils/types";
import MessageItem from "@/src/components/messages";
import StickerPopUp from "../stickerPopUp";
import EmojiPopUp from "../emojiPopUp";
import { Textarea } from "@/src/components/ui/textarea";
import { Link } from "react-router-dom";

const Chatbox = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [chatStatus, setChatStatus] = useState<string>("Connecting...");

  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const stickerPickerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [showStickerPicker, setShowStickerPicker] = useState(false);

  // Initialize SignalR connection
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://chat.kiuvinme.ge/chatHub")
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    console.log(connectionRef.current);
    connectionRef.current = connection;

    // Setup message handlers
    connection.on("ReceiveMessage", (messageData: any) => {
      console.log(messageData.type);
      if (messageData.type !== "sticker") {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: messageData.content,
            sender: messageData.senderId || "Stranger",
            timestamp: new Date(messageData.timestamp),
            isOwn: false,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: messageData.displayName,
            sender: messageData.senderId || "Stranger",
            timestamp: new Date(messageData.timestamp),
            isOwn: false,
            isSticker: true,
            stickerUrl: messageData.stickerUrl,
          },
        ]);
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
        setChatStatus("Looking for someone to chat with...");
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
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
      if (
        stickerPickerRef.current &&
        !stickerPickerRef.current.contains(event.target as Node)
      ) {
        setShowStickerPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    setInputText((prev) => prev + emojiData.emoji);
    inputRef.current?.focus();
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === "" || !connectionRef.current) return;

    try {
      // Optimistic update
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: "You",
        timestamp: new Date(),
        isOwn: true,
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputText("");

      await connectionRef.current.invoke("SendMessage", inputText);
    } catch (err) {
      console.error("Error sending message:", err);
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  

  return (
    <div className="w-full max-w-[1232px] h-full flex flex-col justify-between rounded-[10px] 2xl:rounded-[15px] bg-[#2E3440] shadow-[7px_8px_0px_rgba(0,0,0,0.25)]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 h-[75px] 2xl:h-[88px] bg-[#3B4252] rounded-t-[15px] gap-1 shadow-[0px_4px_0px_rgba(0,0,0,0.25)]">
        <Link to={"/"}
          onClick={requestNextChat}
          className="cursor-pointer text-center w-full max-w-26 2xl:max-w-34 font-semibold bg-main hover:bg-main-hover text-md 2xl:text-xl text-white px-2 py-2 rounded-lg transition"
        >
          Menu
        </Link>
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-3xl 2xl:text-4xl text-white interSemibold border-b-2 border-[#D8DEE9]">
            <span className="text-main">KIU</span>Vinme
          </h1>
          <span className="text-lg 2xl:text-xl text-[#E5E9F0] leading-none">
            {isConnected ? "Connected" : "Connecting..."}
          </span>
        </div>
        <button
          onClick={requestNextChat}
          className="cursor-pointer w-full max-w-26 2xl:max-w-34 font-semibold bg-main hover:bg-main-hover text-md 2xl:text-xl text-white px-2 py-2 rounded-lg hover:bg-opacity-80 transition"
        >
          Next Chat
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 px-4 my-2 overflow-y-auto customScrollbar">
         
          <>
            <div className="flex items-center text-xl 2xl:text-2xl justify-center h-20 text-[#D8DEE9]">
            {chatStatus}
          </div>
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </>
        
      </div>

      {/* Input Bar */}
      <div className="max-h-[77px] py-3 2xl:max-h-[88px] w-full flex items-center gap-5 px-3 bg-[#3B4252] rounded-b-[15px] relative">
        <Textarea 
        ref={inputRef}      
        className="bg-neutral-950 resize-none text-white min-h-[35px] 2xl:min-h-[45px] 2xl:max-h-[70px] w-full text-lg 2xl:text-xl interRegular rounded-[4px] px-4 2xl:px-6  shadow-[inset_0_0_1px_2px_rgba(0,0,0,0.25)] customScrollbar"    

        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={isConnected ? "Type a message..." : "Connecting..."}
        disabled={!isConnected}
 />
        
        {/* <textarea
          ref={inputRef}
          className=" min-h-[35px] h-[35px] 2xl:min-h-[45px] 2xl:h-[45px] 2xl:max-h-[70px] w-full text-xl 2xl:text-2xl interRegular rounded-[10px] px-4 2xl:px-6 bg-[#E5E9F0] shadow-[inset_0_0_1px_2px_rgba(0,0,0,0.25)] leading-[35px] 2xl:leading-[45px]"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isConnected ? "Type a message..." : "Connecting..."}
          disabled={!isConnected}
        /> */}

        <StickerPopUp
          setMessages={setMessages}
          connectionRef={connectionRef}
          isConnected={isConnected}
          showStickerPicker={showStickerPicker}
          stickerPickerRef={stickerPickerRef}
          setShowStickerPicker={setShowStickerPicker}
        />

        <EmojiPopUp
          showEmojiPicker={showEmojiPicker}
          handleEmojiClick={handleEmojiClick}
          setShowEmojiPicker={setShowEmojiPicker}
          isConnected={isConnected}
          emojiPickerRef={emojiPickerRef}
        />

        {/* Send Button */}
        <button
          onClick={handleSendMessage}
          disabled={!inputText.trim() || !isConnected}
          className={`w-[44px] 2xl:w-[50px] h-[40px] 2xl:h-[48px] p-1 bg-neutral-950 group transition-colors rounded-[5px] hover:cursor-pointer ${
            !inputText.trim() || !isConnected ? "opacity-50" : ""
          }`}
        >
          <svg
            className={"group-hover:fill-main fill-[#E5E9F0]"}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            id="send"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M21.66,12a2,2,0,0,1-1.14,1.81L5.87,20.75A2.08,2.08,0,0,1,5,21a2,2,0,0,1-1.82-2.82L5.46,13H11a1,1,0,0,0,0-2H5.46L3.18,5.87A2,2,0,0,1,5.86,3.25h0l14.65,6.94A2,2,0,0,1,21.66,12Z"></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
