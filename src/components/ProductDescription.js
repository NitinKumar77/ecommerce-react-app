import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cartActions } from "../Redux/slices/CartSlice";
export default function ProductDescription() {
	const GotoCart = useNavigate();
	const [product, setProduct] = useState([]);
	const [loading, setLoading] = useState(false);
	const { id } = useParams();
	const dispatch = useDispatch();
	const addToCartHandler = (item) => {
		dispatch(cartActions.addToCart({ item }));
	};
	useEffect(() => {
		const getProduct = async () => {
			setLoading(true);
			const response = await fetch(
				`https://fakestoreapi.com/products/${id}`
			);
			const data = await response.json();
			setProduct(data);
			setLoading(false);
		};
		getProduct();
	}, [id]);
	const Loading = () => {
		return (
			<>
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</>
		);
	};

	const ShowProduct = () => {
		return (
			<>
				<div className="col-md-6">
					<img
						src={product.image}
						alt={product.title}
						height={"400px"}
						width={"400px"}
					/>
				</div>

				<div className="col-md-6">
					<h4 className=" text-uppercase text-black-50 ">
						{product.category}
					</h4>
					<h1 className=" display-5">{product.title}</h1>
					<p className=" lead fw-bold">
						{product.rating && product.rating.rate}
					</p>
					<p className="lead fst-italic ">{product.description}</p>
					<i className=" fa fa-star"></i>
					<h3 className="display-6 fw-bold my-4">${product.price}</h3>
					<button
						className=" btn btn-outline-dark mx-1 my-2 py-2 px-2  "
						onClick={() => addToCartHandler(product)}
					>
						Add to Cart{" "}
					</button>
					<button
						className=" btn btn-outline-dark mx-1 my-2 py-2 px-2  "
						onClick={() => {
							GotoCart("/cart");
						}}
					>
						{" "}
						Go to Cart
					</button>
				</div>
			</>
		);
	};

	return (
		<div className="container py-4">
			<div className="row py-4">
				{loading ? <Loading /> : <ShowProduct />}
			</div>
		</div>
	);
}
