import React, {useContext, useEffect} from 'react'
import './CharacterCard.css'
import {Link} from 'react-router-dom'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FavoritesContext } from '../../contexts/FavoritesContext';


function CharacterCard({character}) {
  //need access to global context
  //NOTE {} not []
  const {addCharacter, favorites, removeCharacter} = useContext(FavoritesContext)


  //create variable to test conditional rendering
  //const isFavorite = false;
  //change to state
  const [isFavorite, setIsFavorite] = React.useState(false)

  //create useEffect to run anytime favorites changes
  useEffect(
    ()=>{
      //console.log(favorites)
      //is this character in favorites?
      setIsFavorite(favorites?.find(item => item.id === character.id))
    }, [favorites]

  )


  return (
    <div className="character-card">
        <img src={character.image} />
        <p>{character.name}</p>
        <Link to={`/details/${character.id}`}>See Details</Link>
        {
          isFavorite?
          <FaHeart className='heart-icon' 
          onClick={()=>removeCharacter(character.id)}/>
          :
          <FaRegHeart className='heart-icon' 
          onClick={()=>addCharacter(character)}
          />
        }
    </div>
  )
}

export default CharacterCard