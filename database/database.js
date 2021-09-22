// imports
const mongoose = require("mongoose");
require("dotenv").config(); // Getting all the environment variables.

// Database connection
mongoose.connect(
  `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@pricetracker.f9njy.mongodb.net/priceTracker?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection ERROR :(:"));
db.once("open", function () {
  console.log("Database connected");
});

// Creating Schemas.
// Creating a Schema for Users.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price_history: [
    {
      // _id: false,
      price: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const scrapeSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  params: {
    name: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }
});

const monitorSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: true
  },
  minDesiredPrice: {
    type: Number,
    required: true
  },
  nextTime: {
    type: String,
    required: true
  },
  emailTo: {
    type: String,
    required: true
  },
  increaseNext: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

module.exports.User = mongoose.model("user", userSchema);
module.exports.Products = mongoose.model("product", productSchema);
module.exports.Scrape = mongoose.model("scrape", scrapeSchema);
module.exports.Monitor = mongoose.model("monitor", monitorSchema);
