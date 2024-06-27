const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const cookieParser = require("cookie-parser");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log("=============MongoDb Database connected successfuly")
  )
  .catch((err) => console.log("Database Not connected !!!"));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));

// import routes
const admin = require("./route/adminlogin");
const technician = require("./route/master/technician");
const vendor = require("./route/master/vendor");
const category = require("./route/category");

const banner = require("./route/userapp/banner");

const cityrouter = require("./route/master/city");

const otp = require("./route/otp");

const servicedetails = require("./route/servicedetails");

const AddPaymentGetWay = require("./route/paymentgatway/payment");
const vendorEnquiry=require("./route/vendorEnquiry");



//user app
const userauth = require("./route/userapp/userauth");
const ubanner = require("./route/userapp/banner");
const uservice = require("./route/userapp/serviceManament");
const usubcat = require("./route/userapp/subcat");
const uresubcat = require("./route/userapp/resubcat");
const uvoucher = require("./route/userapp/voucher");
const usuperlogin = require("./route/userapp/superlogin");
const uofferbanner = require("./route/userapp/offerbanner");
const uspotlightbanner = require("./route/userapp/spotlight");
const uhomebanner = require("./route/userapp/homepagebanner");
const uhometitle = require("./route/userapp/homepagetiltle");
const uslots = require("./route/userapp/slots");
const walletDesc = require("./route/userapp/walletDesc");

const ufeq = require("./route/userapp/feq");
const addOnsRoute = require("./route/userapp/serviceAddons");
const numbersRoute = require("./route/userapp/whatsappNumber");
const paymentgateway = require("./route/paymentgatway/payment");
const sPayment = require("./route/paymentgatway/servicePayment");
const rating =require("./route/userapp/rating");
const webbanner = require("./route/websitebanner");
const exbanner =require("./route/userapp/exbanner");
const customer =require("./route/customer")
const enquiryadd = require("./route/enquiryadd");
const enquiryfollow = require("./route/enquiryfollowup");
const offerAnnouncement = require("./route/userapp/offerAnnouncement");
const SpotlightSP = require("./route/userapp/spotLightsSp");

const ReviewVideos = require("./route/userapp/ReviewVideos");
const sVideo = require("./route/userapp/sVideo");
const RateCard=require("./route/userapp/RateCard");
const training=require("./route/userapp/training");

const vendorNumber=require("./route/vendorNumber");
const wallet=require("./route/userapp/wallet");
const Vendorwallet=require("./route/Vendorwallet");

app.use("/api/vendor",Vendorwallet);
app.use("/api", vendorEnquiry);
app.use("/api", vendorNumber);
app.use("/api", admin);
app.use("/api", technician);
app.use("/api", category);
app.use("/api",customer)
app.use("/api", vendor);
app.use("/api", banner);
app.use("/api", enquiryadd);
app.use("/api",enquiryfollow);
app.use("/api/master", cityrouter);
app.use("/api",wallet);
app.use("/api",walletDesc);
app.use("/api", servicedetails);

app.use("/api", otp);
//user app
app.use("/api/userapp",userauth);
app.use("/api/userapp",ubanner);
app.use("/api/userapp",uservice);
app.use("/api/userapp",usubcat);
app.use("/api/userapp",uresubcat);
app.use("/api/userapp",uvoucher);
app.use("/api/super",usuperlogin);
app.use("/api/userapp",uofferbanner);
app.use("/api/userapp",uhomebanner);
app.use("/api/userapp",uhometitle);
app.use("/api/userapp",uspotlightbanner);
app.use("/api/userapp",uslots);
app.use("/api/userapp",ufeq);
app.use("/api/userapp",rating);
app.use("/api/userapp",exbanner);
app.use("/api/vendor",training);


app.use("/api/userapp", addOnsRoute);
app.use("/api/userapp", numbersRoute);

app.use("/api/payment", paymentgateway);
app.use("/api/payment/service",sPayment);

//website
app.use("/api/website",webbanner);
app.use("/api/payment", AddPaymentGetWay);

//new code

app.use("/api/userapp",offerAnnouncement);
app.use("/api/userapp",SpotlightSP);
app.use("/api/userapp",ReviewVideos);
app.use("/api/userapp",sVideo);
app.use("/api/userapp",RateCard)


// by hema
const thoughtfullcreation = require("./route/thoughtfullcreations");
const offer = require("./route/offer");
const whychoose = require("./route/whychoose");
const Testimonial = require("./route/testimonial");
const webadmin = require("./route/websiteAdminLogin")
app.use("/api/creation", thoughtfullcreation);
app.use("/api/offer", offer);
app.use("/api/whychoose", whychoose);
app.use("/api/testimonial", Testimonial);
app.use("/api/webadmin", webadmin);
const PORT = process.env.PORT || 8900;
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
