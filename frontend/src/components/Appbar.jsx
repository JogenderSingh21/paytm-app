import { RoundedUser } from "./RoundedUser"
import axios from "axios";
import { Spinner } from "./Spinner";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const Appbar = ({ label }) => {
    const navigate = useNavigate();

    return <div className="px-5 py-3 flex justify-between items-center bg-white shadow-md">
        <h1 className="text-2xl font-bold">Payments App</h1>
        
        <div className="flex items-center">
            <div className="min-w-32 mx-4"><Button label={"Logout"} onClick={() => {
                localStorage.removeItem("token");
                navigate("/signup");
            }} secondLabel="Logging out..." /></div>
            <div className="mx-3  taxt-lg font-semibold">Hello, {label?label:<Spinner></Spinner>}</div>
            <RoundedUser label={label[0]}></RoundedUser>
        </div>
    </div>
}