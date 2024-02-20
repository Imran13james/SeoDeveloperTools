const BuyerForm = require("../db/sechma");

exports.createBuyerForm = async (req, res) => {
    try {
        const { email, userName, eightDigitCodeRandom,sellerUserName, totalAccountTypeAvailable, totalAccountIdAvailable } = req.body;
        const buyerForm = new BuyerForm({
            userInfo: {
                email,
                userName,
            },
            sellerUserName,
            totalAccountTypeAvailable,
            totalAccountIdAvailable,
            eightDigitCodeRandom
        });
        await buyerForm.save();
        res.status(200).json({ success: true, message: 'BuyerForm created successfully!',data:buyerForm});
    } catch (error) {
        console.error('Error creating BuyerForm:', error);
        res.status(500).json({ success: false, error: 'Failed to create BuyerForm. Please try again later.' });
    }
};
exports.getAllBuyerForms = async (req, res) => {
    try {
        const buyerForms = await BuyerForm.find();
        res.status(200).json(buyerForms);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching BuyerForms' });
    }
};
exports.getBuyerFormByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const buyerForm = await BuyerForm.findOne({ 'userInfo.email': email });
        if (!buyerForm) {
            return res.status(404).json({ message: 'BuyerForm not found' });
        }
        res.status(200).json(buyerForm);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching BuyerForm' });
    }
};

exports.deleteBuyerFormByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const deletedForm = await BuyerForm.findOneAndDelete({ 'userInfo.email': email });
        if (!deletedForm) {
            return res.status(404).json({ message: 'BuyerForm not found' });
        }
        res.status(200).json({ message: 'BuyerForm deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting BuyerForm' });
    }
};
exports.deleteBuyerFormByCode = async (req, res) => {
    const { eightDigitCode } = req.params;
    try {
        const deletedForm = await BuyerForm.findOneAndDelete({ eightDigitCode });
        if (!deletedForm) {
            return res.status(404).json({ message: 'BuyerForm not found' });
        }
        res.status(200).json({ message: 'BuyerForm deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting BuyerForm' });
    }
};
exports.deleteBuyerForm = async (req, res) => {
    const { email, accountId } = req.body;
    try {
      const deletedBuyerForm = await BuyerForm.findOneAndDelete({
        $or: [
          { 'userInfo.email': email },
          { 'accountDetails.accountId': accountId }
        ]
      });
  
      if (!deletedBuyerForm) {
        return res.status(404).json({
          success: false,
          message: 'No seller form found with the provided email or account ID.'
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Seller form successfully deleted!',
        data: deletedBuyerForm
      });
    } catch (error) {
      console.error('Error deleting seller form:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete seller form. Please try again.',
        error: error.message
      });
    }
  };