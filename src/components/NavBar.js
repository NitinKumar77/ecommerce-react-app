import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../Redux/slices/CartSlice";
export default function NavBar(props) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart.data);
  const query = useSelector((state) => state.cart.query);
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  const onSearchHandler = () => {
    if (query.trim().length === 0) {
      return;
    }
    let updatedList = data.filter((e) => {
      const title = e.title;

      return title.toLowerCase().includes(query);
    });

    dispatch(cartActions.setData(updatedList));
  };
  const total = useSelector((state) => state.cart.totalQuantity);
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary py-3 shadow-sm"
      data-bs-theme="dark"
    >
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          Sasta Bazzar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <form
            onSubmit={onSubmitHandler}
            className="d-flex mx-4"
            role="search"
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) =>
                dispatch(cartActions.searchQuery(e.target.value.toLowerCase()))
              }
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={onSearchHandler}
            >
              Search
            </button>
          </form>
          <div className="buttons mx-4">
            <Link to="/cart" className=" btn btn-outline-light ms-2">
              <i className="fa fa-shopping-cart fw-bold "></i> Cart(
              {total})
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
