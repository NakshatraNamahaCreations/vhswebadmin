const RateCardmodel = require("../../model/userapp/RateCard");

class RateCard {
  
  async addRateCard(req, res) {
    let { city,desc,header,} = req.body;


    let add = new RateCardmodel({
      desc,
      city,
      header
     
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "Added successfully" });
    }
  }

  





  async getRateCard(req, res) {
    let RateCard = await RateCardmodel.find({}).sort({ _id: -1 });
    if (RateCard) {
      return res.json({ RateCard: RateCard });
    }
  }




  async postdeleteRateCard(req, res) {
    let id = req.params.id;
    const data = await RateCardmodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const RateCardController = new RateCard();
module.exports = RateCardController;
