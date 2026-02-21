const getFinalPrice = require('../logistics/finalPrice.logistics');
exports.getUsage = async (req, res, next) => {
    try{
        const priceToPay = await getFinalPrice.getFinalPrice();
        return res.json({priceToPay})
    }catch(err){
        next(err)
    }
} 