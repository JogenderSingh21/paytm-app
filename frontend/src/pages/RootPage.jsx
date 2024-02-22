import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const RootPage = () => {
  const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/me", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                if(response.data.success){
                    navigate("/dashboard");
                }
            }).catch((error) => {
                navigate("/signup");
            })
    }, [])
    return <></>
}