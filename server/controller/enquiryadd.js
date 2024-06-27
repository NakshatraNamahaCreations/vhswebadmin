const moment = require("moment");
const enquiryaddmodel = require("../model/enquiryadd");

class addenquiry {
  async Addenquiry(req, res) {
    try {
      let {
        date,
        executive,
        name,
        Time,
        email,
        mobile,
        contact2,
        address,
        category,
        reference1,
        reference2,
        city,
        // reference3,
        comment,
        intrestedfor,
        serviceID,
        responseType,
        deliveryAddress,
        Area,
        company,
        brancharea,
        // counter,
      } = req.body;
      const reference3 = req.query.reference3 || "";

      const latestCustomer = await enquiryaddmodel
        .findOne()
        .sort({ EnquiryId: -1 })
        .exec();
      const latestEquiry = latestCustomer ? latestCustomer.EnquiryId : 0;
      const newEquiry = latestEquiry + 1;

      const newVendor = new enquiryaddmodel({
        EnquiryId: newEquiry,
        date,
        executive,
        name,
        Time,
        email,
        mobile,
        contact2,
        address,
        category,
        reference1,
        reference2,
        city,
        reference3,
        comment,
        intrestedfor,
        serviceID, //05-10
        responseType,
        deliveryAddress,
        Area,
        company,
        brancharea,
      });
      newVendor.save().then((data) => {
        return res
          .status(200)
          .json({ Success: "Account created. Please login", data: newVendor });
      });
    } catch (error) {
      console.error("Error enquiry add:", error);
    }
  }

