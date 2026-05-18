const express = require("express");
const Router = express.Router();
const Employee = require("../Models/EmployeeSchema");

// Create a new employee
Router.post("/", async (req, res) => {
    const { HR, Name, email, mobile, image, Job, gender, password } = req.body;

    // Validate input fields
    if (!HR || !Name || !email || !password) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    const newEmployee = new Employee({ HR, Name, email, mobile, image, Job, gender, password });

    try {
        const employee = await newEmployee.save();
        res.status(201).json({ employee });
    } catch (err) {
        console.error("Error creating employee:", err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        if (err.code === 11000) {
            return res.status(400).json({ message: "Email already exists." });
        }
        res.status(500).json({ message: "Error creating employee." });
    }
});


// Update employee details (excluding rating)
Router.put("/:id", async (req, res) => {
    const { Name, email, mobile, image, Job } = req.body;
    const { id } = req.params;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { $set: { Name, email, mobile, image, Job } },
            { new: true } // Return the updated document
        );
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found." });
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ error: "Error updating employee." });
    }
});



Router.post("/rate/:id", async (req, res) => {
    const { rating } = req.body;
    const { id } = req.params;
  
    try {
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      employee.rating = rating; // Update the rating for the employee
      await employee.save();
      res.status(200).json({ message: "Employee rated successfully", employee });
    } catch (err) {
      res.status(500).json({ message: "Error rating employee", error: err.message });
    }
  });


// Update employee rating
Router.put("/rate/:id", async (req, res) => {
    const { rating } = req.body; // Rating should be a number between 1 and 5
    const { id } = req.params;

    // Validate rating input
    const numericRating = Number(rating);

    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
        return res.status(400).json({ message: "Rating must be a number between 1 and 5." });
    }

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { $set: { rating: numericRating } },
            { new: true } // Return the updated document
        );
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found." });
        }
        res.status(200).json({ message: "Rating updated successfully.", employee: updatedEmployee });


    } catch (error) {
        console.error("Error updating rating:", error);
        res.status(500).json({ error: "Error updating rating." });
    }
});


Router.post("/rate/:id", async (req, res) => {
    const { rating} = req.body;
    const{id}=req.params
    console.log(req.body);
    try {
      await Employee.updateOne(
        { _id: id},
        {
          $set: {
            rating
          },
        }
      );
      res.send({status:"Ok",data:"Updated"})
    } catch (error) {
       console.log(error)
      return res.send({ error: error });
    }
  });


// Get all employees
Router.get("/", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        console.error("Error fetching employees:", err);
        res.status(500).json({ error: "Error fetching employees." });
    }
});

// Get employee by ID
Router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found." });
        }
        res.status(200).json(employee);
    } catch (err) {
        console.error("Error fetching employee:", err);
        res.status(500).json({ message: "Error fetching employee." });
    }
});

// Get employees by HR ID
Router.get("/hr/:HRID", async (req, res) => {
    const { HRID } = req.params;

    try {
        const employees = await Employee.find({ HR: HRID });
        if (!employees.length) {
            return res.status(200).json([]);
        }
        res.status(200).json(employees);
    } catch (err) {
        console.error("Error fetching employees by HR:", err);
        res.status(500).json({ message: "Error fetching employees." });
    }
});

// Delete employee by ID
Router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found." });
        }
        res.status(200).json({ message: "Employee deleted successfully." });
    } catch (err) {
        console.error("Error deleting employee:", err);
        res.status(500).json({ message: "Error deleting employee." });
    }
});

module.exports = Router;
