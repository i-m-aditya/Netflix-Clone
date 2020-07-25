import React, {useState, useEffect} from 'react'
import axios from '../axios'
import requests from '../requests'
import { Button } from '@material-ui/core';

import './Banner.css'

function Banner() {

    const [movie, setMovie] = useState([])

    useEffect(() => {
        
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals)
            console.log("results: ",request.data.results);
            const randomNumber = Math.floor(Math.random() * request.data.results.length)
            console.log("randomNumber: ", randomNumber);
            
            setMovie(
                request.data.results[randomNumber]
            )
        }
        fetchData()

    }, [])

    console.log("movie: ", movie);

    function truncate(str, n){
        return str?.length > n ? str.substr(0, n-1) + "..." : str ;
    }

    return (
        <header 
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
                backgroundPosition: "center center"
            }}

        >

            <div className="banner__contents">

                {/* title */}

                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>


                {/* div -> 2 buttons */}
                
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button" >My List</button>
                </div>

                {/* description */}
                <h1 className="banner__description">
                    {truncate(movie?.overview, 150)}
                </h1>
                
                {/* fade bottom */}


            </div>
            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner
