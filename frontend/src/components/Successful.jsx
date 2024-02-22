import { useEffect} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RoundedUser } from "./RoundedUser"
import { Spinner } from './Spinner';
import tick from "../assets/green-tick.svg"
import fail from "../assets/error-failure.svg"


export const Successful = ({ isSuccess }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const amt = searchParams.get('amt');
    const name = searchParams.get('name');
    const check = searchParams.get('check');

    useEffect(() => {
        if(!check){
            navigate("/dashboard");
        }
    }, [])

    return <div class="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg flex flex-col justify-center items-center"
            >
                <h2 class="text-2xl font-bold text-center">Transaction {isSuccess?"Successfull":"Failed"}!</h2>
                <img src={isSuccess?tick:fail} alt="" width={100} />
                {isSuccess?<><div className="flex flex-col items-center">
                    <div className="flex items-baseline">
                        <div className="text-lg font-bold mr-2">Rs {amt?amt:<Spinner></Spinner>}</div>
                        <div className="text-lg font-semibold">sent Successfully to</div>
                    </div>
                    <div className="flex items-center my-1">
                        <RoundedUser label={name?name[0]:<Spinner></Spinner>}></RoundedUser>
                        <div className="text-lg font-bold ml-2">{name}</div>
                    </div>
                </div></>:<></>}
                <div>
                <button onClick={() => {
                    navigate("/dashboard");
                }} type="button" className={`flex justify-between items-center rounded-md text-md font-bold ring-offset-background transition-all h-12 px-5 w-36 py-2 text-white ${isSuccess?"bg-green-600 hover:bg-green-700":"bg-red-600 hover:bg-red-700"} hover:w-40 transform duration-300`}>
                    <span>{isSuccess?"Continue":"Dashboard"}</span>
                    <span>
                        <svg data-inspector="3:15" class="flex-0 h-4 w-4 transition-all group-hover:ml-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path data-inspector="4:5" stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </span>
                </button>
                </div>
            </div>
        </div>
    </div>
}