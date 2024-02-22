import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const [user, setUser] = useState({
        username: "",
        firstName: "",
        lastName: ""
    });
    const [balance, setBalance] = useState(0.0001);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/me", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                if(response.data.success){
                    setUser(response.data);
                }else{
                    navigate("/signup");
                }
            })
            .catch(error => {
                navigate("/signup");
            })
        
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                setBalance(response.data.balance);
            })
            .catch(error => {
                navigate("/signup");
            })
        
    }, [])

    return <div>
        <Appbar user={user}></Appbar>
        <div className="m-8">
            <Balance value={`${balance}`.split(".")[0] + "." + `${balance}`.split(".")[1].substring(0,2)} />
            <Users username={user.username} />
        </div>
    </div>
}