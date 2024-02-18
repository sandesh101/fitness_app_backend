import { LoggedFood } from "../models/logFood.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const logFoodController = async (req, res) => {
  try {
    const {
      name,
      calorieValue,
      quantity,
      carbs,
      protein,
      fat,
      fibre,
      iron,
      calcium,
      vitaminC,
      mealTime,
    } = req.body;
    if (!name || !calorieValue || !quantity || !mealTime || !carbs || !protein || !fat || !fibre || !iron || !calcium || !vitaminC) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }



    const currentDate = new Date();
    const options = {
      hour12: true,
      timeZone: 'Asia/Kathmandu', // Nepal Standard Time (NST)
    };

    const loggedTime = currentDate.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', ...options });
    const loggedDate = currentDate.toISOString().slice(0, 10); // Extract YYYY-MM-DD


    // Creating the logged food
    const loggedFood = await LoggedFood.create({
      userId: req.user.id,
      date: currentDate,
      logs: [
        {
          name,
          calorieValue,
          quantity,
          carbs,
          protein,
          fat,
          fibre,
          iron,
          calcium,
          vitaminC,
          mealTime,
        }
      ],
    });

    // console.log(req.body);
    if (!loggedFood) {
      return res.status(400).json(new ApiResponse(400, "Some Error Occurred"));
    } else {
      return res.status(201).json(new ApiResponse(200, loggedFood, "Logged Successfully"));
    }
  }
  catch (e) {
    console.log(e);
    return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
};

const getLoggedFood = async (req, res) => {
  try {
    const userId = req.user.id;

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