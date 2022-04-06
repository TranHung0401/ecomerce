import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useParams, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addCart } from '../redux/action'

export default function Product() {
    const { id } = useParams()
    const dispatch = useDispatch()

    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const getProduct = async () => {
            setLoading(true)
            const response = await fetch(`https://fakestoreapi.com/products/${id}`)
            setProduct(await response.json())
            setLoading(false)
        }

        getProduct()

    }, [])

    const addProduct = (product) => {
        dispatch(addCart(product))
    }

    const Loading = () => {
        return (
            <>
                <div className="col-md-6">
                    <Skeleton height={400} />
                </div>
                <div className="col-md-6">
                    <Skeleton height={50} width={300} />
                    <Skeleton height={75} />
                    <Skeleton height={25} width={150} />
                    <Skeleton height={50} />
                    <Skeleton height={150} />
                    <Skeleton height={50} width={100} />
                    <Skeleton height={50} width={100} style={{ marginLeft: '6px' }} />
                </div>
            </>
        )
    }

    const ShowProduct = () => {
        return (
            <>
                <div className="col-md-6">
                    <img src={product.image} alt={product.title} width={400} height={400} />
                </div>

                <div className="col-md-6">
                    <h4 className='text-uppercase text-black-50'>{product.category}</h4>
                    <h1 className='display-5'>{product.title}</h1>
                    <p className="lead fw-bolder">
                        Rating {product.rating && product.rating.rate}
                        <i className="fa fa-star"></i>
                    </p>
                    <h3 className='display-6 fw-bolder my-4'>$ {product.price}</h3>
                    <p className="lead">{product.description}</p>
                    <button className="btn display-6 btn-outline-dark px-4 py-2" onClick={() => addProduct(product)}>ADD TO CART</button>
                    <NavLink to='/cart' className="btn display-6 btn-dark ms-2 px-3 py-2">GO TO CART</NavLink>
                </div>
            </>
        )
    }

    return (
        <div>
            <div className="container py-5">
                <div className="row py-4">
                    {loading ? <Loading /> : <ShowProduct />}
                </div>
            </div>
        </div>
    )
}
