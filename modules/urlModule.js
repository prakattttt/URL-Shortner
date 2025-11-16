import { Schema, model } from "mongoose";

const urlSchema = new Schema({

});

const Url = model("URL", urlSchema);

export default Url;