import mongoose, { type Document, type Model } from "mongoose";

export interface IRegion extends Document {
  slug: string;
  nameEn: string;
  nameAr: string;
  capital: string;
  area: number;
  population: number;
  populationYear: number;
}

const regionSchema = new mongoose.Schema<IRegion>(
  {
    slug: { type: String, required: true, unique: true },
    nameEn: { type: String, required: true },
    nameAr: { type: String, required: true },
    capital: { type: String, required: true },
    area: { type: Number, required: true },
    population: { type: Number, default: 0 },
    populationYear: { type: Number, default: 2024 },
  },
  { timestamps: true }
);

const Region: Model<IRegion> =
  mongoose.models.Region ||
  mongoose.model<IRegion>("Region", regionSchema);

export default Region;
