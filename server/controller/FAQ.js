const FAQModal = require("../model/FAQ");

class FAQ {
  async postaddFAQ(req, res) {
    let { image, title, category, discription } = req.body;

    try {
      let newFAQ = new FAQModal({
        image,
        title,
        category,
        discription,
      });

      let save = newFAQ.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateFAQ(req, res) {
    try {
      const FAQId = req.params.ccid;
      const { image, title, category, discription } = req.body;

      const findFAQ = await FAQModal.findOne({
        _id: FAQId,
      });
      if (!findFAQ) {
        return res.json({ error: "No such record found" });
      }

      findFAQ.image = image || findFAQ.image;
      findFAQ.category = category || findFAQ.category;

      findFAQ.discription = discription || findFAQ.discription;
      findFAQ.title = title || findFAQ.title;
      const updateCategory = await FAQModal.findOneAndUpdate(
        { _id: FAQId },
        findFAQ,
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

  async getallFAQ(req, res) {
    let FAQ = await FAQModal.find({}).sort({ _id: -1 });

    if (FAQ) {
      return res.json({ data: FAQ });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeleteFAQ(req, res) {
    let id = req.params.id;
    const data = await FAQModal.deleteOne({ _id: id });

    return res.json({ success: "Successfully", data: data });
  }
}

const FAQController = new FAQ();
module.exports = FAQController;
