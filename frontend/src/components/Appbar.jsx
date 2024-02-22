import { RoundedUser } from "./RoundedUser"
import axios from "axios";
import { Spinner } from "./Spinner";
import { Sidebar } from "./Sidebar";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const Appbar = ({ user }) => {
    const navigate = useNavigate();

    return <div className="px-5 py-3 flex justify-between items-center bg-white shadow-md">
        <h1 className="text-2xl font-bold">Payments App</h1>
        
        <div className="flex items-center">
            <div className="mx-3  taxt-lg font-semibold">Hello, {user.firstName?user.firstName:<Spinner></Spinner>}</div>
            {/* <RoundedUser label={label[0]}></RoundedUser> */}
            <Sidebar user={user}></Sidebar>
        </div>
    </div>
}