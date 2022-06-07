import { createContext, useState } from "react";

export const GlobalContext = createContext();

export default function GlobalState(props) {
    const [form, setForm] = useState(
        {
            email: "",
            password: ""
        }
    )
    const states = {
        form: form
    }
    const setters = {
        setForm: setForm
    }
    const context = {states, setters}
    return (
        <GlobalContext.Provider value={context}>
            {props.children}
        </GlobalContext.Provider>
    )
}
