import React from "react";
import logo from "./lo.jpg";
import Product from "./Product";
export default function Home() {
	return (
		<div className="Hero">
			<div className="card text-bg-dark text-white border-0">
				<img
					src={logo}
					className="card-img"
					alt="Background"
					height={"550px"}
				/>
				<div className="card-img-overlay d-flex flex-column justify-column-center">
					<div className="container">
						<h5 className="card-title display-3 fw-bolder mb-0">
							New Season Arrivals
						</h5>
						<p className="card-text lead fs-2">Check Out Latest Trends</p>
					</div>
				</div>
			</div>
			<Product />
		</div>
	);
}
