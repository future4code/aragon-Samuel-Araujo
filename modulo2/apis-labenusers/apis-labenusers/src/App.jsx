import React from "react";
import RegistrationScreen from "./components/RegistrationScreen";
import UsersSreen from "./components/UsersScreen";
import axios from "axios";


class App extends React.Component {
  state = {
    currentScreen: "registrationScreen",
    inputName: "",
    inputEmail: "",
    usersList: [],
    userId: "",

  }
  
  updateInputName=(event)=>{
    const newInputName = event.target.value;
    this.setState({inputName: newInputName})
  }
  updateInputEmail=(event)=>{
    const newInputEmail = event.target.value;
    this.setState({inputEmail: newInputEmail})
  }

  handleCreateUsers = () => {
    const body = {
      "name": this.state.inputName,
      "email": this.state.inputEmail
    };
    const keyAuthorization = {
      headers: {
        Authorization: "samuel-araujo-aragon"
      }
    };

    axios
      .post("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users",
        body,
        keyAuthorization
      )
      .then(() => {
        alert(`Usuário ${this.state.inputName} criado com sucesso!`);
        this.setState({inputName: "", inputEmail: ""});
      })
      .catch(error =>{
        alert('Erro ao criar o usuário');
        console.log(error);
      })
  }
  componentDidMount() {
    this.userFinder()
  }

  userFinder = () => {
    const keyAuthorization = {
      headers: {
        Authorization: "samuel-araujo-aragon"
      }
    };

    axios
    .get("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users",
    keyAuthorization
    )
    .then(response => {
      this.setState({usersList: response.data})
    })
  }

  changeScreen = () => {
    if (this.state.currentScreen === "registrationScreen") {
      this.setState({currentScreen: "usersScreen"})
    }else {
      this.setState({currentScreen: "registrationScreen"})
    }
  }
  render(){
    return(
            <div>
              <button onClick={this.changeScreen}>Alterar de Tela</button>
              {
                this.state.currentScreen === "registrationScreen"
                  ?<RegistrationScreen
                  inputName= {this.state.inputName}
                  inputEmail={this.state.inputEmail}
                  updateInputName={this.updateInputName}
                  updateInputEmail={this.updateInputEmail}
                  handleCreateUsers={this.handleCreateUsers}
              />
              :<UsersSreen
              userFinder={this.userFinder}
              componentDidMount={this.componentDidMount}
              usersList={this.state.usersList}
              />
              }
            </div>
    )
  }
}

export default App