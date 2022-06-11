import axios from "axios"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../constants/BASE_URL"
import { GlobalContext } from "../global/GlobalState"
import { goToComment } from "../routes/coordinator"
import { refactorDate } from "../utility/refactorDate"
import styled from "styled-components"

const MainPosts = styled.main`


`

export default function CardPost(props) {
    const token = window.localStorage.getItem("token-labEddit")

    const context = useContext(GlobalContext)
    const {setPost} = context.setters 
    const {getPosts} = context.getters

    const navigate = useNavigate()

    const {
        id, username, title, body, createdAt, voteSum, commentCount, userVote } = props.post

    const createPostVote = (id, sum) => {

        axios.post(`${BASE_URL}/posts/${id}/votes`, {
            direction: sum
        },
            {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                console.log(res)
                getPosts()

            })
            .catch((err) => {
                console.log(err)
            })
    }

    const changePostVote = (id, change) => {

        axios.put(`${BASE_URL}/posts/${id}/votes`,{
            direction: change
        },
            {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                console.log(res)
                getPosts()

            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deletePostVote = (id) => {
        axios.delete(`${BASE_URL}/posts/${id}/votes`,
        {
            headers: {
                Authorization: token
            }
        })
        .then((res) => {
            console.log(res)
            getPosts()

        })
        .catch((err) => {
            console.log(err)
        })
    }

    const goComment = () => {
        setPost(props.post)
        goToComment(navigate, id)
    }


    

    return (
        <MainPosts>
            <div key={id}>
                <h3>{username}</h3>
                <h2>{title}</h2>
                <img src={`https://picsum.photos/400/400?a=${id}`} alt="imagem aleatória buscada pelo id da postagem" />
                <p>{body}</p>
                <p>Data da Postagem: { createdAt && refactorDate(createdAt)}</p>
                <p>
                    Votos:
                    {
                        voteSum === null
                            ? <span>0</span>
                            : voteSum
                    }
                </p>
                {props.feed && <section>{
                    userVote === null
                        ? <div><button onClick={() => createPostVote(id, -1)}>Votar em "Não gostei"</button></div>
                        : <div>{userVote === -1 ? <button onClick={() => deletePostVote(id)}>Remover o "Não Gostei"</button> : <button onClick={() => changePostVote(id, -1)}>Mudar para "Não Gostei"</button>}</div>
                }

                {
                    userVote === null
                        ? <button onClick={() => createPostVote(id, 1)}>Votar em "Gostei"</button>
                        : <div>{userVote === 1 ? <button onClick={() => deletePostVote(id)}>Remover o "Gostei"</button> : <button onClick={() => changePostVote(id, 1)}>Mudar para "Gostei"</button>}</div>
                } </section>}
                <p>
                    Comentários:
                    {
                            commentCount === null
                            ? <span>0</span>
                            : commentCount
                    }
                    
                </p>
                {props.feed && <button onClick={() => goComment()}>Ver comentários</button>}
            </div>


        </MainPosts>
    )
}