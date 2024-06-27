const walletModel = require("../../model/userapp/wallet");

class wallet {

    async AddWalletamt(req, res) {
        let { userId, wAmt,desc , sName} = req.body;
        let add = new walletModel({
            userId,
            wAmt,
            desc,
            sName
        });
        let save = add.save();
        if (save) {
            return res.json({ sucess: "Added successfully" });
        }
    }


    async findwithuserId(req, res) {
        try {
            const userId = req.params.id;
            const data = await walletModel.findOne({ userId });    
            if (data) {
                return res.json({ data : data});
            } else {
                return res.status(404).json({ error: "No data found" });
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }



    async getwalletData(req, res) {
        let wallet = await walletModel.find({}).sort({ _id: -1 });
        if (wallet) {
            return res.json({ wallet: wallet });
        }
    }

    async postdeletewallet(req, res) {
        let id = req.params.id;
        const data = await walletModel.deleteOne({ _id: id });

        return res.json({ success: "Successfully" });
    }
    
}



const walletController = new wallet();
module.exports = walletController;
