import { Outlet } from "react-router-dom";


const Layout = () => {

    return(

<div className="h-[100%] flex justify-center items-center bg-[#1F232B] p-[42px]">
        <Outlet/>
</div>

    )

}

export default Layout;