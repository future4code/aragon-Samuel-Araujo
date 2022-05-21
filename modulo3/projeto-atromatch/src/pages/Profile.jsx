import axios from 'axios'
import { useEffect, useState } from 'react'
import { ALUNO, BASE_URL } from '../constants/Url'
import styled from 'styled-components'

const PeopleCard = styled.main`
  .people {
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }

  .people-img{
    width: 20%;
    object-fit: contain;
    border-radius: 50px;
  }

  .text-button{
    width: 30vw;
    display: flex;
    justify-content: space-between;
  }
`


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
      if (body.choice && response.data.isMatch){
        alert("Deu match! ❤")
      }
    })
    .catch(()=>{
      console.error("deu ruim")
    })
  }
  
  const restart = () => {
    axios.put(`${BASE_URL}/${ALUNO}/clear`)
    .then(()=>{
      alert('Perfis resetados com sucesso!')
      getProfile()
    })
    .catch(()=>{
      alert.error('Deu ruim!')
    })
  }
    const peopleCard = profile && (
      <figure className='people'>
        
          <img className='people-img' src={profile.photo} alt={profile.photo_alt} />
        <div className='text-button'>
            <p>{profile.name}</p>
            <button onClick={() => likeOrDislike(profile.id, true)}>Like</button>
        </div>
        <div className='text-button'>
          <p>{profile.age} Anos</p>
          <button onClick={() => likeOrDislike(profile.id, false)}>Dislike</button>
        </div>
          <p>{profile.bio}</p>
        
        

      </figure>
    )


  return (
    <PeopleCard>
        <h2>Astros</h2>
        {peopleCard}
        {profile ? <div>teste</div> :<button onClick={() => restart()}>Resetar Perfis</button>}
    </PeopleCard>
  )
}

export default Profile