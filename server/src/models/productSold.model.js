import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const productSoldSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    buyer:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    quantity: {
        type: Number,
        default: 1,
        min: [1, 'Quantity cannot be less than 1']
    },
    address:{
        type: String,
        required: true,
    }
},{
    timestamps: true
})

productSoldSchema.plugin(mongooseAggregatePaginate)


export const ProductSold = mongoose.model("ProductSold", productSoldSchema)