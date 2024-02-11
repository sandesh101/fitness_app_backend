// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const loggedFoodSchema = new Schema(
//   {
//     foods: [ 
//       {
//       name: {
//       type: String,
//       required: true,
//     },
//     calorieValue: {
//       type: Number,
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//     },
//     // Nutrients
//     carbs: {
//       type: Number,
//       required: true,
//     },
//     protein: {
//       type: Number,
//       required: true,
//     },
//     fat: {
//       type: Number,
//       required: true,
//     },
//     fibre: {
//       type: Number,
//       required: true,
//     },
//     iron: {
//       type: Number,
//       required: true,
//     },
//     calcium: {
//       type: Number,
//       required: true,
//     },
//     vitaminC: {
//       type: Number,
//       required: true,
//     },
//     mealTime: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   },
//    ]
//   }
// );

// export const LoggedFood = mongoose.model("LoggedFood", loggedFoodSchema);


// models/logFood.model.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const loggedFoodSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    logs: [
      {
        date: {
          type: Date,
          required: true
        },
        meals: [
          {
            mealTime: {
              type: String,
              required: true
            },
            foods: [
              {
                name: {
                  type: String,
                  required: true
                },
                calorieValue: {
                  type: Number,
                  required: true
                },
                quantity: {
                  type: Number,
                  required: true
                },
                // Nutrients
                carbs: {
                  type: Number,
                  required: true
                },
                protein: {
                  type: Number,
                  required: true
                },
                fat: {
                  type: Number,
                  required: true
                },
                fibre: {
                  type: Number,
                  required: true
                },
                iron: {
                  type: Number,
                  required: true
                },
                calcium: {
                  type: Number,
                  required: true
                },
                vitaminC: {
                  type: Number,
                  required: true
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    timestamps: true
  }
);

export const LoggedFood = mongoose.model("LoggedFood", loggedFoodSchema);
