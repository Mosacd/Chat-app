const Home = () => {

        return(
            <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col items-center max-w-lg text-center">
                  <h1 className="text-white text-[64px] interSemibold mb-[48px]"><span className="text-main">KIU</span>Vinme</h1>
                  <p className="text-white text-[24px] interRegular mb-[40px]">Enter a nickname to start your anonymous conversation</p>
                  <input placeholder="Choose your nickname..." className="h-[56px] text-[24px] text-center mb-[40px] text-white interRegular px-[24px] w-md bg-[#0F1E33] rounded-[8px]" type="text" />
                  <button className="bg-main duration-200 hover:bg-[#bf600d] h-[48px] w-full max-w-[315px] px-[24px]  rounded-[8px] interRegular text-white text-[24px] cursor-pointer">Start Talking</button>
                </div>
            </div>
        )

}


export default Home;