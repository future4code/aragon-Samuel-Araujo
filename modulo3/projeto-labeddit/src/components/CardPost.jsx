import { refactorDate } from "../utility/refactorDate"

export default function CardPost (props) {
    
    const posts = props.posts.map((post)=>{
        return(
            <div key={post.id}>
                <h3>{post.username}</h3>
                <h2>{post.title}</h2>
                <img src={`https://picsum.photos/400/400?a=${post.id}`} alt="imagem aleatória buscada pelo id da postagem" />
                <p>Data da Postagem: {refactorDate(post.createdAt)}</p>
                <hr />
            </div>
        )
    })
    
    return(
        <>
            {posts}
        </>
    )
}