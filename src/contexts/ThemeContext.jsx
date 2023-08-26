import {useState, createContext, useEffect} from 'react'

//create this context "thing"
export const ThemeContext = createContext()

export default function ThemeContextProvider(props){

    //create my global state
    const [darkMode, setDarkMode]=useState(false)

    //set up useEffect to run when component loads to check localStorage
    useEffect(
        ()=>{
            //get the value from localStorage
            const storedDarkMode = localStorage.getItem('darkMode')
            console.log(storedDarkMode)
            //check if something was there
            if (storedDarkMode){
                //use this value for state
                setDarkMode(JSON.parse(storedDarkMode))
            }
        }, []
    )


    //set up useEffect to run anytime darkmode changes
    useEffect(
        ()=>{
            console.log('darkmode is now', darkMode)
            //save the value of darkMode to localStorage
            localStorage.setItem('darkMode', JSON.stringify(darkMode))
        }, [darkMode]
    )

    

    return(
        <ThemeContext.Provider value={{darkMode, setDarkMode}} >
            {props.children}
        </ThemeContext.Provider>
    )
}