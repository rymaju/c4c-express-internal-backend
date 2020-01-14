const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const eventSchema = new Schema(
  {
    name: { type: String, required: true },
    eventDate: { type: Date, required: true },
    isOpen: { type: Boolean, required: true },
    attendees: { type: [ObjectId], default: []}
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
