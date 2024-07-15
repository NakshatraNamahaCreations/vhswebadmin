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
          <FaRegUser
            className="col-md-1 text-center"
            style={{ color: "white" }}
          />
        ) : (
          <span className="col-md-2 text-center text-white"> {user.email}</span>
        )}
      </div>

      <div bg="light" className="row mt-3 p-2 m-auto">
        <Link
          className={`${
            location.pathname === "/user"
              ? "col-md-1 text-center active navlink-btn  p-1 me-2"
              : "col-md-1 text-center navlink-btn  p-1 me-2"
          }`}
          to="/user"
        >
          Users
        </Link>
        <Link
          className={`${
            location.pathname === "/banner"
              ? "col-md-2 text-center active navlink-btn  p-1 me-2"
              : "col-md-2 text-center navlink-btn  p-1 me-2"
          }`}
          to="/banner"
        >
          Website Top Banner
        </Link>
        <Link
          className={`${
            location.pathname === "/creations"
              ? "col-md-2 text-center active navlink-btn  p-1 me-2"
              : "col-md-2 text-center navlink-btn  p-1 me-2"
          }`}
          to="/creations"
        >
          Thoughtfull Creations
        </Link>
        <Link
          className={`${
            location.pathname === "/category"
              ? "col-md-1 text-center active navlink-btn  p-1 me-2"
              : "col-md-1 text-center navlink-btn  p-1 me-2"
          }`}
          to="/category"
        >
          Category
        </Link>
        <Link
          className={`${
            location.pathname === "/subcategory"
              ? "col-md-1 text-center active navlink-btn  p-1 me-2"
              : "col-md-1 text-center navlink-btn  p-1 me-2"
          }`}
          to="/subcategory"
        >
          Subcategory
        </Link>
        <Link
          className={`${
            location.pathname === "/subsubcategory"
              ? "col-md-2 text-center active navlink-btn  p-1 me-2"
              : "col-md-2 text-center navlink-btn  p-1 me-2"
          }`}
          to="/subsubcategory"
        >
          Subsubcategory
        </Link>
        <Link
          className={`${
            location.pathname === "/services"
              ? "col-md-1 text-center active navlink-btn  p-1 me-2"
              : "col-md-1 text-center navlink-btn  p-1 me-2"
          }`}
          to="/services"
        >
          Services
        </Link>
        <Link
          className={`${
            location.pathname === "/offer"
              ? "col-md-2 text-center active navlink-btn  p-1 me-2 mt-4"
              : "col-md-2 text-center navlink-btn  p-1 me-2 mt-4"
          }`}
          to="/offer"
        >
          Deal of the week
        </Link>

        <Link
          className={`${
            location.pathname === "/how-it-works"
              ? "col-md-2 text-center active navlink-btn mt-4 p-1 me-2"
              : "col-md-2 text-center navlink-btn mt-4 p-1 me-2"
          }`}
          to="/how-it-works"
        >
          How It Works
        </Link>
        <Link
          className={`${
            location.pathname === "/whychoose"
              ? "col-md-2 text-center active navlink-btn mt-4 p-1 me-2"
              : "col-md-2 text-center navlink-btn mt-4 p-1 me-2"
          }`}
          to="/whychoose"
        >
          Why Choose us
        </Link>
        <Link
          className={`${
            location.pathname === "/testimonails"
              ? "col-md-1 text-center active navlink-btn mt-4 p-1 me-2"
              : " col-md-1 text-center navlink-btn mt-4 p-1 me-2"
          }`}
          to="/testimonails"
        >
          Testimonials
        </Link>
        <Link
          className={`${
            location.pathname === "/certificate"
              ? "col-md-1 text-center active navlink-btn mt-4 p-1 me-2 mt-3"
              : "col-md-1 text-center navlink-btn mt-4 p-1 me-2"
          }`}
          to="/certificate"
        >
          Certificates
        </Link>

        <Link
          className={`${
            location.pathname === "/pop-up-banner"
              ? "col-md-2 text-center active navlink-btn mt-4 p-1 me-2 mt-3"
              : "col-md-2 text-center navlink-btn mt-4 p-1 me-2"
          }`}
          to="/pop-up-banner"
        >
          Pop-Up Banner
        </Link>
        <Link
          className={`${
            location.pathname === "/vhs-promises"
              ? "col-md-2 text-center active navlink-btn mt-4 p-1 me-2 mt-3"
              : "col-md-2 text-center navlink-btn mt-4 p-1 me-2"
          }`}
          to="/vhs-promises"
        >
          VHS Promises
        </Link>
        <Link
          className={`${
            location.pathname === "/comparison"
              ? "col-md-2 text-center active navlink-btn mt-4 p-1 me-2 mt-3"
              : "col-md-2 text-center navlink-btn mt-4 p-1 me-2"
          }`}
          to="/comparison"
        >
          Comparison
        </Link>

        <Link
          className={`${
            location.pathname === "/review"
              ? "col-md-2 text-center active navlink-btn mt-4 p-1 me-2 mt-3"
              : "col-md-2 text-center navlink-btn mt-4 p-1 me-2"
          }`}
          to="/review"
        >
          Review
        </Link>

        <Link
          className={`${
            location.pathname === "/faq"
              ? "col-md-2 text-center active navlink-btn mt-4 p-1 me-2 mt-3"
              : "col-md-2 text-center navlink-btn mt-4 p-1 me-2"
          }`}
          to="/faq"
        >
          FAQ
        </Link>
        <Link
          className={`${
            location.pathname === "/offer-number-banner"
              ? "col-md-2 text-center active navlink-btn mt-4 p-1 me-2 mt-3"
              : "col-md-2 text-center navlink-btn mt-4 p-1 me-2"
          }`}
          to="/offer-number-banner"
        >
          Offer Number Banner
        </Link>

        <Link
          className={`${
            location.pathname === "/painting-banner"
              ? "col-md-2 text-center active navlink-btn mt-4 p-1 me-2 mt-3"
              : "col-md-2 text-center navlink-btn mt-4 p-1 me-2"
          }`}
          to="/painting-banner"
        >
          Painting Banner
        </Link>
      </div>
    </>
  );
}
