import { useState } from 'react'


function Header(props) {

  return (
    <div>
        <h1>AstroMatch</h1>
        {props.currentPage === "profile"
        ?<button onClick={() => props.goToMatch()}>Ir para matches</button>
        :<button onClick={() => props.goToProfile()}>Ir para perfil</button>
        }
        <hr/>
    </div>
  )
}

export default Header