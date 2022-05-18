import { useState } from 'react'
import Header from './components/Header'
import Match from './pages/Match'
import Profile from './pages/Profile'

function App() {
  const [currentPage, setCurrentPage] = useState("profile")

  const selectPage = () => {
    switch(currentPage) {
      case "profile":
        return <Profile />
      case "match":
        return <Match />
    }
  }

  const goToMatch = () => {
    setCurrentPage("match")
  }
  const goToProfile = () => {
    setCurrentPage("profile")
  }

  return (
    <div>
      <Header
        goToMatch={goToMatch}
        currentPage={currentPage}
        goToProfile={goToProfile}
      />
      {selectPage()}
    </div>
  )
}

export default App
