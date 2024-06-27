const webOffermodel = require("../model/offer");

class Offer {
  async postaddOffer(req, res) {
    let { category, offer } = req.body;

    try {
      let newbanner = new webOffermodel({
        category,
        offer,
      });

      let save = newbanner.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateOffer(req, res) {
    try {
      const bannerId = req.params.ccid;
      const { category, offer } = req.body;

      const findBanner = await webOffermodel.findOne({
        _id: bannerId,
      });
      if (!findBanner) {
        return res.json({ error: "No such record found" });
      }

      findBanner.category = category || findBanner.category;
      findBanner.offer = offer || findBanner.offer;

      const updateCategory = await webOffermodel.findOneAndUpdate(
        { _id: bannerId },
        findBanner,
        { new: true }
      );
      return res.json({
        message: "Updated successfully",
        date: updateCategory,
      });
    } catch (error) {
      // console.log("error", error);
      return res.status(500).json({ error: "Unable to update the Category" });
    }
  }

  async getallOffer(req, res) {
    let offer = await webOffermodel.find({}).sort({ _id: -1 });

    if (offer) {
      return res.json({ offer: offer });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeleteOffer(req, res) {
    let id = req.params.id;
    const data = await webOffermodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully", data: data });
  }
}

const OfferController = new Offer();
module.exports = OfferController;
