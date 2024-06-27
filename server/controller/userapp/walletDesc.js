const walletDescmodel = require("../../model/userapp/walletDesc");

class walletDisc {

  async addwalletDisc(req, res) {
    let { Discount, } = req.body;
      let add = new walletDescmodel({
        Discount
      });
      let save = add.save();
      if (save) {
        return res.json({ sucess: "added successfully" });
      }
    
  }

   
  async editwalletDisc(req, res) {
    let id = req.params.id;
    let { Discount } = req.body;

    let data = await walletDescmodel.findOneAndUpdate(
      { _id: id },
      { Discount }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }

  async getwalletDisc(req, res) {
    let walletDisc = await walletDescmodel.find({}).sort({ _id: -1 }).limit(1);
    if (walletDisc) {
      return res.json({ walletDisc: walletDisc });
    }
  }



  async deletewalletDisc(req, res) {
    let id = req.params.id;
    let data = await walletDescmodel.deleteOne({ _id: id });
    return res.json({ sucess: "Successfully deleted" });
  }
}

const walletDisccontroller = new walletDisc();
module.exports = walletDisccontroller;
