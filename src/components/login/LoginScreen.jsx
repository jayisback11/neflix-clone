import React, { useState, useEffect, useRef} from 'react'
import './loginScreen.scss'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {db, auth} from '../../firebase'

function LoginScreen() {
    const [signIn, setSignIn] = useState(false)
    const [showLogoAndSignIn, setShowLogoAndSignIn] = useState(true)

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const register = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
        .catch(error => alert(error))
    }

    const signin = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
        .catch(error => alert(error))
    }

    const showHandler = () => {
        if(window.scrollY > 100){
            setShowLogoAndSignIn(false)
        } else {
            setShowLogoAndSignIn(true)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', showHandler)
        return window.removeEventListener('scroll', showHandler)
    }, [])

    return (
        <div className="loginscreen">
            <div className="loginscreen_first_slide">
                <div className={`loginscreen_top ${!showLogoAndSignIn && 'hide_logo_and_signin'}`}>
                        <img className="loginscreen_netflix_logo" src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" />
                        <button className="loginscreen_signInButton" onClick={() => setSignIn(true)}>Sign In</button>
                </div>
                    {
                      signIn ?  (
                          <div className="signin_container">
                            <div className="signIn">
                                <h1>Sign in</h1>
                                <input ref={emailRef} type="email" placeholder="Email address"/>
                                <input ref={passwordRef} type="password" placeholder="Password"/>
                                <button type="submit" onClick={signin}>Sign In</button>
                                <div className="signIn_remember_help">
                                    <p>Remember Me</p>
                                    <a href="">Need help?</a>
                                </div>
                                <div className="signin_footer">
                                    <div className="signIn_social">
                                        <p>Login with Facebook</p>
                                    </div>
                                    <p className="loginscreen_newToNetflix">New to Netflix? <span onClick={register} className="loginscreen_signupnow">Sign up now.</span></p>
                                    <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className="loginscreen_learnmore">Learn more.</span></p>
                                </div>
                            </div>
                          </div>
                      ):
                        (
                            <div className="loginscreen_welcome">
                                <h1>
                                    Unlimited movies, TV shows, and more.
                                </h1>
                                <h2>
                                    Watch anywhere. Cancel anytime.
                                </h2>
                                <h3>
                                    Ready to watch? Enter your email to create or restart your membership.
                                </h3>
                                <form>
                                    <input type="email" placeholder="Email address"/>
                                    <button type="submit" onClick={() => setSignIn(true)}>
                                        GET STARTED
                                        <ChevronRightIcon className="right_arrow_icon"/>
                                    </button>
                                </form>
                            </div>
                        )
                    }
                <div className="loginscreen_body"/>
            </div>
            <div className="loginscreen_enjoy">
                    <div className="enjoy_text">
                        <h1>Enjoy on your TV.</h1>
                        <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                    </div>
                    <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" alt="" />
            </div>
            <div className="loginscreen_download">
                    <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" alt="" />
                    <div className="enjoy_text">
                        <h1>Download your shows to watch offline.</h1>
                        <p>Save your favorites easily and always have something to watch.</p>
                    </div>
            </div>
            <div className="loginscreen_watch_everywhere">
                    <div className="enjoy_text">
                        <h1>Watch everywhere.</h1>
                        <p>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.</p>
                    </div>
                    <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png" alt="" />
            </div>
            <div className="loginscreen_profile_for_kids">
                    <img src="https://occ-0-1144-114.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABdFTpLmANuJpYneLq8L5m7CunMCi8e8Nl4y7xaPVWzG3IeoDoq17egTQAthApKg_4sdRWdwuR8KadWu1frjL3JQImpwq.png?r=fcd" alt="" />
                    <div className="enjoy_text">
                        <h1>Create profiles for kids.</h1>
                        <p>Send kids on adventures with their favorite characters in a space made just for them free with your membership.</p>
                    </div>
            </div>
        </div>
    )
}

export default LoginScreen
