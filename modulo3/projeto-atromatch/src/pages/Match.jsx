import axios from 'axios'
import { useEffect, useState } from 'react'
import { ALUNO, BASE_URL } from '../constants/Url'


function Match() {
  const [match, setMatch] = useState()

  useEffect(()=>{
    getMatchs()
  },[] )

  const getMatchs = () =>{
    axios.get(`${BASE_URL}/${ALUNO}/matches`)
    .then((response)=>{
      setMatch(response.data.matches)
      console.log(match)})
    .catch(()=>{console.error('deu ruim em pegar os match')})
  }

  const cardsMatchs = match && match.map((person) => {
    return (
      <figure key={person.id}>
        <img width={"100px"} src={person.photo} alt={person.photo_src} />
        <span>{person.name}</span>
        <hr />
      </figure>
    )
  })

  return (
    <div>
        <h2>Match</h2>
        {cardsMatchs}
    </div>
  )
}

export default Match