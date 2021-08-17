import React, { useEffect, useState } from 'react'
import { db } from '../../firebase.js'
import './planScreen.scss'

function PlanScreen() {
    const [products, setProducts] = useState([])

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

    const loadCheckout = async () => {
        const docRef = await db.collection(costumers).doc(user.uid)
    }

    return (
        <div className="planScreen">
            {Object.entries(products).map(([productId, productData]) => {
                //check if user is subscribed

                return (
                    <div key={productId} className="planScreen_container">
                        <div className="planScreen_plan">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => loadCheckout(productData.prices.priceId)}>Subcribe</button>
                    </div>
                )
            })}
        </div>
    )
}

export default PlanScreen
