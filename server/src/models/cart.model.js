import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true // Ensures that each cart item is tied to a product
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true // The buyer (user) who added the product to the cart
    },
    quantity: {
        type: Number,
        default: 1,
        min: [1, "Quantity cannot be less than 1"] // Ensures that at least 1 item is added
    },
    addedAt: {
        type: Date,
        default: Date.now // Automatically records when the product was added to the cart
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Adding pagination plugin
cartSchema.plugin(mongooseAggregatePaginate);

// Exporting the Cart model
export const Cart = mongoose.model("Cart", cartSchema);
