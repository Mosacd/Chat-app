const Home = () => {

        return(
            <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col items-center max-w-lg text-center">
                  <h1 className="text-text text-5xl 2xl:text-6xl interSemibold mb-[40px] 2xl:mb-[48px]"><span className="text-main">KIU</span>Vinme</h1>
                  <p className="text-text text-xl 2xl:text-2xl interRegular mb-[32px] 2xl:mb-[40px]">Enter a nickname to start your anonymous conversation</p>
                  <input placeholder="Choose your nickname..." className="h-[48px] 2xl:h-[56px] text-xl 2xl:text-2xl text-center mb-[32px] 2xl:mb-[40px] text-text interRegular px-[24px] w-sm 2xl:w-md bg-[#3B4252] rounded-[8px]" type="text" />
                  <button className="bg-main transition-colors duration-200 hover:bg-main-hover h-[48px] 2xl:h-[56px] w-full max-w-sm 2xl:max-w-md px-[24px]  rounded-[8px] interRegular text-text text-xl 2xl:text-2xl  cursor-pointer">Start Talking</button>
                </div>
            </div>
        )

}


export default Home;