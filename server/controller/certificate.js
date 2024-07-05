const CertificateModal = require("../model/certificate");

class Certificate {
  async postaddCertificate(req, res) {
    let { image, category } = req.body;

    try {
      let newCertificate = new CertificateModal({
        image,
        category,
      });

      let save = newCertificate.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateCertificate(req, res) {
    try {
      const CertificateId = req.params.ccid;
      const { image, category } = req.body;

      const findCertificate = await CertificateModal.findOne({
        _id: CertificateId,
      });
      if (!findCertificate) {
        return res.json({ error: "No such record found" });
      }

      findCertificate.image = image || findCertificate.image;
      findCertificate.category = category || findCertificate.category;

      const updateCategory = await CertificateModal.findOneAndUpdate(
        { _id: CertificateId },
        findCertificate,
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

  async getallCertificate(req, res) {
    let Certificate = await CertificateModal.find({}).sort({ _id: -1 });

    if (Certificate) {
      return res.json({ data: Certificate });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeleteCertificate(req, res) {
    let id = req.params.id;
    const data = await CertificateModal.deleteOne({ _id: id });

    return res.json({ success: "Successfully", data: data });
  }
}

const CertificateController = new Certificate();
module.exports = CertificateController;
