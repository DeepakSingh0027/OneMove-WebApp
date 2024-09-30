import mongoose,{ Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const productSchema = new Schema({
    image:{
        type: String,//cloudinary url
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },      
    specifications:[{
        type: String,
        required: true
    }],
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity cannot be negative"]
    },      
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category"
    }
},{
    timestamps: true
})

productSchema.plugin(mongooseAggregatePaginate)

productSchema.pre('save', function(next) {
    if (this.quantity < 0) {
      throw new ApiError("Quantity cannot be negative");
    }
    next();
});


export const Product = mongoose.model("Product",productSchema)