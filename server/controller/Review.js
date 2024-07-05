const ReviewModal = require("../model/Review");

class Review {
  async postaddReview(req, res) {
    let { image, title, category, discription } = req.body;

    try {
      let newReview = new ReviewModal({
        image,
        title,
        category,
        discription,
      });

      let save = newReview.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateReview(req, res) {
    try {
      const ReviewId = req.params.ccid;
      const { image, title, category, discription } = req.body;

      const findReview = await ReviewModal.findOne({
        _id: ReviewId,
      });
      if (!findReview) {
        return res.json({ error: "No such record found" });
      }

      findReview.image = image || findReview.image;
      findReview.category = category || findReview.category;

      findReview.discription = discription || findReview.discription;
      findReview.title = title || findReview.title;
      const updateCategory = await ReviewModal.findOneAndUpdate(
        { _id: ReviewId },
        findReview,
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

  async getallReview(req, res) {
    let Review = await ReviewModal.find({}).sort({ _id: -1 });

    if (Review) {
      return res.json({ data: Review });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeleteReview(req, res) {
    let id = req.params.id;
    const data = await ReviewModal.deleteOne({ _id: id });

    return res.json({ success: "Successfully", data: data });
  }
}

const ReviewController = new Review();
module.exports = ReviewController;
