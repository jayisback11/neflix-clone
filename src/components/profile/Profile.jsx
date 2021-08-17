import React from 'react'
import Nav from '../nav/Nav'
import {selectUser, logout, selectCurrentPlan, currentPlan} from '../../features/userSlice'
import {useSelector, useDispatch} from 'react-redux'
import {auth} from '../../firebase'
import './profile.scss'
import PlanScreen from '../planScreen/PlanScreen'

function Profile() {
    const user = useSelector(selectUser)
    const currPlan = useSelector(selectCurrentPlan)
    const dispatch = useDispatch()

    const signout = () => {
        auth.signOut()
        dispatch(logout())
        dispatch(currentPlan(null))
    }
    return (
        <div className="profile">
            <Nav/>
            <div className="profile_container">
                <h1 className="profile_editprofile">Edit Profile</h1>
                <div className="profile_details">
                    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png" alt="" />
                    <div className="profile_contents">
                        <p className="profile_email">{user.email}</p>
                        <p className="profile_plans">Plans <span>{currPlan && `(Current Plan: ${currPlan.role})`}</span></p>
                        <PlanScreen />
                        <button className="profile_signout" onClick={signout}>Sign out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
