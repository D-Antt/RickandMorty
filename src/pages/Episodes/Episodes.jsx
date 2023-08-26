import React, {useEffect} from 'react'
import './Episodes.css'
import axios from 'axios'
import CharacterCard from '../../components/CharacterCard/CharacterCard'


function Episodes() {
  //when the user chooses an episode number, the page shows the
  //info and characters about that episode

  //create state to hold the option numbers
  const [options, setOptions] = React.useState([])
  //create state to hold selected option
  const [selectedOption, setSelectedOption] = React.useState(1)
  //create state for episode data
  const [selectedEpisode, setSelectedEpisode]= React.useState('')
  //create state for the characters
  const [characterList, setCharacterList] = React.useState([])

  //I need to find out how many episodes there are
  //in order to build the dropdown element
  //https://rickandmortyapi.com/api/episode
  useEffect(
    ()=>{
      //make api call to find out number of episodes
      axios.get(`https://rickandmortyapi.com/api/episode`)
      .then(res =>{
        console.log(res.data.info.count)
        //I need to create an array with [1, 2, ... 51]
        const nums = []
        for (let i = 1; i <= res.data.info.count; i++){
          nums.push(i)
        }
       // console.log(nums)
        //store in state
        setOptions(nums)
      })
      .catch(err => console.log(err))

      //fetchEpisodeData()
    }, []
  )

  const handleSelectChange = (e) =>{
    console.log( e.target.value)
    //store this value in state
    setSelectedOption(e.target.value)
    //call function here to get data from api
    //fetchEpisodeData()
  }

  useEffect(
    ()=>{
      console.log('you selected', selectedOption)
      //call function to get data from api
      fetchEpisodeData()
    }, [selectedOption] //runs anytime this state changes
  )

  //https://rickandmortyapi.com/api/episode/28

  const fetchEpisodeData   = async () =>{
    console.log('fetch data')
    try{
      //make api call for this episode
     const res = await axios.get(`https://rickandmortyapi.com/api/episode/${selectedOption}`)
     //console.log(res.data)
     //this is my episode data, need to store it in state
     setSelectedEpisode(res.data)
     //now need to make api calls for all the characters
     //console.log(res.data.characters)
     //gather the data from all these api calls to show the cards
     const episodeCharacters = await Promise.all(
      res.data.characters.map(url => {
        return axios.get(url).then(res => res.data)
      })
     )
     console.log(episodeCharacters)
     //store this in state
     setCharacterList(episodeCharacters)

    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="episodes-container">
      <div>
        <label htmlFor="select-episode">Select an episode</label>
        <select id='select-episode' onChange={handleSelectChange}>
          {
            options.map(num => <option key={num} value={num}>{`Episode ${num}`}</option>)
          }
        </select>
      </div>

      <div>
        <div className="episode-info">
          <p>Episode Name: {selectedEpisode?.name}</p>
          <p>Air Date: {selectedEpisode?.air_date}</p>
        </div>
        <div className="character-container">
          {
            characterList.map(item=><CharacterCard character={item}
              key={item.id} />)
          }
        </div>

      </div>

    </div>
  )
}

export default Episodes