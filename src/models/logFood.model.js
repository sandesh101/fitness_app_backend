import mongoose from "mongoose";
const { Schema } = mongoose;

const loggedFoodSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    mealTime: {
      type: String,
      required: true,
      enum: ['Breakfast', 'Snacks', 'Lunch', 'Dinner']
    },
    foodData: [
      {
        name: {
          type: String,
          required: true,
        },
        calorieValue: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        carbs: {
          type: Number,
          required: true,
        },
        protein: {
          type: Number,
          required: true,
        },
        fat: {
          type: Number,
          required: true,
        },
        fibre: {
          type: Number,
          required: true,
        },
        iron: {
          type: Number,
          required: true,
        },
        calcium: {
          type: Number,
          required: true,
        },
        vitaminC: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const LoggedFood = mongoose.model("LoggedFood", loggedFoodSchema);
