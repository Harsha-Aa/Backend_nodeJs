const Firm = require('../models/Firm')
const Vendor = require('../models/Vendor')
const multer = require('multer')

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

const addFirm = async(req,res) =>{
    try {
        const {firmName,area,category,region,offer} = req.body
        const image = req.file? req.file.filename: undefined
        const vendor =await Vendor.findById(req.vendorId)
         if(!vendor){
            res.status(404).json({message:"vendor not found"})
    }
    
        const firm = new Firm({
            firmName,area,category,region,offer,image,vendor: vendor._id
})
const savedFirm =await firm.save()
vendor.firm.push(savedFirm)
await vendor.save()

return res.status(200).json({message:'firm added successfully'})
    
    } catch (error) {
        console.error(error)
        res.status(200).json("internal server error")
    }
}

const deleteFirmById =async(req,res)=>{
  try{
      const firmId= req.params.firmId

      const deleteFirm= await Firm.findByIdAndDelete(firmId)

      if(!deleteFirm){
          return res.status(404).json({error: "No firm found"})
      }
  } catch(error){
    console.error(error)
    res.status(500).json({error:"internal server error"})
  }
}

module.exports={addFirm:[upload.single('image'),addFirm],deleteFirmById}