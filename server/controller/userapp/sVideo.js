const serviceVideoModal = require("../../model/userapp/sVideo");

class servcieVideos {
  async addServiceVideo(req, res) {
    let { categoryName, serviceName } = req.body;
    let file = req.file?.filename;
    // console.log(" req.file", req.file);
    let add = new serviceVideoModal({
      categoryName,
      serviceName,
      serviceVideo: file,
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "serviceName name added successfully" });
    }
  }
  //edit user

  async editServiceVideo(req, res) {
    const serviceId = req.params.id;
    const { categoryName,serviceName } = req.body;
    const file = req.files?.filename;
    // Decode file names
    const decodedFile = file ? decodeURIComponent(file) : null;
    const findService = await serviceVideoModal.findOne({
      _id: serviceId,
    });
    if (!findService) {
      return res.send("no data found");
    }
    findService.serviceName = serviceName || findService.serviceName;
    findService.categoryName = categoryName || findService.categoryName;

    if (req.files) {
      if (
        decodedFile &&
        (req.files.mimetype.startsWith("image/") ||
          req.files.mimetype === "application/octet-stream" ||
          req.files.mimetype === "image/jpeg")
      ) {
        findService.serviceVideo = decodedFile;
      }
      if (decodedFile && req.files.mimetype === "video/mp4") {
        findService.serviceVideo = decodedFile;
      }
    } 

    let updatedData = await serviceVideoModal.findOneAndUpdate(
      { _id: findService },
      findService,
      { new: true }
    );
    if (updatedData) {
      return res.json({ success: "Updated", data: updatedData });
    } else {
      return res.send("failed");
    }
  }

  async getServiceVideo(req, res) {
    let serviceName = await serviceVideoModal.find({});
    if (serviceName) {
      return res.json({ serviceName: serviceName });
    }
  }

  async postServiceVideo(req, res) {
    let { category } = req.body;
    // console.log(category);

    let findCategory = await serviceVideoModal.find({ category });

    if (findCategory) {
      return res.json({ categoryName: findCategory });
    }
  }

  async deleteServiceVideo(req, res) {
    let id = req.params.id;
    let data = await serviceVideoModal.deleteOne({ _id: id });
    return res.json({ sucess: "Successfully deleted" });
  }
}

const ServiceVideoController = new servcieVideos();
module.exports = ServiceVideoController;
