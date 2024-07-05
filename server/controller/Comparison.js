const ComparisonModal = require("../model/Comparison");

class Comparison {
  async postaddComparison(req, res) {
    let { image, title, category, discription } = req.body;

    try {
      let newComparison = new ComparisonModal({
        image,
        title,
        category,
        discription,
      });

      let save = newComparison.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateComparison(req, res) {
    try {
      const ComparisonId = req.params.ccid;
      const { image, title, category, discription } = req.body;

      const findComparison = await ComparisonModal.findOne({
        _id: ComparisonId,
      });
      if (!findComparison) {
        return res.json({ error: "No such record found" });
      }

      findComparison.image = image || findComparison.image;
      findComparison.category = category || findComparison.category;

      findComparison.discription = discription || findComparison.discription;
      findComparison.title = title || findComparison.title;
      const updateCategory = await ComparisonModal.findOneAndUpdate(
        { _id: ComparisonId },
        findComparison,
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

  async getallComparison(req, res) {
    let Comparison = await ComparisonModal.find({}).sort({ _id: -1 });

    if (Comparison) {
      return res.json({ data: Comparison });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeleteComparison(req, res) {
    let id = req.params.id;
    const data = await ComparisonModal.deleteOne({ _id: id });

    return res.json({ success: "Successfully", data: data });
  }
}

const ComparisonController = new Comparison();
module.exports = ComparisonController;
