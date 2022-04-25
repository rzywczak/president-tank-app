const mongoose = require("mongoose");
const validator = require("validator");

const tankSchema = new mongoose.Schema(
  {
    sideNumber: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },

    producent: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },

    model: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    currentModification: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    productonYear: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 4,
      validate(value) {
        if (value > new Date().getFullYear() || value < 1900) {
          throw new Error("Incorrect production year");
        }
      },
    },
    introductionToCountry: {
      type: String,
      require: true,
      trim: true,
      maxlength: 10,
      validate(value) {
        if (!validator.isDate(value)) {
          throw new Error("incorrect data");
        }
      },
    },
    course: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 6,
      validate(value) {
        if (value < 0) {
          throw new Error("incorrect course");
        }
      },
    },
    ammunition: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 6,
      validate(value) {
        if (value < 0) {
          throw new Error("incorrect quantity of ammunition");
        }
      },
    },
    armorSide: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 4,
      validate(value) {
        if (value < 0) {
          throw new Error("incorrect quantity of ammunition");
        }
      },
    },
    armorFront: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 4,
      validate(value) {
        if (value < 0) {
          throw new Error("incorrect quantity of ammunition");
        }
      },
    },
    armorBack: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 4,
      validate(value) {
        if (value < 0) {
          throw new Error("incorrect quantity of ammunition");
        }
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Tank = mongoose.model('Tank', tankSchema);
module.exports = Tank;
