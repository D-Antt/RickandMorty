import React, {useEffect, useState} from 'react'
import './Homepage.css'
import axios from 'axios'
import CharacterCard from '../components/CharacterCard/CharacterCard'

function Homepage() {

    //create state to hold characters
    const [characters, setCharacters] = useState([])

    //this page should show all the characters when it loads
    //create useEffect for this
    //https://rickandmortyapi.com/api/character

    useEffect(
        ()=>{
            //console.log('homepage loaded')
            //make api call to get characters
            axios.get(`https://rickandmortyapi.com/api/character`)
            .then(res =>{
                console.log(res.data.results)
                //I have the character data, where do I store it?
                //store it in state
                setCharacters(res.data.results)

            })
            .catch(err => console.log(err))

        }, [] //means it runs only once when the page loads
    )

  return (
    <div className="home-container">
        
        <h1>Main Characters</h1>
        <div className="characters-container">
            {
              characters.map(item => <CharacterCard key={item.id} character={item} />)

            }
        </div>
    </div>
  )
}

export default Homepage