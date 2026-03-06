import mongoose, { type Document, type Model } from "mongoose";

export interface IDataPoint extends Document {
  indicatorSlug: string;
  date: Date;
  year: number;
  quarter?: number;
  month?: number;
  value: number;
  region?: string;
  country?: string;
  breakdown?: string;
  breakdownValue?: string;
}

const dataPointSchema = new mongoose.Schema<IDataPoint>(
  {
    indicatorSlug: { type: String, required: true, index: true },
    date: { type: Date, required: true, index: true },
    year: { type: Number, required: true, index: true },
    quarter: { type: Number },
    month: { type: Number },
    value: { type: Number, required: true },
    region: { type: String, index: true },
    country: { type: String, index: true },
    breakdown: { type: String },
    breakdownValue: { type: String },
  },
  { timestamps: true }
);

dataPointSchema.index({ indicatorSlug: 1, date: -1 });
dataPointSchema.index({ indicatorSlug: 1, year: 1, region: 1 });
dataPointSchema.index({ indicatorSlug: 1, year: 1, country: 1 });

const DataPoint: Model<IDataPoint> =
  mongoose.models.DataPoint ||
  mongoose.model<IDataPoint>("DataPoint", dataPointSchema);

export default DataPoint;
