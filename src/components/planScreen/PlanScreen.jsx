import React, { useEffect, useState } from 'react'
import { db } from '../../firebase.js'
import './planScreen.scss'
import { selectUser, currentPlan } from '../../features/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import {loadStripe} from '@stripe/stripe-js'
import BeatLoader from "react-spinners/BeatLoader";

function PlanScreen() {
    const [products, setProducts] = useState([])
    const user = useSelector(selectUser)
    const [subscription, setSubscription] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(async (subscription) => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                })
                dispatch(currentPlan({
                    role: subscription.data().role,
                }))
            })
        })
        
    }, [user.id])

    useEffect(() => {
        db.collection('products')
        .where('active', "==", true)
        .get()
        .then(querySnapshot => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data()
                const priceSnap = await productDoc.ref.collection('prices').get()
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })
            })
        setProducts(products)
        })
    }, [])

    const loadCheckout = async (priceId) => {
        setLoading(true)
        const docRef = await db
        .collection('customers')
        .doc(user.uid)
        .collection('checkout_sessions')
        .add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin
        })

        docRef.onSnapshot(async(snap) => {
            const { error, sessionId } = snap.data()

            if(error){
                alert(`An error occured: ${error.message}`)
            }

            if(sessionId){
                const stripe = await loadStripe('pk_test_51JOwyJJcjrQ25FPaRaC7eQJ8Q0SwKrY5NBDEgHj6j1o8DRzYUVPi8ywWx6OymvJoYb6XpvXPV5Hlq2U25LvKlDLV00ZeSfV3w3')

                stripe.redirectToCheckout({sessionId})
                                setLoading(false)
            }
        })
    }

    return (
        <div className="planScreen">

            {subscription && (
                <h4>
                    Renewal Date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}
                </h4>
            )}

            {Object.entries(products).map(([productId, productData]) => {
                //check if user is subscribed
                const isCurrentPackage = productData.name?.includes(subscription?.role)
                return (
                    <div key={productId} className="planScreen_container">
                        <div className="planScreen_plan">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button  className={isCurrentPackage && 'planScreen_currentPackage'} onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                            {isCurrentPackage ? 'Current Package' : 'Subscribe'}
                        </button>
                    </div>
                )
            })}
            <div className="planScreen_loading">
                {loading && <BeatLoader color={'#ffffff'} loading={loading} size={50} />}
            </div>
        </div>
    )
}

export default PlanScreen
