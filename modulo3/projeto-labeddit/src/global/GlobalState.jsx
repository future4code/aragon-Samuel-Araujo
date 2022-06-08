import { createContext, useState } from "react";

export const GlobalContext = createContext();

export default function GlobalState(props) {
    const [form, setForm] = useState(
        {
            email: "",
            password: ""
        }
    )

    const [signup, setSignup] = useState(
        {
            username: "",
            email: "",
            password:"" 
        }
    )

    const states = {
        form: form,
        signup: signup
    }
    const setters = {
        setForm: setForm,
        setSignup: setSignup
    }
    const context = {states, setters}
    return (
        <GlobalContext.Provider value={context}>
            {props.children}
        </GlobalContext.Provider>
    )
}
