const adminloginmodel = require("../../model/websiteruser/auth");

class adminlogin {
  async signup(req, res) {
    let { email, createpassword, confirmpassword } = req.body;
    try {
      if (!email || !createpassword || !confirmpassword) {
        return res.status(500).json({ error: "fill all the fields" });
      } else if (createpassword !== confirmpassword) {
        return res.status(500).json({ error: "password mismatch" });
      } else {
        let admin = new adminloginmodel({
          email,
          createpassword,
          confirmpassword,
        });
        let save = admin.save();
        if (save) {
          return res.json({ success: "Account created" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async postSignin(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await adminloginmodel.findOne({ email });
    //   console.log(data, "data");
      if (!data) {
        return res.status(400).json({
          error: "Invalid Email",
        });
      } else if (data.createpassword !== password) {
        return res.status(400).json({
          error: "Invalid Password",
        });
      } else {
        data.status = "online";
        await data.save();
        return res.status(200).json({
          success: "Login Success",
          user: {
            email: data.email,
            id: data._id,
          },
        });
      }
    } catch (err) {
    //   console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

const adminlogincontroller = new adminlogin();
module.exports = adminlogincontroller;
