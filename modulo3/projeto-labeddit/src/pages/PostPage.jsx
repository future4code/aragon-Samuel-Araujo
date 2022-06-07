import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { goToLogin } from "../routes/coordinator";

export default function PostPage() {

    const token = window.localStorage.getItem("token-labEddit")

    const email = window.localStorage.getItem("email-labEddit")
    const navigate = useNavigate()
    const logout = () => {
        window.localStorage.removeItem("token-labEddit")
        window.localStorage.removeItem("email-labEddit")
        goToLogin(navigate)
    }

    useEffect(()=>{
        if(!token){
            goToLogin(navigate)
        }
    })

    return(
        <>
        <Header />
        <h3>Bem-vindo, {email}</h3>
        <button onClick={()=>{logout()}}>Logout</button>
        <hr />
        <h3>Crie um novo Post</h3>
        <hr />
        <h3>Lista de Posts</h3>
        </>
    )
}