// import { LoggedFood } from "../models/logFood.model.js";
// import { ApiResponse } from "../utils/ApiResponse.js";

// const logFoodController = async (req, res) => {
//   try {
//     const {
//       name,
//       calorieValue,
//       quantity,
//       carbs,
//       protein,
//       fat,
//       fibre,
//       iron,
//       calcium,
//       vitaminC,
//       mealTime,
//     } = req.body;
//     // if (!name || !calorieValue || !quantity || !mealTime || !carbs || !protein || !fat || !fibre || !iron || !calcium || !vitaminC) {
//     //   return res.status(400).json({
//     //     message: "All fields are required",
//     //   });
//     // }

//     // Creating the logged food
//     // const loggedFood = await LoggedFood.create({
//     //   userId: req.user.id,
//     //   name,
//     //   calorieValue,
//     //   quantity,
//     //   carbs,
//     //   protein,
//     //   fat,
//     //   fibre,
//     //   iron,
//     //   calcium,
//     //   vitaminC,
//     //   mealTime,
//     // });

//     console.log(req.body);
//   //   if (!loggedFood) {
//   //     return res.status(400).json(new ApiResponse(400, "Some Error Occurred"));
//   //   } else {
//   //     return res.status(201).json(new ApiResponse(200, loggedFood, "Logged Successfully"));
//   //   }
//   } 
//   catch (e) {
//     console.log(e);
//     return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
//   }
// };

// const getLoggedFood = async (req, res) => {
//   try {
//     const userId = req.user.id;
    
//     const loggedFoodDetails = await LoggedFood.find({ userId });

//     if (!loggedFoodDetails) {
//       return res.status(400).json(new ApiResponse(400, "Error Getting Data"));
//     } else {
//       return res.status(200).json(new ApiResponse(200, loggedFoodDetails, "Success"));
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
//   }
// };


// export { logFoodController, getLoggedFood };

// controllers/logFoodController.js
import { LoggedFood } from "../models/logFood.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const logFoodController = async (req, res) => {
  try {
    const { date, meals } = req.body;

    if (!date || !meals || !Array.isArray(meals) || meals.length === 0) {
      return res.status(400).json({
        message: "Invalid request body. 'date' and non-empty array 'meals' are required."
      });
    }

    const userId = req.user.id;

    let foodLog = await LoggedFood.findOne({ userId });

    if (!foodLog) {
      // If no food log exists for the user, create a new one
      foodLog = new LoggedFood({ userId, logs: [] });
    }

    // Check if a log entry already exists for the given date
    let logEntry = foodLog.logs.find(log => log.date.toISOString().split('T')[0] === date);

    if (!logEntry) {
      // If no log entry exists for the given date, create a new one
      logEntry = { date: new Date(date), meals: [] };
      foodLog.logs.push(logEntry);
    }

    // Add meals to the log entry
    meals.forEach(meal => {
      const { mealTime, foods } = meal;
      logEntry.meals.push({ mealTime, foods });
    });

    await foodLog.save();

    return res.status(201).json(new ApiResponse(201, foodLog, "Logged successfully"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
};

const getLoggedFood = async (req, res) => {
  try {
    const userId = req.user.id;
    const foodLog = await LoggedFood.findOne({ userId });

    if (!foodLog) {
      return res.status(404).json(new ApiResponse(404, "Food log not found for the user"));
    }

    return res.status(200).json(new ApiResponse(200, foodLog, "Success"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
};

export { logFoodController, getLoggedFood };


