const webCreationsmodel = require("../model/creations");

class weBbanner {
  async postaddcreations(req, res) {
    let { category, creationslink } = req.body;

    try {
      let newcreations = new webCreationsmodel({
        category,
        creationslink,
      });

      let save = newcreations.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updatecreation(req, res) {
    try {
      const creationsId = req.params.ccid;
      const { category, creationslink } = req.body;

      const findBanner = await webCreationsmodel.findOne({
        _id: creationsId,
      });
      if (!findBanner) {
        return res.json({ error: "No such record found" });
      }
      findBanner.category = category || findBanner.category;
      findBanner.creationslink = creationslink || findBanner.creationslink;

      const updateCategory = await webCreationsmodel.findOneAndUpdate(
        { _id: creationsId },
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

  async getallcreations(req, res) {
    let Tcreation = await webCreationsmodel.find({}).sort({ _id: -1 });

    if (Tcreation) {
      return res.json({ creation: Tcreation });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeletecreations(req, res) {
    let id = req.params.id;
    const data = await webCreationsmodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully",data:data });
  }
}

const weBbannerController = new weBbanner();
module.exports = weBbannerController;
