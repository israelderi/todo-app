import taskModel from '../models/Task.js';
import UserModel from '../models/User.js';

export const getTasks = async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      const list = await Promise.all(
        user.tasks.map((task) => {
          return taskModel.findById(task);
        })
      );
      res.status(200).json(list)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
  };

export const createTask = async (req, res) => {
    const userId = req.params.id;
    const newTask = new taskModel(req.body);
  
    try {
      const savedTask = await newTask.save();
      try {
        await UserModel.findByIdAndUpdate(userId, {
          $push: { tasks: savedTask._id },
        });
      } catch (err) {
        throw err;
      }
      res.status(200).json(savedTask);
    } catch (err) {
      throw err;
    }
  };

export const updateTask = async (req, res) => {
    try {
        const updatedTask = await taskModel.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updatedTask)

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const deleteTask = async (req, res) => {
    const userId = req.params.userid;

    try {
      await taskModel.findByIdAndDelete(req.params.id);
      try {
        await UserModel.findByIdAndUpdate(userId, {
          $pull: { tasks: req.params.id },
        });
      } catch (error) {
        res.status(400).json({message: error.message});
      }
      res.status(200).json("Room has been deleted.");
    } catch (error) {
        res.status(400).json({message: error.message});
    }
  };