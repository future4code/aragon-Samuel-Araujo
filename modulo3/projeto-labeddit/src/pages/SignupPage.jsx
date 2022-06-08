import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { BASE_URL } from "../constants/BASE_URL";
import { GlobalContext } from "../global/GlobalState";
import { goToBack, goToPostPage } from "../routes/coordinator";

export default function() {
    const context = useContext(GlobalContext)
    const {signup} = context.states
    const {setSignup} = context.setters

    const onChangeSignup = (event) => {
        setSignup({...signup, [event.target.name]: event.target.value})
    }

    const token = window.localStorage.getItem("token-labEddit")
    
    const newUser = (event) => {
        event.preventDefault()
        axios.post(`${BASE_URL}/users/signup`, signup)
        .then((res)=>{
            window.localStorage.setItem("token-labEddit", res.data.token)
            window.localStorage.setItem("email-labEddit", signup.email)
            setSignup(
                {
                    username: "",
                    email: "",
                    password:"" 
                }
            )

            goToPostPage(navigate)
        })
        .catch((err)=>{alert("Eita, houve algum erro...Verifique seus dados e tente novamente!")})
    }

    useEffect(()=>{
        if(token) {
            goToPostPage(navigate)
        }
    },[])

    const navigate = useNavigate()

    return(
        <>
            <Header />
            <hr />
            <h2>Cadastro de Novo Usuário</h2>
            <form onSubmit={newUser}>
                <label htmlFor="nome">Nome:</label>
                <input
                    id="nome"
                    placeholder="Digite aqui seu nome completo"
                    name="username"
                    value={signup.username}
                    onChange={onChangeSignup}
                />
                
                <label htmlFor="email">E-mail:</label>
                <input
                    id="email"
                    placeholder="exemplo@exemplo.com"
                    type="email"
                    name="email"
                    value={signup.email}
                    onChange={onChangeSignup}
                />

                <label htmlFor="senha">Senha</label>
                <input
                    id="senha"
                    placeholder="Insira uma senha de no mínimo 8 caracteres"
                    type="password"
                    name="password"
                    value={signup.password}
                    onChange={onChangeSignup}
                />

                <button>Cadastrar</button>
            </form>
            <button onClick={()=> goToBack(navigate)}>Voltar</button>
        </>
    )
}