const mongoose = require("mongoose");


const locationSchema = new mongoose.Schema({

  HR:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'HR',
        required:true
       },
  locationName: { 
    type: String, 
    default: "Office Boundary" 
  },
  polygonPoints: [
    {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    }
  ],
  timestamp: { type: Date, default: Date.now }

});

// Create a model from the schema
const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