  async Addjdenquiry(req, res) {
    try {
      let {
        date,
        executive,
        name,
        Time,
        email,
        mobile,
        contact2,
        address,
        category,

        reference2,
        city,
        // reference3,
        comment,
        intrestedfor,
        serviceID,
        responseType,
        deliveryAddress,
        Area,
        company,
        brancharea,
        // counter,
      } = req.body;
      const reference1 = req.query.reference1 || "";

      const latestCustomer = await enquiryaddmodel
        .findOne()
        .sort({ EnquiryId: -1 })
        .exec();
      const latestEquiry = latestCustomer ? latestCustomer.EnquiryId : 0;
      const newEquiry = latestEquiry + 1;

      const newVendor = new enquiryaddmodel({
        EnquiryId: newEquiry,
        date,
        executive,
        name,
        Time,
        email,
        mobile,
        contact2,
        address,

        reference1,
        reference2,
        city,

        comment,
        intrestedfor: category,
        serviceID, //05-10
        responseType,
        deliveryAddress,
        Area,
        company,
        brancharea,
      });
      newVendor.save().then((data) => {
        return res
          .status(200)
          .json({ Success: "Account created. Please login", data: newVendor });
      });
    } catch (error) {
      console.error("Error enquiry add:", error);
    }
  }
  //edit
  async editenquiry(req, res) {
    let id = req.params.id;

    let {
      enquiryid,
      date,
      executive,
      name,
      Time,
      email,
      mobile,
      contact2,
      address,
      category,
      reference1,
      reference2,
      city,
      reference3,
      comment,
      intrestedfor,
      serviceID, //05-10
      responseType,
    } = req.body;
    let data = await enquiryaddmodel.findOneAndUpdate(
      { _id: id },
      {
        enquiryid,
        date,
        executive,
        name,
        Time,
        email,
        mobile,
        contact2,
        address,
        category,
        reference1,
        reference2,
        city,
        reference3,
        comment,
        intrestedfor,
        serviceID, //05-10
        responseType,
      }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }

  async updatequote(req, res) {
    let id = req.params.id;
    let { projecttype, qamt, bookedby } = req.body;
    let newData = await enquiryaddmodel.findOneAndUpdate(
      { _id: id },
      {
        projecttype,
        qamt,
        bookedby,
      }
    );
    if (newData) {
      return res.status(200).json({ Success: "Added" });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async postsubcategory(req, res) {
    let { category } = req.body;
    let data = await enquiryaddmodel.find({ category }).sort({ _id: -1 });

    if (data) {
      return res.json({ enquiryadd: data });
    } else {
      return res.json({ error: "something went wrong" });
    }
  }

  async getallagreegate(req, res) {
    let quote = await enquiryaddmodel.aggregate([
      {
        $lookup: {
          from: "quotes",
          localField: "EnquiryId",
          foreignField: "EnquiryId",
          as: "quotedata",
        },
      },
      {
        $lookup: {
          from: "treatments",
          localField: "EnquiryId",
          foreignField: "EnquiryId",
          as: "treatmentdetails",
        },
      },
      {
        $lookup: {
          from: "quotefollowups",
          localField: "EnquiryId",
          foreignField: "EnquiryId",
          as: "quotefollowup",
        },
      },
    ]);
    if (quote) {
      return res.json({ enquiryadd: quote });
    }
  }

  async getEnquiryAndAggregate(req, res) {
    try {
      let EnquiryId = req.params.id;

      let aggregatedData = await enquiryaddmodel.aggregate([
        {
          $match: { EnquiryId: EnquiryId }, // Match the EnquiryId obtained from the enquiry
        },
        {
          $lookup: {
            from: "quotes",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "quotedata",
          },
        },
        {
          $lookup: {
            from: "treatments",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "treatmentdetails",
          },
        },
        {
          $lookup: {
            from: "quotefollowups",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "quotefollowup",
          },
        },
      ]);

      return res.json({ enquiryadd: aggregatedData });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getallnewfollow(req, res) {
    try {
      let result = await enquiryaddmodel.aggregate([
        {
          $lookup: {
            from: "enquiryfollowups",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "enquiryFollow",
          },
        },
        {
          $match: {
            enquiryFollow: { $eq: [] },
          },
        },
      ]);

      if (result) {
        return res.json({ enquiryadd: result });
      }
    } catch (error) {
      console.error("Error in getallnewfollow:", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async findWithEnquiryID(req, res) {
    try {
      let EnquiryId = req.params.id;

      const data = await enquiryaddmodel
        .find({ EnquiryId })
        .sort({ _id: -1 })
        .exec();

      if (data && data.length > 0) {
        return res.status(200).json({ enquiryadd: data });
      } else {
        return res.json({ enquiryadd: [] });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  //Get all
  async getallenquiryadd(req, res) {
    let data = await enquiryaddmodel.find({}).sort({ _id: -1 });
    if (data) {
      return res.status(200).json({ enquiryadd: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getLatestEnquiryAdd(req, res) {
    try {
      let data = await enquiryaddmodel.findOne({}).sort({ _id: -1 }).limit(1);

      if (data) {
        return res.status(200).json({ enquiryadd: data });
      } else {
        return res.status(404).json({ error: "No data found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getenquiryfilter(req, res) {
    try {
      const {
        name,
        city,
        fromdate,
        todate,
        executive,
        contact,
        status,
        category,
        serviceName,
        reference1,
        reference2,
      } = req.body;
  
      const formattedFromDate = moment(fromdate, "YYYY-MM-DD").format("MM-DD-YYYY");
      const formattedToDate = todate
        ? moment(todate, "YYYY-MM-DD").format("MM-DD-YYYY")
        : moment().format("MM-DD-YYYY");
  
      const filter = {
        name: name ? { $regex: new RegExp(name, "i") } : undefined,
        city: city || undefined,
        date: fromdate && todate ? { $gte: formattedFromDate, $lte: formattedToDate } : undefined,
        executive: executive ? { $regex: new RegExp(executive, "i") } : undefined,
        mobile: contact ? { $regex: new RegExp(contact, "i") } : undefined,
        status: status || undefined,
        reference1: reference1 || undefined,
        reference2: reference2 || undefined,
        category: category || undefined,
        intrestedfor: serviceName || undefined,
      };
  
      // Remove undefined properties from the filter
      const cleanedFilter = Object.fromEntries(Object.entries(filter).filter(([_, v]) => v !== undefined));
  
      const data = await enquiryaddmodel.aggregate([
        {
          $lookup: {
            from: "enquiryfollowups",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "enquiryFollow",
          },
        },
        {
          $match: cleanedFilter,
        },
        { $sort: { _id: -1 } },
      ]);
  
      if (data && data.length > 0) {
        return res.status(200).json({ enquiryadd: data });
      } else {
        return res.status(404).json({ error: "No data found" });
      }
    } catch (error) {
      console.error("Error in getallenquiryadd:", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  //Get all
  async getallenquiryid(req, res) {
    let { id } = req.body;
    let data = await enquiryaddmodel.find({ EnquiryId: id });
    if (data) {
      return res.status(200).json({ enquiryadd: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  //Delete
  async deleteenquiryadd(req, res) {
    let id = req.params.id;
    const data = await enquiryaddmodel.deleteOne({ _id: id });
    return res.json({ success: "Delete Successf" });
  }
  async getallenquiryadd12(req, res) {
    let data = await enquiryaddmodel.find({}).sort({_id:-1});
    
    const filteringTodaysData = data.filter(
      (item) =>
        moment(item.date).format("DD-MM-YYYY") ===
        moment(new Date()).format("DD-MM-YYYY")
    );
  
    if (data) {
      return res.status(200).json({ enquiryadd: filteringTodaysData });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}
const enquiryaddcontroller = new addenquiry();
module.exports = enquiryaddcontroller;
