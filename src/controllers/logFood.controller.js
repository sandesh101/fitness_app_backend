import { LoggedFood } from "../models/logFood.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const logFoodController = async (req, res) => {
  try {
    const { mealTime, ...foodData } = req.body;

    // Check if mealTime is provided and is one of the allowed values
    if (!mealTime || !['Breakfast', 'Snacks', 'Lunch', 'Dinner'].includes(mealTime)) {
      return res.status(400).json({ error: 'Invalid or missing meal time' });
    }

    // Check if food data fields are present and have valid values
    const requiredFields = ['name', 'calorieValue', 'quantity', 'carbs', 'protein', 'fat', 'fibre', 'iron', 'calcium', 'vitaminC'];
    for (const field of requiredFields) {
      if (!(field in foodData) || !foodData[field]) {
        return res.status(400).json({ error: `Missing or invalid value for field: ${field}` });
      }
    }

    const loggedFood = await LoggedFood.create({ mealTime, foodData });

    if (!loggedFood) {
      return res.status(400).json(new ApiResponse(400, "Some Error Occurred"));
    } else {
      return res.status(201).json(new ApiResponse(200, loggedFood, "Logged Successfully"));
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getLoggedFood = async (req, res) => {
  try {
    const userId = req.user._id;

    const loggedFoodDetails = await LoggedFood.find({ userId });

    if (!loggedFoodDetails) {
      return res.status(400).json(new ApiResponse(400, "Error Getting Data"));
    } else {
      return res.status(200).json(new ApiResponse(200, loggedFoodDetails, "Success"));
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
};

export { logFoodController, getLoggedFood };
