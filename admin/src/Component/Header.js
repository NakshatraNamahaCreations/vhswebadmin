import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

export default function Header() {
  let location = useLocation();
  let user = JSON.parse(localStorage.getItem("userdata"));
  return (
    <>
      <div className="row m-auto heading-bg p-3">
        <a className="col-md-3 text-bold navtext me-auto" href="/user">
          Home
        </a>
        {!user ? (
          <FaRegUser className="col-md-1" style={{ color: "white" }} />
        ) : (
          <span className="col-md-2 text-white"> {user.email}</span>
        )}
      </div>
      <Navbar bg="light" className="p-2" data-bs-theme="light">
        <Nav className="me-auto p-2">
          <Link
            className={`${
              location.pathname === "/user"
                ? "active navlink-btn p-1 me-2"
                : "navlink-btn p-1 me-2"
            }`}
            to="/"
          >
            Users
          </Link>
          <Link
            className={`${
              location.pathname === "/banner"
                ? "active navlink-btn p-1 me-2"
                : "navlink-btn p-1 me-2"
            }`}
            to="/banner"
          >
            Website Top Banner
          </Link>
          <Link
            className={`${
              location.pathname === "/creations"
                ? "active navlink-btn p-1 me-2"
                : "navlink-btn p-1 me-2"
            }`}
            to="/creations"
          >
            Thoughtfull Creations
          </Link>
          <Link
            className={`${
              location.pathname === "/category"
                ? "active navlink-btn p-1 me-2"
                : "navlink-btn p-1 me-2"
            }`}
            to="/category"
          >
            Category
          </Link>
          <Link
            className={`${
              location.pathname === "/subcategory"
                ? "active navlink-btn p-1 me-2"
                : "navlink-btn p-1 me-2"
            }`}
            to="/subcategory"
          >
            Subcategory
          </Link>
          <Link
            className={`${
              location.pathname === "/subsubcategory"
                ? "active navlink-btn p-1 me-2"
                : "navlink-btn p-1 me-2"
            }`}
            to="/subsubcategory"
          >
            Subsubcategory
          </Link>
          <Link
            className={`${
              location.pathname === "/services"
                ? "active navlink-btn p-1 me-2"
                : "navlink-btn p-1 me-2"
            }`}
            to="/services"
          >
            Services
          </Link>
          <Link
            className={`${
              location.pathname === "/offer"
                ? "active navlink-btn p-1 me-2"
                : "navlink-btn p-1 me-2"
            }`}
            to="/offer"
          >
            Offer
          </Link>
          <Link
            className={`${
              location.pathname === "/whychoose"
                ? "active navlink-btn p-1 me-2"
                : "navlink-btn p-1 me-2"
            }`}
            to="/whychoose"
          >
            Why Choose us
          </Link>
          <Link
            className={`${
              location.pathname === "/testimonails"
                ? "active navlink-btn p-1 me-2"
                : "navlink-btn p-1 me-2"
            }`}
            to="/testimonails"
          >
            Testimonials
          </Link>
        </Nav>
      </Navbar>
    </>
  );
}
