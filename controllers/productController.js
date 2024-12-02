const Product = require('../models/Product')
const multer = require('multer');
const Firm = require('../models/Firm');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Save the uploaded files in the "uploads" folder
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      // Generate a unique name for the file (timestamp + original file extension)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

  const upload  = multer({storage:storage})

  const addProduct = async(req,res)=>{
    try{
      const{productName,price,category,bestseller,description} = req.body
    const image = req.file? req.file.filename: undefined

    const firmId = req.params.firmId
    const firm = await Firm.findById(firmId)

    if(!firm){
      return res.status(404).json({error:"no firm found"})
    }

    const product = new Product({
      productName,price,category,bestseller,description,image,firm: firm._id
})
const savedProduct=await product.save()
firm.products.push(savedProduct)
await firm.save()

return res.status(200).json({savedProduct})

} catch (error) {
  console.error(error)
  res.status(500).json("internal server error")
  }
}


const getProductByFirm = async(req,res)=>{
  try{
    const firmId = req.params.firmId
    const firm = await Firm.findById(firmId)
    if(!firm){
      return res.status(404).json({error:"No firm found"})
    }
    const restuarentName =firm.firmName
    const products = await Product.find({firm: firmId})
    res.status(200).json({restuarentName,products})
  }catch(error){
    console.log(error)
    res.status(500).json({error:"Internal server error"})

  }
}

const deleteProductById =async(req,res)=>{
  try{
      const productId= req.params.productId

      const deleteProduct = await Product.findByIdAndDelete(productId)

      if(!deleteProduct){
          return res.status(404).json({error: "No product found"})
      }
      res.status(200).json({message:"product deleted succesfully"})
  } catch(error){
    console.error(error)
    res.status(500).json({error:"internal server error"})
  }
}
module.exports={addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById}
  