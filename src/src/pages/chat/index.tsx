const Chat = () => {
  return (
    <div className="w-full max-w-[1896px] h-full max-h-[876px] flex items-center justify-center gap-[32px]">
      <div className="max-w-[300px] w-full h-full bg-[#2E3440] rounded-[15px] border-1 border-[#3B4252] shadow-[7px_8px_0px_rgba(0,0,0,0.25)]"></div>
      <div className="max-w-[1232px] flex flex-col justify-between w-full h-full rounded-[15px] bg-[#2E3440] shadow-[7px_8px_0px_rgba(0,0,0,0.25)]">
        <div className="w-full flex flex-col bg-[#3B4252] rounded-t-[15px] gap-[4px] items-center justify-center h-[88px] shadow-[0px_4px_0px_rgba(0,0,0,0.25)]">
          <h1 className="border-b-2  border-[#D8DEE9] interSemibold text-[36px] text-white">
            <span className="text-main">KIU</span>Vinme
          </h1>
          <span className="text-[20px] leading-none text-[#E5E9F0]">
            X people online
          </span>
        </div>
        <div className="h-[82px] w-full flex gap-[20px] items-center px-[12px] bg-[#3B4252] rounded-b-[15px]">
          <input
            className="h-[45px] text-[24px] interRegular w-full rounded-[15px] px-[24px] bg-[#E5E9F0] shadow-[inset_0_0_1px_2px_rgba(0,0,0,0.25)]"
            type="text"
          />
          <svg
          className="hover:cursor-pointer"
            width="37"
            height="37"
            viewBox="0 0 37 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9437 21.6666C11.9437 21.6666 14.3193 24.8333 18.2786 24.8333C22.238 24.8333 24.6136 21.6666 24.6136 21.6666M13.5274 13.75H13.5433M23.0298 13.75H23.0457M34.116 18.5C34.116 27.2445 27.0254 34.3333 18.2786 34.3333C9.53191 34.3333 2.44128 27.2445 2.44128 18.5C2.44128 9.75545 9.53191 2.66663 18.2786 2.66663C27.0254 2.66663 34.116 9.75545 34.116 18.5Z"
              stroke="#E5E9F0"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
<button className="w-[50px] h-[48px] bg-main duration-200 hover:bg-[#bf600d] rounded-[5px] shadow-[inset_0_0_1px_2px_rgba(0,0,0,0.25)] hover:cursor-pointer">
          <svg width="50" height="45" viewBox="0 0 50 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_107)">
<path d="M24.5635 41.153L7.27856 19.9753L41.0759 10.0436L24.5635 41.153ZM23.9704 35.0222L34.2576 15.6057L13.1674 21.7861L16.9484 26.4187L26.5126 21.9239L20.1894 30.3895L23.9704 35.0222ZM23.9704 35.0222L18.5689 28.4041L13.1674 21.7861L16.9484 26.4187L20.1894 30.3895L23.9704 35.0222Z" fill="#E5E9F0"/>
</g>
<defs>
<clipPath id="clip0_3_107">
<rect width="41.0063" height="41.0042" fill="white" transform="matrix(0.774872 -0.632118 0.63231 0.774715 -1.01453 17.9209)"/>
</clipPath>
</defs>
</svg>
</button>

        </div>
      </div>
      <div className="max-w-[300px] w-full h-full bg-[#2E3440] rounded-[15px] border-1 border-[#3B4252] shadow-[7px_8px_0px_rgba(0,0,0,0.25)]"></div>
    </div>
  );
};

export default Chat;
