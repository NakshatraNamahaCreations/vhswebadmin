const offerAnnouncementmodel = require("../../model/userapp/offerAnnouncement");

class offerAnnouncementmodel1 {
  async postaddofferAnnouncement(req, res) {
    let file = req.file.filename;
    const { type } = req.body;
    try {
      let newofferAnnouncement = new offerAnnouncementmodel({
        img: file,
        type:type
      });

      let save = newofferAnnouncement.save();

      if (save) {
        return res.json({ success: "offerAnnouncement added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getallofferAnnouncement(req, res) {

    let offerAnnouncement = await offerAnnouncementmodel.find({ }).sort({_id:-1});

    if (offerAnnouncement) {
      return res.json({ offerAnnouncement: offerAnnouncement });
    } else {
      return res.status(403).json({ error: "not able find offerAnnouncement" });
    }
  }

  async postdeleteofferAnnouncement(req, res) {
    let id = req.params.id;
    const data = await offerAnnouncementmodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const offerAnnouncementController = new offerAnnouncementmodel1();
module.exports = offerAnnouncementController;


