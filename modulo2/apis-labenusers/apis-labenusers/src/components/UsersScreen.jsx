import React from "react";

class UsersSreen extends React.Component {


    render(){
        return(
            <div>
                <div>{this.props.userFinder === this.props.usersList}
                    ?<div>
                        <ul>
                            {this.props.usersList.length === 0 && <div>Carregando...</div>}
                            {this.props.usersList.map(user => {
                                return (
                                    <li>
                               
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
            </div>
                <button>Voltar para lista de usuários</button>
            </div>
        )
    }
}

export default UsersSreen