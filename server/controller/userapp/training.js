const trainingCenterModel = require("../../model/userapp/training");

class trainingCenter {
  async addtrainingCenter(req, res) {
    try {
      let {  category, header, desc, videolink} = req.body;

      let file = req.file?.filename;
  

      let add = new trainingCenterModel({
        category,header,desc,videolink,trainingVideo:file
  
      });
      let save = add.save();
      if (save) {
        return res.json({ sucess: "Added successfully" });
      } 
    } catch (error) {
      console.log("hema---",error)
    }
  
  }


  async edittrainingCenter(req, res) {
    const subcategoryId = req.params.id;
    let {  category, header, desc,videolink } = req.body;

    const file = req.files.filename;
   

  

    const findCategory = await trainingCenterModel.findOne({
      _id: subcategoryId,
    });
    // console.log("findcategotu",findCategory)
    if (!findCategory) {
      return res.send("no data found");
    }
    findCategory.category = category || findCategory.category;

    findCategory.header = header || findCategory.header;
 
    findCategory.desc = desc || findCategory.desc;
    findCategory.videolink = videolink || findCategory.videolink;
    

   

    let updatedData = await trainingCenterModel.findOneAndUpdate(
      { _id: subcategoryId },
      findCategory,
      { new: true }
    );
    if (updatedData) {
      return res.json({ success: "Updated", data: updatedData });
    } else {
      return res.send("failed");
    }
  }

  async gettrainingCenter(req, res) {
    let trainingCenter = await trainingCenterModel.find({});
    if (trainingCenter) {
      return res.json({ trainingCenter: trainingCenter });
    }
  }

  async posttrainingCenter(req, res) {
    let { category } = req.body;
  

    let trainingCenter = await trainingCenterModel.find({ category });

    if (trainingCenter) {
      return res.json({ trainingCenter: trainingCenter });
    }
  }

  async deletetrainingCenter(req, res) {
    let id = req.params.id;
    let data = await trainingCenterModel.deleteOne({ _id: id });
    return res.json({ sucess: "Successfully deleted" });
  }
}

const trainingCentercontroller = new trainingCenter();
module.exports = trainingCentercontroller;
