const HowItWorkModal = require("../model/Howitworks");

class HowItworks {
  async postaddHowItworks(req, res) {
    let { image, title, discription } = req.body;

    try {
      let newHowItworks = new HowItWorkModal({
        image,
        title,
        discription,
      });

      let save = newHowItworks.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateHowItworks(req, res) {
    try {
      const HowItworksId = req.params.ccid;
      const { image, title, discription } = req.body;

      const findHowItworks = await HowItWorkModal.findOne({
        _id: HowItworksId,
      });
      if (!findHowItworks) {
        return res.json({ error: "No such record found" });
      }

      findHowItworks.image = image || findHowItworks.image;
      findHowItworks.title = title || findHowItworks.title;
      findHowItworks.discription = discription || findHowItworks.discription;
      const updateCategory = await HowItWorkModal.findOneAndUpdate(
        { _id: HowItworksId },
        findHowItworks,
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

  async getallHowItworks(req, res) {
    let HowItworks = await HowItWorkModal.find({}).sort({ _id: -1 });

    if (HowItworks) {
      return res.json({ data: HowItworks });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeleteHowItworks(req, res) {
    let id = req.params.id;
    const data = await HowItWorkModal.deleteOne({ _id: id });

    return res.json({ success: "Successfully", data: data });
  }
}

const HowItworksController = new HowItworks();
module.exports = HowItworksController;
