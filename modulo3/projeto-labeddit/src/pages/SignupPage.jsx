import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { goToBack } from "../routes/coordinator";

export default function() {
    const navigate = useNavigate()
    return(
        <>
        <Header />
        <br />
        <h3>Cadastro de Novo Usuário</h3>
        <button onClick={()=> goToBack(navigate)}>Voltar</button>
        </>
    )
}