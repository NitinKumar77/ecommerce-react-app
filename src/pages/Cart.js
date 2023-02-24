import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../Redux/slices/CartSlice";

export default function Cart() {
	const cartProducts = useSelector((state) => state.cart.items);
	const totalAmount = useSelector((state) => state.cart.totalAmount);
	const dispatch = useDispatch();
	const onRemoveHandler = (id) => {
		dispatch(cartActions.removeFromCart(id));
	};
	const homeNavigation = useNavigate();

	const onAddHandler = (item) => {
		dispatch(cartActions.addToCart(item));
	};

	const CartItems = () => {
		return (
			<>
				{cartProducts.map((itemobject) => {
					const item = itemobject.item;
					return (
						<div
							className=" bg-body-tertiary col-md-3 mb-4"
							key={item.id}
						>
							<div className="card" style={{ width: "18rem" }}>
								<img
									src={item.image}
									className="card-img-top"
									alt="..."
								/>
								<div className="card-body">
									<h5 className="card-title">{item.title}</h5>

									<p className="card-text fw-bold fs-2 ">
										$ {item.price}
										{"   "}
									</p>
									<p className="card-text fw-bold fs-4 align ">
										<span className="badge text-bg-dark">
											X{item.amount}
										</span>

										{"   "}
									</p>
									<button
										onClick={() => onRemoveHandler(item.id)}
										className="btn fw-bold mx-2 py-2 btn-primary"
									>
										-
									</button>
									<button
										onClick={() => onAddHandler(itemobject)}
										className="btn fw-bold mx-2 py-2 btn-primary"
									>
										+
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</>
		);
	};

	return (
		<>
			<div className=" container-fluid  shadow-lg p-3 mb-5 bg-body-dark row justify-content-center m-5">
				<CartItems />
				<div className="container fluid text-center shadow-lg p-3 mb-5 bg-body-dark rounded w-50 h-25 py-3 my-3">
					<p className="fw-bold display-6 text-md-center fst-italic align-content-center">
						{" "}
						Total Amount : ${totalAmount.toFixed(2)}
					</p>
					<button
						type="button"
						className="btn btn-outline-dark w-25 h-25"
						onClick={() => homeNavigation("/")}
					>
						Go Home
					</button>
				</div>
			</div>
		</>
	);
}
