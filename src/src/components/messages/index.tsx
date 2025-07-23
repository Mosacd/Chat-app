import type { Message } from "../../utils/types";


const MessageItem = ({ message }: { message: Message }) => {
    return (
      <div className={`mb-4 flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-[70%] rounded-lg px-4 py-2 ${
            message.isOwn
              ? 'bg-main text-white rounded-br-none'
              : 'bg-[#3B4252] text-[#E5E9F0] rounded-bl-none'
          }`}
        >
          {!message.isOwn && (
            <div className="text-xs font-semibold text-[#81A1C1] mb-1">
              {message.sender}
            </div>
          )}

          {message.isSticker ? (
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24">
                <img 
                  src={`http://192.168.0.111:5001${message.stickerUrl}`}
                  alt={message.text}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/100';
                    target.className = 'w-full h-full object-contain opacity-50';
                    target.onerror = null;
                  }}
                />
              </div>
              <div className="text-xs opacity-70 mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ) : (
            <>
              <div className="text-lg">{message.text}</div>
              <div className="text-xs opacity-70 text-right mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };


  export default MessageItem;