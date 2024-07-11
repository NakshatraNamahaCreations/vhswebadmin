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
const category = require("./route/category");
const usubcat = require("./route/userapp/subcat");
const uresubcat = require("./route/userapp/resubcat");
const uservice = require("./route/userapp/serviceManament");
const offer = require("./route/offer");
const customer = require("./route/customer");
const webbanner = require("./route/websitebanner");
const thoughtfullcreation = require("./route/thoughtfullcreations");

const whychoose = require("./route/whychoose");
const Testimonial = require("./route/testimonial");
const webadmin = require("./route/websiteAdminLogin");
//user app
const userauth = require("./route/userapp/userauth");
const Howitworks = require("./route/HowItWorks");
const Certificate = require("./route/certificate");
const PopupBanner = require("./route/popupbanner");
const VHSPromises = require("./route/VhsPromises");
const Comparison = require("./route/Comparion");
const ViewDetails = require("./route/offernumbanner");
const Review = require("./route/Review");
const FAQ = require("./route/FAQ");
const PaintingBanner = require("./route/paintingbanner");

app.use("/api", category);
app.use("/api", customer);
app.use("/api/paintingbanner", PaintingBanner);
//user app
app.use("/api/userapp", userauth);
app.use("/api/userapp", uservice);
app.use("/api/userapp", usubcat);
app.use("/api/userapp", uresubcat);

//website
app.use("/api/website", webbanner);
app.use("/api/certificate", Certificate);
app.use("/api/pbanner", PopupBanner);
app.use("/api/vhspromise", VHSPromises);
app.use("/api/comparison", Comparison);
app.use("/api/review", Review);
app.use("/api/faq", FAQ);
app.use("/api/vbanner", ViewDetails);
// by hema

app.use("/api/creation", thoughtfullcreation);
app.use("/api/offer", offer);
app.use("/api/whychoose", whychoose);
app.use("/api/testimonial", Testimonial);
app.use("/api/webadmin", webadmin);
app.use("/api/howitwork", Howitworks);

const PORT = process.env.PORT || 8900;
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
