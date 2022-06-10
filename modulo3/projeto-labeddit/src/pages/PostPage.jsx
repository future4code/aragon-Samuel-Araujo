import { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import CardPost from "../components/CardPost";
import CreateNewPost from "../components/CreateNewPost";
import Header from "../components/Header";
import { BASE_URL } from "../constants/BASE_URL";
import { GlobalContext } from "../global/GlobalState";
import { goToLogin } from "../routes/coordinator";

export default function PostPage() {
    const context = useContext(GlobalContext)
    const {posts, page} = context.states
    const {setPage} = context.setters
    const {getPosts} = context.getters

    const token = window.localStorage.getItem("token-labEddit")
    const email = window.localStorage.getItem("email-labEddit")

    const navigate = useNavigate()

    const changePage = (sum) => {
        const newPage = page + sum
        setPage(newPage)
    }
    const backToStart = () => {
        setPage(1)
    }

    const showPost = posts.length && posts.map((post)=>{
        return(
            <CardPost
                feed = {true}
                post = {post}
            />
        )
    })

    // const getPosts = (currentPage) => {
    //     axios.get(`${BASE_URL}/posts?page=${currentPage}&size=10`,
    //         {
    //             headers: {
    //                 Authorization: token
    //             }
    //         })
    //         .then((res) => {
    //             setPosts(res.data)
    //             console.log(posts)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })

    // }
    const logout = () => {
        window.localStorage.removeItem("token-labEddit")
        window.localStorage.removeItem("email-labEddit")
        goToLogin(navigate)
    }

    useEffect(() => {
        if (posts) {
            getPosts(page)
        }
    }, [page])

    useEffect(() => {
        if (!token) {
            goToLogin(navigate)
        }
    })

    return (
        <>
            <Header />
            <h3>Bem-vindo, {email}</h3>
            <button onClick={() => { logout() }}>Logout</button>
            <hr />
            <CreateNewPost getPosts={getPosts} />
            <hr />
            {page !== 1 && <button onClick={() => changePage(-1)}>Página Anterior</button>}
            <p>{page}</p>
            <button onClick={() => changePage(1)}>Próxima Página</button>
            {page > 2 && <button onClick={() => backToStart()}>Voltar ao começo</button>}
            <hr />
            <h3>Lista de Posts</h3>
            {showPost}
            
        </>
    )
}