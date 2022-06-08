import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../constants/BASE_URL"
import { goToPostPage } from "../routes/coordinator"

export default function CreateNewPost() {
    const [newPost, setNewPost] = useState(
        {
            title: "",
            body: ""
        }
    )

    const navigate = useNavigate()

    const onChangeNewPost = (event) => {
        setNewPost({...newPost, [event.target.name]: event.target.value})
    }

    const token = window.localStorage.getItem("token-labEddit")
    const createPost = () => {
        axios.post(`${BASE_URL}/posts`, newPost, token)
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{console.log(err)}) //ainda não está funcionando
    }
    
    return(
        <>
            <h2>Crie um novo Post</h2>
            <form onSubmit={createPost}>
                <label htmlFor="titulo">Título:</label>
                <input
                    id="titulo"
                    placeholder="Título da postagem"
                    value={newPost.title}
                    name="title"
                    onChange={onChangeNewPost}
                />
                <label htmlFor="descricao">Descrição:</label>
                <input
                    id="descricao"
                    placeholder="Descrição da postagem"
                    value={newPost.body}
                    name="body"
                    onChange={onChangeNewPost}
                />

                <button>Criar Post</button>
            </form>
        </>
    )
}