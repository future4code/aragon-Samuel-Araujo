import React from "react";

class RegistrationScreen extends React.Component {


    render(){
        return(
            <div>
                <label>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={this.props.inputName}
                        onChange={this.props.updateInputName}
                    />

                </label>
                <label>
                    <input
                        type="text"
                        placeholder="E-mail" 
                        value={this.props.inputEmail}
                        onChange={this.props.updateInputEmail}
                    />
                </label>
                <button onClick={this.props.handleCreateUsers}>Criar Usuário</button>
            </div>
        )
    }
}

export default RegistrationScreen