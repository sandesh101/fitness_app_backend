import mongoose from "mongoose";
const { Schema } = mongoose;

const loggedFoodSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      // required: true
    },
    calorieValue: {
      type: Number,
      // required: true
    },
    quantity: {
      type: Number,
      // required: true
    },
    // Nutrients
    carbs: {
      type: Number,
    },
    protein: {
      type: Number,
    },
    fat: {
      type: Number,
    },
    fibre: {
      type: Number,
    },
    iron: {
      type: Number,
    },
    calcium: {
      type: Number,
    },
    vitaminC: {
      type: Number,
    },
    mealTime: {
      type: String,
      // required: true
    },
  },
  {
    timestamps: true,
  }
);

export const LoggedFood = mongoose.model("LoggedFood", loggedFoodSchema);
