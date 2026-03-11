import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
  }
);

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    category: { 
      type: String, 
      enum: ['sedan', 'suv', 'sports', 'luxury', 'van'], 
      required: true 
    },
    transmission: { 
      type: String, 
      enum: ['automatic', 'manual'], 
      required: true 
    },
    fuel: { 
      type: String, 
      enum: ['essence', 'diesel', 'electric', 'hybrid'], 
      required: true 
    },
    seats: { type: Number, required: true },
    doors: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    pricePerWeek: { type: Number, required: true },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      }
    ],
    features: [{ type: String }],
    mileage: { type: Number },
    available: { type: Boolean, default: true },
    location: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: [reviewSchema],
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Car = mongoose.model('Car', carSchema);
export default Car;
