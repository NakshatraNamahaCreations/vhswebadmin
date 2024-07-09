const OfferNumberModal = require("../model/offernumbanner");

class OfferNumberBanner {
  async postAddNewoffernumbanner(req, res) {
    let { offerNumbanner } = req.body;

    try {
      let newbanner = new OfferNumberModal({
        offerNumbanner,
      });

      let save = newbanner.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getalloffernumbanner(req, res) {
    let banner = await OfferNumberModal.find({}).sort({ _id: -1 });

    if (banner) {
      return res.json({ banner: banner });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeleteoffernumbanner(req, res) {
    let id = req.params.id;
    const data = await OfferNumberModal.deleteOne({ _id: id });

    return res.json({ data: data, success: "Successfully" });
  }
  async updatebanner(req, res) {
    try {
      const bannerId = req.params.ccid;
      const { offerNumbanner } = req.body;

      const findBanner = await OfferNumberModal.findOne({
        _id: bannerId,
      });
      if (!findBanner) {
        return res.json({ error: "No such record found" });
      }

      findBanner.offerNumbanner = offerNumbanner || findBanner.offerNumbanner;

      const updateCategory = await OfferNumberModal.findOneAndUpdate(
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
}

const OfferNumberBannerController = new OfferNumberBanner();
module.exports = OfferNumberBannerController;
