const ReviewVideosmodel = require("../../model/userapp/ReviewVideos");

class ReviewVideos {
  async postaddReviewVideos(req, res) {

    let {Subcategory,Links}=req.body;

    try {
      let newbanner = new ReviewVideosmodel({
        Links: Links,
        Subcategory:Subcategory
      });

      let save = newbanner.save();

      if (save) {
        return res.json({ success: "Added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getallReviewVideos(req, res) {

    let banner = await ReviewVideosmodel.find({ }).sort({_id:-1});

    if (banner) {
      return res.json({ ReviewVideos: banner });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeleteReviewVideos(req, res) {
    let id = req.params.id;
    const data = await ReviewVideosmodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const ReviewVideosController = new ReviewVideos();
module.exports = ReviewVideosController;
