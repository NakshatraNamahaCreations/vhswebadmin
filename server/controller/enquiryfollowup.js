const enquiryfollowupModel = require("../model/enquiryfollowup");
const moment = require("moment");
class addenquiry {


  async getallagreedata(req, res) {
    try {
      const { category, date } = req.body;
      // console.log("cat date", category, date);
      let data = await enquiryfollowupModel.aggregate([
        {
          $match: {
            nxtfoll: date,
            category,
          },
        },
        {
          $lookup: {
            from: "enquiryadds",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "enquirydata",
          },
        },
        {
          $lookup: {
            from: "treatments",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "treatmentData",
          },
        },
      ]);

      const latestRecords = {};

      data.forEach((item) => {
        const { EnquiryId, createdAt } = item;
        if (
          !latestRecords[EnquiryId] ||
          createdAt > latestRecords[EnquiryId].createdAt
        ) {
          latestRecords[EnquiryId] = item;
        }
      });

      const latestSurveyData = Object.values(latestRecords).filter(
        (item) => item.response === "Survey"
      );

      if (latestSurveyData.length > 0) {
        return res.json({ enquiryfollowup: latestSurveyData });
      } else {
        return res.json({ error: "Something went wrong" });
      }
    } catch (error) {
      // console.log("error---", error.message);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }


  
}
const enquiryfollowupcontroller = new addenquiry();
module.exports = enquiryfollowupcontroller;
