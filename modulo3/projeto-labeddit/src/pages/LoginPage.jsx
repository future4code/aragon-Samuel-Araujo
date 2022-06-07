import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { BASE_URL } from "../constants/BASE_URL";
import { GlobalContext } from "../global/GlobalState";
import { goToPostPage, goToSignup } from "../routes/coordinator";

export default function LoginPage() {
    const context = useContext(GlobalContext)
    const {setForm} = context.setters
    const {form} = context.states

    const token = window.localStorage.getItem("token-labEddit")

    const navigate = useNavigate()

    const onChangeForm = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const login = (event) => {
        event.preventDefault()
        console.log(form)
        axios.post(`${BASE_URL}/users/login`, form)
        .then((res)=>{
            // console.log(res.data.token)
            window.localStorage.setItem("token-labEddit", res.data.token)
            window.localStorage.setItem("email-labEddit", form.email)
            goToPostPage(navigate)
        })
        .catch((err)=> {alert("Ops, parece que algo deu errado no seu login. deixa eu te fazer uma perguntinha, você já é cadastrado no LabEddit?")})
    }

    useEffect(()=>{
        if(token) {
            goToPostPage(navigate)
        }
    },[])
    return(
        <>
            <Header />
            <form onSubmit={login}>
                <label htmlFor="email">E-mail:</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChangeForm}
                />

                <label htmlFor="senha">Senha:</label>
                <input
                    id="senha"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={onChangeForm}
                />
                <button>Entrar</button>
            </form>
            <hr />
            <h3>
                Não tem cadastro?
                Clique no botão a seguir para se cadastrar:
            </h3>
            <button onClick={() => {goToSignup(navigate)}}>Ir para cadastro</button>

        </>
    )
}