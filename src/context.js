import React, { useContext, useEffect, useState } from 'react';

export const API_URL =    `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;
// create a context object that will be used to share data between components
const AppContext = React.createContext();

// we need to create a provider function
// it takes a children prop which represents the child components that will be wrapped by the provider 
const AppProvider = ({children}) => {
    // the value will be available to the child components

    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({show : false, msg : ""});
    const [query, setQuery] = useState('Demon Slayer');
    const getMovies = async(url) => {
        setIsLoading(true);
        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            // ye data.Response or data.Search hme print krva k dekhe ki data object ki konsi keys thi
            if(data.Response === "True") {
                setIsLoading(false);
                // ye data.Search ek array of objects hai jism movie ki imdb uska poster sb 
                setMovie(data.Search);
                setIsError({
                    show: false,
                    msg: "",
                });
            }
            else {
                setIsError({
                    show: true,
                    msg: data.Error,
                });
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // yha hmne debouncing use ki hai -> jese hm batman search krenge to sirf batman ka he object aega b, ba, bat,.. in sbk objects nhi aenge
        // agr hm ye settimeout or cleartimeout use nhi krre the to hme sbhi prefixes k objects mil rhe the
        let timerout = setTimeout(() => {
            getMovies(`${API_URL}&s=${query}`);
        }, 500); // 500ms k delay k bad response milega
        return () => clearTimeout(timerout);
    }, [query]); // query ki value change krene pe update kro : ye dependency hai

    return <AppContext.Provider value = {{isLoading, isError, movie, query, setQuery}}>{children}</AppContext.Provider>
};

// global context hook
const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider, useGlobalContext};