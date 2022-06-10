import axios from "axios"
import { useContext} from "react"
import { BASE_URL } from "../constants/BASE_URL"
import { GlobalContext } from "../global/GlobalState"

export default function CreateNewPost(props) {
    const context = useContext(GlobalContext)
    const {newPost} = context.states
    const {setNewPost} = context.setters

    const onChangeNewPost = (event) => {
        setNewPost({...newPost, [event.target.name]: event.target.value})
    }

    const token = window.localStorage.getItem("token-labEddit")

    const createPost = (event) => {
        event.preventDefault()

        axios.post(`${BASE_URL}/posts`, newPost,
        {
            headers:{
                Authorization: token
            }
        })
        .then(()=>{
            alert("Post criado com sucesso")
            props.getPosts()
            
        })
        .catch((err)=>{
            alert("Algo deu errado, tente novamente")
            console.log(err)
        })
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