import React from 'react'
import './Search.css'
import axios from 'axios'

function Search({setCharacters}) {
    //create state to hold user input
    const [query, setQuery] = React.useState('')

    //1 - need to store user input in query
    //2 - what event triggers the search
    //3 - where will data come from?
    //https://rickandmortyapi.com/api/character/?name=beth

    const handleSearch = (e) =>{
        //stop the form from refreshing
        e.preventDefault()
        console.log('search', query)
        //make api call to get characters that match query
        axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`)
        .then(res =>{
            console.log(res.data.results)
            //I have the data, what do I do with it?
            //I want to change the data in characters on Homepage
            setCharacters(res.data.results)

        })
        .catch(err => {
            console.log(err.response.status)
            //create alert if not found
            if (err.response.status === 404){
                alert(`No character named ${query}`)
            }
            else{
                console.log(err)
            }
        })

        //clear textbox
        setQuery('')

    }

  return (
    <form className='search-container' onSubmit={handleSearch}>
        <input type="text" onChange={(e)=>setQuery(e.target.value)}
        placeholder="Search all characters" value={query} />

    </form>
  )
}

export default Search