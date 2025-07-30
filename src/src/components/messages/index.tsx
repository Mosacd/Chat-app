import type { Message } from "../../utils/types";


const MessageItem = ({ message }: { message: Message }) => {
    return (
      <div className={`mb-4 flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-[70%] rounded-lg px-4 py-2 min-w-24 ${
            message.isOwn
              ? 'bg-main text-white'
              : 'bg-[#3B4252] text-[#E5E9F0]'
          }`}
        >
          {/* {!message.isOwn && ( */}
            <div className="text-xs 2xl:text-sm text-white font-bold">
              {message.sender}
            </div>
          {/* )} */}

          {message.isSticker ? (
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mt-1">
                <img 
                  src={`https://chat.kiuvinme.ge/${message.stickerUrl}`}
                  alt={message.text}
                  className="w-full h-full object-contain rounded-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/100';
                    target.className = 'w-full h-full object-contain opacity-50';
                    target.onerror = null;
                  }}
                />
              </div>
              {/* <div className="text-xs opacity-70 mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div> */}
            </div>
          ) : (
            <>
              <div className="text-md 2xl:text-xl font-semibold">{message.text}</div>
              {/* <div className="text-xs opacity-70 text-right mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div> */}
            </>
          )}
        </div>
      </div>
    );
  };


  export default MessageItem;