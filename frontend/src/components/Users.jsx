import { useEffect, useState } from "react";
import { RoundedUser } from "./RoundedUser"
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = ({ username }) => {

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.users);
            })
    }, [filter]);

    return <div>
        <div className="text-xl font-bold mt-5">
            Users
        </div>
        <input onChange={(e) => {
            setFilter(e.target.value);
        }} className="border border-slate-200 p-2 rounded-md w-full text-sm mt-3 mb-1" type="text" placeholder="Search users..." />
        <div>
            {
                users.map((user) => {
                    if(user.username == username){
                        return 
                    }
                    return <SearchUser user={user} />
                })
            }
        </div>
    </div>
}

function SearchUser({user}){
    const navigate = useNavigate();
    return <div className="flex justify-between my-3 ">
        <div className="flex items-center">
            <RoundedUser label={`${user.firstName[0]}${user.lastName[0]}`} />
            <div className="font-semibold mx-3 text-lg">
                {user.firstName} {user.lastName}
            </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
            <Button onClick={() => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName + " " + user.lastName);
            }} label={"Send Money"} />
        </div>
    </div>
}