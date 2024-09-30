import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensures that category names are unique
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: "Category", // Allows for subcategories by referencing the Category model itself
        default: null
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt timestamps
});

// Adding pagination plugin
categorySchema.plugin(mongooseAggregatePaginate);

export const Category = mongoose.model("Category", categorySchema);