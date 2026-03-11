import Car from '../models/Car.js';

// @desc    Fetch all cars (with filtering, pagination, search)
// @route   GET /api/cars
// @access  Public
export const getCars = async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 12;
  const page = Number(req.query.pageNumber) || 1;

  // Search keyword (brand or name)
  const keyword = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: 'i' } },
          { brand: { $regex: req.query.keyword, $options: 'i' } }
        ]
      }
    : {};

  // Custom filters
  const filter = { ...keyword };

  if (req.query.category) filter.category = req.query.category;
  if (req.query.brand) filter.brand = req.query.brand;
  if (req.query.transmission) filter.transmission = req.query.transmission;
  if (req.query.fuel) filter.fuel = req.query.fuel;
  
  if (req.query.minPrice || req.query.maxPrice) {
    filter.pricePerDay = {};
    if (req.query.minPrice) filter.pricePerDay.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) filter.pricePerDay.$lte = Number(req.query.maxPrice);
  }

  try {
    const count = await Car.countDocuments(filter);
    const cars = await Car.find(filter)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      cars,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Fetch single car
// @route   GET /api/cars/:id
// @access  Public
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car) {
      res.json({ success: true, car });
    } else {
      res.status(404).json({ success: false, message: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a car
// @route   POST /api/cars
// @access  Private/Admin
export const createCar = async (req, res) => {
  try {
    const car = new Car({
      name: 'Sample Car',
      brand: 'Sample Brand',
      model: 'Sample Model',
      year: new Date().getFullYear(),
      category: 'sedan',
      transmission: 'automatic',
      fuel: 'essence',
      seats: 5,
      doors: 4,
      pricePerDay: 100,
      pricePerWeek: 600,
      location: 'Sample Location',
      images: [],
    });

    const createdCar = await car.save();
    res.status(201).json({ success: true, car: createdCar });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a car
// @route   PUT /api/cars/:id
// @access  Private/Admin
export const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (car) {
      Object.assign(car, req.body);
      const updatedCar = await car.save();
      res.json({ success: true, car: updatedCar });
    } else {
      res.status(404).json({ success: false, message: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a car
// @route   DELETE /api/cars/:id
// @access  Private/Admin
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car) {
      await Car.deleteOne({ _id: req.params.id });
      res.json({ success: true, message: 'Car removed' });
    } else {
      res.status(404).json({ success: false, message: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
