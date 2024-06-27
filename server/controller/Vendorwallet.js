const VendorwalletModel = require("../model/Vendorwallet");

class Vendorwallet {
  async AddVendorwalletamt(req, res) {
    let { userId, wAmt, desc, sName } = req.body;
    let add = new VendorwalletModel({
      userId,
      wAmt,
      desc,
      sName,
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "Added successfully" });
    }
  }

  async findwithuserId(req, res) {
    try {
      const userId = req.params.id;
      const data = await VendorwalletModel.find({ userId }).sort({ _id: -1 });
      if (data) {
        return res.json({ data: data });
      } else {
        return res.status(404).json({ error: "No data found" });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getVendorwalletData(req, res) {
    let Vendorwallet = await VendorwalletModel.find({}).sort({ _id: -1 });
    if (Vendorwallet) {
      return res.json({ Vendorwallet: Vendorwallet });
    }
  }

  async postdeleteVendorwallet(req, res) {
    let id = req.params.id;
    const data = await VendorwalletModel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const VendorwalletController = new Vendorwallet();
module.exports = VendorwalletController;
