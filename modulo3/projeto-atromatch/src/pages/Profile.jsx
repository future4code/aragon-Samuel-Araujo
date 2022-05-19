import axios from 'axios'
import { useEffect, useState } from 'react'
import { ALUNO, BASE_URL } from '../constants/Url'


function Profile() {
  const [profile, setProfile] = useState({})

  useEffect(()=>{
    getProfile()
  },[])

  const getProfile = () => {
    axios.get(`${BASE_URL}/${ALUNO}/person`)
      .then((response) => {
        setProfile(response.data.profile)
        // console.log(profile)
      })
      .catch((error) => { console.error(error.response) })
  }
  
  const likeOrDislike = (id, choice) => {
    const body = {
      id: id,
      choice: choice
    }
    axios.post(`${BASE_URL}/${ALUNO}/choose-person`, body)
    .then((response)=>{
      getProfile()
      console.log(response)
    })
    .catch(()=>{
      console.error("deu ruim")
    })
  }
  
  const restart = () => {
    axios.put(`${BASE_URL}/${ALUNO}/clear`)
    .then(()=>{
      alert('Perfis resetados com sucesso! <3')
      getProfile()
    })
    .catch(()=>{
      alert.error('Deu ruim!')
    })
  }
    const peopleCard = profile && (
      <figure>
          <img width={"240px"} src={profile.photo} alt={profile.photo_alt} />
          <p>{profile.name}, {profile.age}</p>
          <p>{profile.bio}</p>
        <button onClick={() => likeOrDislike(profile.id, false)}>Dislike</button>
        <button onClick={() => likeOrDislike(profile.id, true)}>Like</button>

      </figure>
    )


  return (
    <div>
        <h2>Perfis</h2>
        {peopleCard}
        <button onClick={() => restart()}>Resetar Perfis</button>
    </div>
  )
}

export default Profile