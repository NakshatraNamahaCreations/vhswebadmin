const WhyChooseModal = require("../model/whychoose");

class WhyChoose {
  async postaddWhyChoose(req, res) {
    let { image, title, discription } = req.body;

    try {
      let newwhychoose = new WhyChooseModal({
        image,
        title,
        discription,
      });

      let save = newwhychoose.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateWhyChoose(req, res) {
    try {
      const whyChooseId = req.params.ccid;
      const { image, title, discription } = req.body;

      const findWhyChoose = await WhyChooseModal.findOne({
        _id: whyChooseId,
      });
      if (!findWhyChoose) {
        return res.json({ error: "No such record found" });
      }

      findWhyChoose.image = image || findWhyChoose.image;
      findWhyChoose.title = title || findWhyChoose.title;
      findWhyChoose.discription = discription || findWhyChoose.discription;
      const updateCategory = await WhyChooseModal.findOneAndUpdate(
        { _id: whyChooseId },
        findWhyChoose,
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

  async getallWhyChoose(req, res) {
    let whychoose = await WhyChooseModal.find({}).sort({ _id: -1 });

    if (whychoose) {
      return res.json({ data: whychoose });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeleteWhyChoose(req, res) {
    let id = req.params.id;
    const data = await WhyChooseModal.deleteOne({ _id: id });

    return res.json({ success: "Successfully", data: data });
  }
}

const WhyChooseController = new WhyChoose();
module.exports = WhyChooseController;
