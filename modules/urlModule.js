import { Schema, model } from "mongoose";
import crypto from "crypto";
import { type } from "os";

const urlSchema = new Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    default: () => crypto.randomBytes(5).toString("base64url"),
  },
  visit: {
    type: Number,
    required: true,
    default: 0,
  },
});

const urlModel = model("URL", urlSchema);

export default urlModel;
