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
import HowITWorks from "./Component/Howitwroks";
import Certificates from "./Component/Certificate";
import PopUpBanner from "./Component/PopupBanner";
import VHSPromises from "./Component/Promises";
import VHSComparison from "./Component/Comparison";
import Review from "./Component/Review";
import FAQ from "./Component/FAQ";

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
          path="/how-it-works"
          element={
            <Layout>
              <HowITWorks />
            </Layout>
          }
        />
        <Route
          path="/certificate"
          element={
            <Layout>
              <Certificates />
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
          path="/pop-up-banner"
          element={
            <Layout>
              <PopUpBanner />
            </Layout>
          }
        />
        <Route
          path="/vhs-promises"
          element={
            <Layout>
              <VHSPromises />
            </Layout>
          }
        />
        <Route
          path="/comparison"
          element={
            <Layout>
              <VHSComparison />
            </Layout>
          }
        />
        <Route
          path="/review"
          element={
            <Layout>
              <Review />
            </Layout>
          }
        />
        <Route
          path="/faq"
          element={
            <Layout>
              <FAQ />
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
