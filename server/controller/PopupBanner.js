const PopUpBannerModal = require("../model/popupbanner");

class PopUpBanner {
  async postaddPopUpBanner(req, res) {
    let { image, category } = req.body;

    try {
      let newPopUpBanner = new PopUpBannerModal({
        image,
        category,
      });

      let save = newPopUpBanner.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updatePopUpBanner(req, res) {
    try {
      const PopUpBannerId = req.params.ccid;
      const { image, category } = req.body;

      const findPopUpBanner = await PopUpBannerModal.findOne({
        _id: PopUpBannerId,
      });
      if (!findPopUpBanner) {
        return res.json({ error: "No such record found" });
      }

      findPopUpBanner.image = image || findPopUpBanner.image;
      findPopUpBanner.category = category || findPopUpBanner.category;

      const updateCategory = await PopUpBannerModal.findOneAndUpdate(
        { _id: PopUpBannerId },
        findPopUpBanner,
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

  async getallPopUpBanner(req, res) {
    let PopUpBanner = await PopUpBannerModal.find({}).sort({ _id: -1 });

    if (PopUpBanner) {
      return res.json({ data: PopUpBanner });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeletePopUpBanner(req, res) {
    let id = req.params.id;
    const data = await PopUpBannerModal.deleteOne({ _id: id });

    return res.json({ success: "Successfully", data: data });
  }
}

const PopUpBannerController = new PopUpBanner();
module.exports = PopUpBannerController;
