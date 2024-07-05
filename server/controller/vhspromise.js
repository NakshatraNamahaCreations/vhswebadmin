const VHSPromisesModal = require("../model/vhspromises");

class VHSPromises {
  async postaddVHSPromises(req, res) {
    let { image, title, category, discription } = req.body;

    try {
      let newVHSPromises = new VHSPromisesModal({
        image,
        title,
        category,
        discription,
      });

      let save = newVHSPromises.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateVHSPromises(req, res) {
    try {
      const VHSPromisesId = req.params.ccid;
      const { image, title, category, discription } = req.body;

      const findVHSPromises = await VHSPromisesModal.findOne({
        _id: VHSPromisesId,
      });
      if (!findVHSPromises) {
        return res.json({ error: "No such record found" });
      }

      findVHSPromises.image = image || findVHSPromises.image;
      findVHSPromises.category = category || findVHSPromises.category;

      findVHSPromises.discription = discription || findVHSPromises.discription;
      findVHSPromises.title = title || findVHSPromises.title;
      const updateCategory = await VHSPromisesModal.findOneAndUpdate(
        { _id: VHSPromisesId },
        findVHSPromises,
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

  async getallVHSPromises(req, res) {
    let VHSPromises = await VHSPromisesModal.find({}).sort({ _id: -1 });

    if (VHSPromises) {
      return res.json({ data: VHSPromises });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeleteVHSPromises(req, res) {
    let id = req.params.id;
    const data = await VHSPromisesModal.deleteOne({ _id: id });

    return res.json({ success: "Successfully", data: data });
  }
}

const VHSPromisesController = new VHSPromises();
module.exports = VHSPromisesController;
