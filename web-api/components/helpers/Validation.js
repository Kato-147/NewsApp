const ValidateProduct = (req,res,next) =>{
try {
    const {name, price, quantity} = req.body;
    if(!name) throw new Error('Tên sản phẩm không hợp lệ');
    //price, quantity phải là số dương
    if(isNaN(quantity)|| quantity<0 || !quantity) throw new Error('Số lượng sản phẩm không hợp lệ');
    if(!price || price<0) throw new Error('Giá sản phẩm không hợp lệ');
    next();
} catch (error) {
    console.log(error);
    return res.status(500).json({message: error.message});
}
}

module.exports={ValidateProduct}