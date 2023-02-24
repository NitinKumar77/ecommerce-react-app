import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { cartActions } from "../Redux/slices/CartSlice";
let componentMounted = true;
export default function Product() {
  const data = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (componentMounted === true) {
        const datalist = await response.clone().json();
        dispatch(cartActions.setData(datalist));
        setFilter(await response.json());
        setLoading(false);
      }
    };
    getProducts();
    return () => {};
  }, [dispatch]);

  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);

  const Loading = () => {
    return (
      <>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </>
    );
  };

  const filterProduct = (category) => {
    let updatedList = filter.filter((e) => e.category === category);

    dispatch(cartActions.setData(updatedList));
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5  pb-5">
          <button
            type="button"
            className="btn btn-outline-dark me-2"
            onClick={() => dispatch(cartActions.setData(filter))}
          >
            ALL
          </button>
          <button
            type="button"
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men 's Clothing
          </button>
          <button
            type="button"
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women 's Clothing
          </button>
          <button
            type="button"
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelry
          </button>
          <button
            type="button"
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronic
          </button>
        </div>
        {data.map((product) => {
          return (
            <div className="col-md-3 mb-4 " key={product.id}>
              <div className="card h-100 text-center p-4">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  height="250px"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.price}</p>
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-outline-dark"
                  >
                    Buy Now
                  </Link>
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
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
          <div className="row justify-content-center">
            {loading ? <Loading /> : <ShowProducts />}
          </div>
        </div>
      </div>
    </>
  );
}
