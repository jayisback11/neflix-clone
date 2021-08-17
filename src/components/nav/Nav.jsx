import React, {useState, useEffect} from 'react'
import './nav.scss'
import {useHistory} from 'react-router-dom'
import {selectUser, selectCurrentPlan} from '../../features/userSlice'
import {useSelector} from 'react-redux'

export default function Nav() {
    const [show, setShow] = useState(false)
    const history = useHistory()
    const user = useSelector(selectUser)
    const currentPlan = useSelector(selectCurrentPlan)

    const transitionNavBar = () => {
        if(window.scrollY > 100){
            setShow(true)
        } else {
            setShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar)
        return () => window.removeEventListener('scroll', transitionNavBar)
    }, [])
    
    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <div className="nav__contents">
                    {currentPlan ? 
                        <img onClick={() => history.push('/')} className="nav__logo" src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" />
                    :
                        <img className="nav__logo" src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" />
                    }
                    <img onClick={() => history.push('./profile')} className="nav__avatar" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png" alt="" />
            </div> 

        </div>
    )
}
