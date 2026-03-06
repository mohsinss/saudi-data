import mongoose, { type Document, type Model } from "mongoose";

export interface ICountry extends Document {
  code: string;
  nameEn: string;
  nameAr: string;
  region: string;
}

const countrySchema = new mongoose.Schema<ICountry>(
  {
    code: { type: String, required: true, unique: true },
    nameEn: { type: String, required: true },
    nameAr: { type: String, required: true },
    region: { type: String, default: "" },
  },
  { timestamps: true }
);

const Country: Model<ICountry> =
  mongoose.models.Country ||
  mongoose.model<ICountry>("Country", countrySchema);

export default Country;
