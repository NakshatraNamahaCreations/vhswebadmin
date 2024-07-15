const PaintingBannermodel = require("../model/paintingbanner");

class PaintingBanner {
  async postAddNewPaintingBanner(req, res) {
    let { banner, category } = req.body;

    try {
      let newbanner = new PaintingBannermodel({
        banner,category
      });

      let save = newbanner.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getallPaintingBanner(req, res) {
    let banner = await PaintingBannermodel.find({}).sort({ _id: -1 });

    if (banner) {
      return res.json({ banner: banner });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeletePaintingBanner(req, res) {
    let id = req.params.id;
    const data = await PaintingBannermodel.deleteOne({ _id: id });

    return res.json({ data: data, success: "Successfully" });
  }
  async updatebanner(req, res) {
    try {
      const bannerId = req.params.ccid;
      const { banner, category } = req.body;

      const findBanner = await PaintingBannermodel.findOne({
        _id: bannerId,
      });
      if (!findBanner) {
        return res.json({ error: "No such record found" });
      }

      findBanner.banner = banner || findBanner.banner;
      findBanner.category = category || findBanner.category;
      const updateCategory = await PaintingBannermodel.findOneAndUpdate(
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

const PaintingBannerController = new PaintingBanner();
module.exports = PaintingBannerController;
