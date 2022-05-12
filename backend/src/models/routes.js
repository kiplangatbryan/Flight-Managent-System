const mongoose = require("mongoose");

const routeSchema = mongoose.Schema(
  {
    data: {
      required: true,
      type: Object,
    },
  },

  { timestamps: true }
);




module.exports = mongoose.model("routes", routeSchema);
