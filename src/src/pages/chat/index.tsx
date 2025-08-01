import AdvertTab from "./advertTabs";
import Chatbox from "./chatBox";




const Chat = () => {

  return (
    <div className="w-full max-w-[1896px] h-full max-h-[876px] flex items-center justify-center gap-8">
      {/* Sidebar Left - Users list */}
      <AdvertTab side='left'/>

        <Chatbox />
      
       <AdvertTab side='right'/>
    </div>
  );
};

export default Chat;