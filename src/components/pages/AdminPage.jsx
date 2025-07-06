import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./admin.module.css";

const AdminPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    isAvailable: true,
    spiceLevel: "",
    ingredients: "",
    category: "", // Start with empty to force user selection
  });

  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      price: Number(formData.price),
      ingredients: formData.ingredients.split(",").map((item) => item.trim()),
    };

    try {
      const res = await axios.post(
        "http://localhost:1200/api/menuItem/post",
        finalData
      );
      alert("Item Added Successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Error submitting data", err);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:1200/api/category/get");
        const catData = res.data.categories || res.data || [];
        setCategories(catData.getCategory);
        console.log(catData.getCategory);
         
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container">
      <div className="row p-5">
        <h2 className={styles.heading}>Add Menu Item</h2>
        <div className="col-md-6 col-sm-12">
          <img
            src="/img/menuAdded.png"
            alt="menuAdded img"
            className="img-fluid"
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                className="form-control"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Spice Level</label>
              <select
                className="form-select"
                name="spiceLevel"
                value={formData.spiceLevel}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Ingredients (comma separated)
              </label>
              <input
                type="text"
                className="form-control"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Select Category</label>
              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {Array.isArray(categories) &&
                  categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-md-4 d-flex align-items-center mt-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                />
                <label className="form-check-label">Is Available?</label>
              </div>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Add Menu Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
