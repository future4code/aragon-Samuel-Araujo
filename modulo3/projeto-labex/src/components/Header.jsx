import {useNavigate} from "react-router-dom"
import { navigateToAdminPage, navigateToHome } from "../routes/coordinator"

function Header (props){
    const navigate = useNavigate()
    return(
        <header>
            <h1>LabeX</h1>
            <nav>
                {props.currentPage === "homePage"
                ?<button onClick={() => navigateToAdminPage(navigate)}>Entrar</button>
                :<button onClick={() => navigateToHome(navigate)}>Logout</button>}
            </nav>
        </header>
    )
}
export default Header