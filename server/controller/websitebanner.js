const webBannermodel = require("../model/websitebanner");

class weBbanner {
  async postaddwebbanner(req, res) {
    let file = req.file?.filename;

    try {
      let newbanner = new webBannermodel({
        banner: file,
      });

      let save = newbanner.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async postAddNewWebbanner(req, res) {
    let { category, webbanner } = req.body;

    try {
      let newbanner = new webBannermodel({
        category,
        webbanner,
      });

      let save = newbanner.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getallwebbanner(req, res) {
    let banner = await webBannermodel.find({}).sort({ _id: -1 });

    if (banner) {
      return res.json({ banner: banner });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeletewebbanner(req, res) {
    let id = req.params.id;
    const data = await webBannermodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
  async updatebanner(req, res) {
    try {
      const bannerId = req.params.ccid;
      const { banner, category, webbanner } = req.body;

      const findBanner = await webBannermodel.findOne({
        _id: bannerId,
      });
      if (!findBanner) {
        return res.json({ error: "No such record found" });
      }

      findBanner.banner = banner || findBanner.banner;
      findBanner.category = category || findBanner.category;
      findBanner.webbanner = webbanner || findBanner.webbanner;

      const updateCategory = await webBannermodel.findOneAndUpdate(
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

const weBbannerController = new weBbanner();
module.exports = weBbannerController;
