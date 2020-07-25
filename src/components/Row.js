import React, {useState, useEffect} from 'react'

import axios from '../axios'
import './Row.css'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'
// import yts from 'yt-search'


const base_url = "https://image.tmdb.org/t/p/original/"


function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([])

    const [trailerUrl, settrailerUrl] = useState("")

    const [movieOnHover, setmovieOnHover] = useState(null)

    // snippet of code which runs based on a specific condition

    useEffect(() => {

        // make a request to tmdb
        
        async function fetchData(){

            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
        }
        fetchData()
        
    }, [fetchUrl])

    const opts = {
        height: '390',
        width: "100%",
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    };

    const handleClick = (movie) => {

        console.log("Handle Click");
        console.log(movie);
        console.log("title >>> ", movie?.title);
        console.log("name >>> ", movie?.name);

        if(trailerUrl){
            settrailerUrl("")
        } else {
            movieTrailer(movie?.name || movie?.title || "")
            .then(url => {
                // https://www.youtube.com/watch?v=Z8eXaXoUJRQ
                const urlParams = new URLSearchParams( new URL(url).search);
                settrailerUrl(urlParams.get('v'))
            })
            .catch((error) => {
                settrailerUrl("ieFP7SaXZJw")
                console.log(error)
                console.log("No movie trailer found");
            })
        }

        console.log(trailerUrl);
    }

    const handleMouseEnter = (movie) => {
        console.log("On hover movie: ", movie);
        setmovieOnHover(movie?.id)
    }

    const handleMouseLeave = () => {
        console.log("Mouse leaved");
        setmovieOnHover(null)
    }

    
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                
                {
                    movies.map((movie) => (
                        <img
                            key={movie.id}
                            onClick={() => handleClick(movie)}
                            className={`row__poster ${isLargeRow && "row__posterLarge"} ${movieOnHover === movie.id && "row__posterHover"}`} 
                            // src={isLargeRow ? (base_url + movie.poster_path): (base_url + movie.backdrop_path)} 
                            src={(base_url + movie.poster_path)} 
                            alt={movie.name}
                            onMouseEnter={() => handleMouseEnter(movie)}
                            onMouseLeave={() => handleMouseLeave()}
                        />
                    ))
                }

            </div>

            {
                trailerUrl
                    &&
                <YouTube 
                    videoId={trailerUrl}
                    opts={opts}
                />
            }
            
        </div>
    )
}

export default Row
