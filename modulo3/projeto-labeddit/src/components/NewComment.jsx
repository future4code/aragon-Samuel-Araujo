import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { BASE_URL } from "../constants/BASE_URL"
import { GlobalContext } from "../global/GlobalState"
import { refactorDate } from "../utility/refactorDate"


export default function NewComment(props) {

    const context = useContext(GlobalContext)
    const {post} = context.states
    const [newComment, setNewComment] = useState(
        {
            body: ""
        }
    )

    const [comments, setComments] = useState([])

    const token = window.localStorage.getItem("token-labEddit")

    const getPostComments = (teste) => {
        axios.get(`${BASE_URL}/posts/${teste}/comments`,
            {
                headers: {
                    Authorization: token
                }
            })
            .then((res)=>{setComments(res.data)
            console.log(comments)})
            .catch((err)=>{console.log(err)})
    }

    const onChangeComment = (event) => {
        setNewComment({...newComment, [event.target.name]: event.target.value})
    }

    const createComment = (id) => {
        axios.post(`${BASE_URL}/posts/${id}/comments`, comment, token)
        .then((res) => {console.log(res.data)})
        .catch((err) => {console.log(err)})
    }

    const showComments = comments.length ? comments.map((comment)=> {
        return(
            <section key={comment.id}>
                <h4>{comment.username}</h4>
                <p>{comment.body}</p>
                <p>{refactorDate(comment?.createdAt)}</p>
                <p>Votos: {comment.voteSum === null ? <span>0</span> : comment.voteSum}</p>
                <hr />
                <label htmlFor="comentario">Comentário</label>
                <input
                    id="comentario"
                    value={newComment.body}
                    onChange={onChangeComment}
                    name="body"
                />
                <button onClick={() => {createComment(comment.id)}}>Comentar</button>
            </section>
        )
    }): <p>Nenhum comentário ainda, seja o number One</p>

    useEffect(()=>{
        console.log(post.id)
        console.log(props.postId)
        if(post.id === props.postId){
            getPostComments(post.id)
        }
    },[])


    return(
        <>

            {showComments}
        </>
    )
}