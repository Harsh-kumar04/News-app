import db from "../../auth/model/index.js";
const City = db.City;

export const addCity = async (req, res) => {
  try {
    const { name } = req.body;
    const city = await City.create({ name });
    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCities = async (req, res) => {
  try {
    const cities = await City.findAll();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
