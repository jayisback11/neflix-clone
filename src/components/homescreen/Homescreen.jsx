import React from 'react'
import Nav from '../nav/Nav'
import Banner from '../banner/Banner'
import Row from '../row/Row'

import request from '../axios/request'


export default function Homescreen() {
    return (
        <div className="homescreen">
            <Nav />
        
            <Banner />

            <Row title="NETFLIX ORIGINALS" fetchURL={request.fetchNetflixOriginals} isLargeRow={true}/>
            <Row title="Trending Now" fetchURL={request.fetchTrending}/>
            <Row title="Top Rated" fetchURL={request.fetchTopRated}/>
            <Row title="Action Movies" fetchURL={request.fetchActionMovies}/>
            <Row title="Comedy Movie" fetchURL={request.fetchComedyMovies}/>
            <Row title="Horror Movies" fetchURL={request.fetchHorrorMovies}/>
            <Row title="Romance Movies" fetchURL={request.fetchRomanceMovies}/>
            <Row title="Documentaries" fetchURL={request.fetchDocumentaries}/>
            
        </div>
    )
}
