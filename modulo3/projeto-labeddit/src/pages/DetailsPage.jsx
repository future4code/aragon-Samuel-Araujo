import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"
import CardPost from "../components/CardPost";
import Header from "../components/Header";
import NewComment from "../components/NewComment";
import { GlobalContext } from "../global/GlobalState";
import { goToBack } from "../routes/coordinator";

export default function CommentPage() {
    const context = useContext(GlobalContext)
    const {post} = context.states
    const params = useParams()
    const navigate = useNavigate()

    return (
        <>
            <Header />
            <button onClick={() => goToBack(navigate)}>Voltar</button>
            <CardPost
                key={post.id}
                post={post}
                feed={false}
            />
            <h3>Lista de Comentários</h3>
            <NewComment 
                postId = {params.postId}
            />
        </>
    )
}