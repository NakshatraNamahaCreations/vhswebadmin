const SpotlightSPmodel = require("../../model/userapp/spotLightsSp");

class spotlightSP {
  async postaddSpotlightSP(req, res) {
    let file = req.file.filename;
    const { service } = req.body;
    try {
      let newSpotlightSP = new SpotlightSPmodel({
        img: file,
        service:service
      });

      let save = newSpotlightSP.save();

      if (save) {
        return res.json({ success: "SpotlightSP added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getallSpotlightSP(req, res) {

    let SpotlightSP = await SpotlightSPmodel.find({ }).sort({_id:-1});

    if (SpotlightSP) {
      return res.json({ SpotlightSP: SpotlightSP });
    } else {
      return res.status(403).json({ error: "not able find SpotlightSP" });
    }
  }

  async postdeleteSpotlightSP(req, res) {
    let id = req.params.id;
    const data = await SpotlightSPmodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const SpotlightSPController = new spotlightSP();
module.exports = SpotlightSPController;
