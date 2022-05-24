import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { navigateToHome } from "../routes/coordinator"

function AdminPage () {
    const token= localStorage.getItem("token")

    const navigate= useNavigate()

    useEffect(()=>{
        if(!token){
            navigateToHome(navigate)
        }
    },[])

    const logout = () => {
        if(confirm("Tem certeza que quer sair?")){
            localStorage.removeItem("token")
        }
    }
    return(
        <div>
            <Header currentPage = {"adminPage"} />
            <hr />
            <h2>Crie uma nova viagem</h2>
        </div>
    )

}
export default AdminPage