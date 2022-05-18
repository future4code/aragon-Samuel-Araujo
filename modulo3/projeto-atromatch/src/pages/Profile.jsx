import axios from 'axios'
import { useEffect, useState } from 'react'
import { ALUNO, BASE_URL } from '../constants/Url'


function Profile() {
  const [profile, setProfile] = useState({})

  useEffect(()=>{
    getProfite()
  },[])

  const getProfite = () => {
    axios.get(`${BASE_URL}/${ALUNO}/person`)
      .then((response) => {
        setProfile(response.data.profile)
        console.log(profile.name)
      })
      .catch((error) => { console.error(error.response) })
  }


  return (
    <div>
        <h2>Perfis</h2>
        <figure>
          <img width={"240px"} src={profile.photo} alt={profile.photo_alt} />
          <p>{profile.name}, {profile.age}</p>
          <p>{profile.bio}</p>
        <button onClick={() => getProfite()}>Próximo perfil</button>
      </figure>
    </div>
  )
}

export default Profile