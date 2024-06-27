const servicedetailsmodel = require("../model/servicedetails");

class servicedetails {
  async getbookingservicepagewise(req, res) {
    
    try {
     
      const page = parseInt(req.query.page) || 1;
      const pageSize = 10;
      const skip = (page - 1) * pageSize;
      const searchQuery = req.query.search || "";

      // Initial filter for type === "userapp"
      const filter = { type: { $in: ["userapp", "website"] } };

      if (searchQuery) {
        // Simplified search conditions
        filter.$or = [
          {
            "customerData.customerName": { $regex: searchQuery, $options: "i" },
          },
          { category: { $regex: searchQuery, $options: "i" } },
          { service: { $regex: searchQuery, $options: "i" } },
          { city: { $regex: searchQuery, $options: "i" } },
        ];
      }
      const totalRecords = await servicedetailsmodel.countDocuments(filter);
      // Corrected index creation for _id field
      servicedetailsmodel.collection.createIndex({ _id: 2 });

      // Projection for excluding unnecessary fields
      const projection = { customerData: 1, category: 1, service: 1, city: 1 };

      // Use lean for plain JavaScript objects instead of Mongoose documents
      const service = await servicedetailsmodel
        .find(filter, projection)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(pageSize)
        .select(
          "customerData category service city deliveryAddress serviceCharge paymentMode dividedDates  date time GrandTotal"
        ) // Include only necessary fields
        .lean();

      console.timeEnd("API Execution Time");

      // console.log("service---",service)
      if (service.length > 0) {
        const responseData = { service, totalRecords, currentPage: page };
        return res.status(200).json(responseData);
      } else {
        return res.status(404).json({ message: "No services found." });
      }
    } catch (error) {
      console.error("Error in API:", error);
      return res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }
  }

  async getbookingservicelength(req, res) {
    try {
      // Initial filter for type === "userapp"
      const filter = { type: { $in: ["userapp", "website"] } };

      const totalRecords = await servicedetailsmodel.countDocuments(filter);

      if (totalRecords) {
        const responseData = { totalRecords };
        return res.status(200).json(responseData);
      } else {
        return res.status(404).json({ message: "No services found." });
      }
    } catch (error) {
      console.error("Error in API:", error);
      return res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }
  }

  async getuserappbookings(req, res) {
    try {
      const userId = req.params.id;

      let data = await servicedetailsmodel.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "addcalls",
            localField: "_id",
            foreignField: "serviceId",
            as: "dsrdata",
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ]);

      // if (servicedetails) {
      return res.status(200).json({ runningdata: data });
      // }
    } catch (error) {
      // console.log("checkinbg error:", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

}

const servicedetailscontroller = new servicedetails();
module.exports = servicedetailscontroller;
