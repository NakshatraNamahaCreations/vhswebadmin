const moment = require("moment");
const VendorEnquiryModel = require("../model/vendorEnquiry");

class vendorEnquiry {
  async Addvendorenquiry(req, res) {
    try {
      let {
        date,
        name,
        Time,
        email,
        mobile,
        address,
        category,
        reference1,
        type,
        city,
        comment,
      } = req.body;


      const latestCustomer = await VendorEnquiryModel
        .findOne()
        .sort({ EnquiryId: -1 })
        .exec();
      const latestEquiry = latestCustomer ? latestCustomer.EnquiryId : 0;
      const newEquiry = latestEquiry + 1;

      const newVendor = new VendorEnquiryModel({
        EnquiryId: newEquiry,
        date,
        name,
        Time,
        email,
        mobile,
        address,
        category,
        reference1,
        type,
        city,
        comment,


      });
      newVendor.save().then((data) => {
        return res
          .status(200)
          .json({ Success: "Account created. Please login", data: newVendor });
      });
    } catch (error) {
      console.error("Error enquiry add:", error);
    }
  }



  async updatevendor(req, res) {
    let id = req.params.id;

    let newData = await VendorEnquiryModel.findOneAndUpdate(
      { _id: id },
      {
        type: "updated"
      }, { new: true }
    );
    if (newData) {
      return res.status(200).json({ Success: "Added" });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }










  //Get all
  async getallvendorenquiry(req, res) {

    let data = await VendorEnquiryModel.find({}).sort({ _id: -1 });
    if (data) {
      return res.status(200).json({ Vendorenquiry: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  //Delete
  async deleteenquiryadd(req, res) {
    let id = req.params.id;
    const data = await VendorEnquiryModel.deleteOne({ _id: id });
    return res.json({ success: "Delete Successf" });
  }


}
const VenodrEnquirycontroller = new vendorEnquiry();
module.exports = VenodrEnquirycontroller;
