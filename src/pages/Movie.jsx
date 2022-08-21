import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill } from 'react-icons/bs'
import MovieCard from "../components/MovieCard"

import './Movie.css'

const moviesURL = import.meta.env.VITE_API
const apikey = import.meta.env.VITE_API_KEY

const Movie = () => {

    const { id } = useParams()
    const [movie, setMovie] = useState(null)

    const getMovie = async (url) => {
        const res = await fetch(url)
        const data = await res.json()

        console.log(">>> movie: ", data)
        setMovie(data)
    }

    const formatCurrency = (number) =>{
        return number.toLocaleString("en-US", {
            style: 'currency',
            currency: 'USD',
        })
    }
    useEffect(() => {
        const movieURL = `${moviesURL}${id}?api_key=${apikey}&language=pt-br`
        getMovie(movieURL)
    }, [])


    return (
        <div className="movie-page">
            {
                //.map(e => e.name).join(",")
                movie && (
                    <>
                        <MovieCard movie={movie} showLink={false} />
                        <p className="tagline">{movie.tagline}</p>
                        <div className="info">
                            <h3><BsWallet2 /> Orçamento:</h3>
                            <p>{formatCurrency(movie.budget)}</p>
                        </div>
                        
                        <div className="info">
                            <h3><BsGraphUp /> Receita:</h3>
                            <p>{formatCurrency(movie.revenue)}</p>
                        </div>
                        <div className="info">
                            <h3><BsHourglassSplit /> Duração:</h3>
                            <p>{movie.runtime} minutos</p>
                        </div>
                        <div className="info">
                            <h3><BsHourglassSplit /> gênero:</h3>
                            <p>{movie.genres.map(e => e.name).join(", ")}</p>
                        </div>
                        <div className="info">
                            <h3><BsHourglassSplit /> origem:</h3>
                            <p>{movie.production_countries.map(e => e.name).join(", ")}</p>
                        </div>
                        <div className="info">
                            <h3><BsHourglassSplit /> idioma:</h3>
                            <p>{movie.spoken_languages.map(e => e.name).join(", ")}</p>
                        </div>
                    
                        <a href={`https://www.themoviedb.org/movie/${movie.id}?language=pt-BR` } target='_blank'>ver no tmdb</a>
                        <a href={`https://www.imdb.com/title/${movie.imdb_id}` } target='_blank'>ver no imdb</a>

                        <div className="info description">
                            <h3><BsFillFileEarmarkTextFill /> Descrição:</h3>
                            <p>{movie.overview}</p>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Movie