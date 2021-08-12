import React, { useState, useEffect} from 'react'
import './row.scss'
import axios from '../axios/axios'

export default function Row({title, fetchURL, isLargeRow = false}) {
    const [movies, setMovies] = useState([])

    const base_url = "https://image.tmdb.org/t/p/original"

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchURL);
            setMovies(request.data.results)
            return request
        }

        fetchData()
    }, [fetchURL])

    return (
        <div className="row">
            <h1>{title}</h1>
            <div className="row__posters">
                {movies.map(movie => (
                    ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                        <img key={movie.id} className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                            src={`${base_url}${
                            isLargeRow ? movie?.poster_path : movie?.backdrop_path
                        }`} alt={movie?.name} />
                    )
                ))}
            </div>
        </div>
    )
}
