const mongoose = require('mongoose')

const firmSchema = new mongoose.Schema({
    firmName:{
        type: String,
        require: true,
        unqiue : true
    },
    area:{
        type: String,
        require: true
    },
    category:{
        type:[
            {
                type:String,
                enum: ['veg','non-veg']
            }
        ]
    },
    region:{
        type:[
            {
                type:String,
                enum: ['south-indian','north-indian','chinese','bakery']
            }
        ]
    },
    offer:{
        type:String
    },
    image:{
        type:String
    },
    /*forming relation with vendor model by adding vendor property*/
    vendor:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Vendor'
        }
    ],

    /*forming relation with product model by adding product property*/
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]

})

const Firm = mongoose.model('Firm',firmSchema)
module.exports = Firm
