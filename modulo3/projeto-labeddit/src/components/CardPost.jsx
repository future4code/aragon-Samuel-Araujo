import axios from "axios"
import { BASE_URL } from "../constants/BASE_URL"
import { refactorDate } from "../utility/refactorDate"

export default function CardPost(props) {


    const token = window.localStorage.getItem("token-labEddit")


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
                props.getPosts()

            })
            .catch((err) => {
                console.log(err)
            })
    }


    const posts = props.posts.map((post) => {
        return (
            <div key={post.id}>
                <h3>{post.username}</h3>
                <h2>{post.title}</h2>
                <img src={`https://picsum.photos/400/400?a=${post.id}`} alt="imagem aleatória buscada pelo id da postagem" />
                <p>{post.body}</p>
                <p>Data da Postagem: {refactorDate(post.createdAt)}</p>
                <p>
                    Votos:
                    {
                        post.voteSum === null
                            ? <span>0</span>
                            : post.voteSum
                    }
                </p>
                {
                    post.userVote === null
                        ? <button onClick={() => createPostVote(post.id, -1)}>Votar em "Não gostei"</button>
                        : <div>{post.userVote === -1 ? <button>Remover o "Não Gostei"</button> : <button>Mudar para "Gostei"</button>}</div>
                }

                {
                    post.userVote === null
                        ? <button onClick={() => createPostVote(post.id, 1)}>Votar em "Gostei"</button>
                        : <div>{post.userVote === 1 ? <button>Remover o "Gostei"</button> : <button>Mudar para "Não Gostei"</button>}</div>
                }
                <p>
                    Comentários:
                    {
                        post.commentCount === null
                            ? <span>0</span>
                            : post.commentCount
                    }
                </p>
                <button>Ver comentários</button>
                <hr />
            </div>
        )
    })

    return (
        <>
            {posts}
        </>
    )
}