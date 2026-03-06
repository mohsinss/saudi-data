import mongoose, { type Document, type Model } from "mongoose";

export interface IIndicator extends Document {
  slug: string;
  nameEn: string;
  nameAr: string;
  category: "economic" | "social";
  subcategory: string;
  descriptionEn: string;
  descriptionAr: string;
  unit: string;
  frequency: "annual" | "quarterly" | "monthly" | "weekly" | "daily";
  source: string;
  sourceUrl: string;
  lastUpdated: Date;
  isActive: boolean;
  sortOrder: number;
  chartType: "line" | "bar" | "area" | "pie" | "treemap" | "stacked-area";
}

const indicatorSchema = new mongoose.Schema<IIndicator>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    nameEn: { type: String, required: true },
    nameAr: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["economic", "social"],
      index: true,
    },
    subcategory: { type: String, required: true, index: true },
    descriptionEn: { type: String, default: "" },
    descriptionAr: { type: String, default: "" },
    unit: { type: String, required: true },
    frequency: {
      type: String,
      required: true,
      enum: ["annual", "quarterly", "monthly", "weekly", "daily"],
    },
    source: { type: String, required: true },
    sourceUrl: { type: String, default: "" },
    lastUpdated: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    chartType: {
      type: String,
      default: "line",
      enum: ["line", "bar", "area", "pie", "treemap", "stacked-area"],
    },
  },
  { timestamps: true }
);

const Indicator: Model<IIndicator> =
  mongoose.models.Indicator ||
  mongoose.model<IIndicator>("Indicator", indicatorSchema);

export default Indicator;
