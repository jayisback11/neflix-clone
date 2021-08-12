import React from 'react'
import './banner.scss'

export default function Banner() {
    const truncate = (string, n) =>{
        return string?.length > n ?  string.substring(0, n-1) + " ..." : string;
    }
    return (
        <header className="banner" style={{
            backgroundSize: "cover",
            backgroundImage: `url(https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABe8in7VbJ3banhIpwChLQfXefd3uwazbRLlUsZZFeghf39dtL-Io-Z3rmx-T2Q9UVECfKRygfVHsUpzHPQE1JO6ij5rz.jpg?r=792)`,
            backgroundPosition: "center center",
        }}>
            <div className="banner__contents">
                <h1 className="banner__title">Title</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__desc">
                    {truncate(`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, cupiditate officiis harum et explicabo repellendus amet voluptatem, libero molestias odit tempore aspernatur natus error facilis rerum aut, voluptas eveniet voluptatibus.
               `, 200)}    
                </h1>
            </div>

            <div className="banner__fadebottom"/>
        </header>
    )
}
