const ViewBannermodel = require("../model/viewbanner");

class ViewBanner {
  async postAddNewViewBanner(req, res) {
    let { category, ViewBanner } = req.body;

    try {
      let newbanner = new ViewBannermodel({
        category,
        ViewBanner,
      });

      let save = newbanner.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getallViewBanner(req, res) {
    let banner = await ViewBannermodel.find({}).sort({ _id: -1 });

    if (banner) {
      return res.json({ banner: banner });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeleteViewBanner(req, res) {
    let id = req.params.id;
    const data = await ViewBannermodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
  async updatebanner(req, res) {
    try {
      const bannerId = req.params.ccid;
      const { category, ViewBanner } = req.body;

      const findBanner = await ViewBannermodel.findOne({
        _id: bannerId,
      });
      if (!findBanner) {
        return res.json({ error: "No such record found" });
      }

      findBanner.category = category || findBanner.category;
      findBanner.ViewBanner = ViewBanner || findBanner.ViewBanner;

      const updateCategory = await ViewBannermodel.findOneAndUpdate(
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

const ViewBannerController = new ViewBanner();
module.exports = ViewBannerController;
