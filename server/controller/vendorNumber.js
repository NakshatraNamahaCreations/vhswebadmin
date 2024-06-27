const vendorNumberModel = require("../model/vendorNumber");

class numbers {
  async addvendorNumbers(req, res) {
    try {
      let { numbersCategory, whatsappNumber, phoneNumber,city } = req.body;
      let add = new vendorNumberModel({
        numbersCategory,
        whatsappNumber,
        phoneNumber,city
      });
      const data = await add.save();
      console.log(data);
      return res
        .status(200)
        .json({ success: "Number's added successfully", service: data });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while adding the Number's" });
    }
  }

  async getAllvendorNumbers(req, res) {
    let numbersData = await vendorNumberModel.find({}).sort({ _id: -1 });

    if (numbersData) {
      return res.json({ numbersData: numbersData });
    } else {
      return res.status(403).json({ error: "not able find Numbers" });
    }
  }

  
  async updatevendorNumbers(req, res) {
    try {
      const numberId = req.params.id;
      const { numbersCategory, whatsappNumber, phoneNumber } = req.body;

      const findNumbers = await vendorNumberModel.findOne({
        _id: numberId,
      });
      if (!findNumbers) {
        return res.json({ error: "No such record found" });
      }
      //
      findNumbers.numbersCategory =
        numbersCategory || findNumbers.numbersCategory;
      findNumbers.whatsappNumber = whatsappNumber || findNumbers.whatsappNumber;
      findNumbers.phoneNumber = phoneNumber || findNumbers.phoneNumber;
      const updateData = await vendorNumberModel.findOneAndUpdate(
        { _id: numberId },
        findNumbers,
        { new: true }
      );
      return res.json({
        message: "Updated successfully",
        date: updateData,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ error: "Unable to update the Numbers" });
    }
  }

  async deletevendorNumbers(req, res) {
    try {
      let id = req.params.id;
      const data = await vendorNumberModel.deleteOne({ _id: id });

      if (data.deletedCount === 1) {
        return res.status(200).json({ success: "Successfully deleted" });
      } else {
        return res.status(404).json({ error: "Item not found" });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting" });
    }
  }
}

const vendornumbersController = new numbers();
module.exports = vendornumbersController;