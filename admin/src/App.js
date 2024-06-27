import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Component/Layout";
import Category from "./Component/Category";
import UserData from "./Component/User";
import SubCategory from "./Component/Subcategory";
import Banner from "./Component/Banner";
import TCreations from "./Component/TCreations";
import Services from "./Component/Services";
import Offer from "./Component/Offer";
import WhyChooseUs from "./Component/WhyChooseUs";
import Testimonials from "./Component/Testimonials";
import SubSubCategory from "./Component/sub_SubCategory";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/category"
          element={
            <Layout>
              <Category />
            </Layout>
          }
        />
        <Route
          path="/subcategory"
          element={
            <Layout>
              <SubCategory />
            </Layout>
          }
        />{" "}
        <Route
          path="/subsubcategory"
          element={
            <Layout>
              <SubSubCategory />
            </Layout>
          }
        />
        <Route
          path="/banner"
          element={
            <Layout>
              <Banner />
            </Layout>
          }
        />
        <Route
          path="/creations"
          element={
            <Layout>
              <TCreations />
            </Layout>
          }
        />
        <Route
          path="/services"
          element={
            <Layout>
              <Services />
            </Layout>
          }
        />
        <Route
          path="/offer"
          element={
            <Layout>
              <Offer />
            </Layout>
          }
        />
        <Route
          path="/whychoose"
          element={
            <Layout>
              <WhyChooseUs />
            </Layout>
          }
        />
        <Route
          path="/testimonails"
          element={
            <Layout>
              <Testimonials />
            </Layout>
          }
        />
        <Route
          path="/user"
          element={
            <Layout>
              <UserData />
            </Layout>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
