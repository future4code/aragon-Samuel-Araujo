import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../constants/BASE_URL"
import { GlobalContext } from "../global/GlobalState"
import { goToBack } from "../routes/coordinator"
import { refactorDate } from "../utility/refactorDate"


export default function NewComment(props) {

    const context = useContext(GlobalContext)
    const { post } = context.states
    const [newComment, setNewComment] = useState("")

    const [comments, setComments] = useState([])

    const navigate = useNavigate()

    const token = window.localStorage.getItem("token-labEddit")

    const headers = {
        headers: {
            authorization: token
        }
    }

    const onChangeComment = (event) => {
        setNewComment(event.target.value)
    }

    const getPostComments = (id) => {

        axios.get(`${BASE_URL}/posts/${id}/comments`, headers)
            .then((res) => {
                setComments(res.data)
                console.log(comments && comments)
            })
            .catch((err) => { console.log(err) })
    }

    const createComment = (id) => {
        const body = {
            body: newComment
        }
        axios.post(`${BASE_URL}/posts/${id}/comments`, body,
            {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                console.log(res.data)
                setNewComment("")
                getPostComments(post.id)
            })
            .catch((err) => { console.log(err) })
    }
    const createCommentVote = (id,vote, postId) => {
        const body = {
            direction: vote
        }
        axios.post(`${BASE_URL}/comments/${id}/votes`, body, headers)
        .then((res) => {
            console.log(res)
            getPostComments(postId)
        })
        .catch((err) => console.log(err))
    }
    const changeCommentVote = (id, changeVote, postId) => {
       const body = {
        direction: changeVote
       }
       axios.put(`${BASE_URL}/comments/${id}/votes`, body, headers)
       .then((res) => {
        console.log(res)
        getPostComments(postId)
    })
    .catch((err) => console.log(err))
    }
    const deleteCommentVote = (id, postId) => {
        axios.delete(`${BASE_URL}/comments/${id}/votes`, headers)
        .then((res) => {
            console.log(res)
            getPostComments(postId)
        })
        .catch((err) => console.log(err))
    }

    const showComments = comments.length ? comments.map((comment) => {
        return (
            <section key={comment.id}>
                <h4>{comment.username}</h4>
                <p>{comment.body}</p>
                <p>{refactorDate(comment?.createdAt)}</p>
                <p>Votos: {comment.voteSum === null ? <span>0</span> : comment.voteSum}</p>
                {
                    <section>
                        {
                            comment.userVote === null
                                ? <div>
                                    <button onClick={() => {createCommentVote(comment.id, -1, post.id)}}>
                                        Votar em "Não gostei"
                                    </button>
                                </div>
                                : <div>
                                    {comment.userVote === -1
                                        ? <button onClick={() => {deleteCommentVote(comment.id, post.id)}}>
                                            Remover o "Não Gostei"
                                        </button>
                                        : <button onClick={() => {changeCommentVote(comment.id, -1, post.id)}}>
                                            Mudar para "Não Gostei"
                                        </button>}
                                </div>
                        }

                        {
                            comment.userVote === null
                                ? <div>
                                    <button onClick={() => {createCommentVote(comment.id, 1, post.id)}}>
                                        Votar em "Gostei"
                                    </button>
                                </div>
                                : <div>
                                    {
                                    comment.userVote === 1
                                        ? <button onClick={() => {deleteCommentVote(comment.id, post.id)}}>
                                            Remover o "Gostei"
                                        </button>
                                        : <button onClick={() => {changeCommentVote(comment.id, 1, post.id)}}>
                                            Mudar para "Gostei"
                                        </button>}
                                </div>
                        }
                        </section>
                        }
                <hr />
            </section>
        )
    }) : <p>Nenhum comentário ainda, seja o number One</p>

    useEffect(() => {
        if (post.id === props.postId) {
            getPostComments(post.id)
        } else (
            goToBack(navigate)
        )
    }, [])


    return (
        <>
            {showComments}
            <label htmlFor="comentario">Comentário</label>
            <input
                id="comentario"
                value={newComment}
                onChange={onChangeComment}
                name="body"
            />
            {props.postId === post.id && <button onClick={() => { createComment(post.id) }}>Comentar</button>}
        </>
    )
}