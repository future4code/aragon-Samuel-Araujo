import Header from "../components/Header"
import TravelList from "../components/TravelList"

function HomePage() {
    return (
        <div>
            <Header currentPage={"homePage"} />
            <hr />
            <h2>Inscreva-se uma nova viagem!</h2>
            <hr />
            <TravelList currentPage={"homePage"} />
        </div>
    )

}
export default HomePage