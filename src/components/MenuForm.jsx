import React, { useContext, useEffect, useState } from "react";
import styles from "./MenuForm.module.css";
import RestoContext from "./Context/RestoContaxt";

const MenuForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    isAvailable: true,
    spiceLevel: "",
    ingredients: "",
    category: "",
  });

  const { postMenuItem, getCatgory } = useContext(RestoContext);
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
      ingredients: formData.ingredients
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      const response = await postMenuItem(
        finalData.name,
        finalData.description,
        finalData.price,
        finalData.imageUrl,
        finalData.isAvailable,
        finalData.spiceLevel,
        finalData.ingredients,
        finalData.category
      );
      console.log("Menu item added:", response);

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        isAvailable: true,
        spiceLevel: "",
        ingredients: "",
        category: "",
      });
    } catch (err) {
      console.error("Error submitting data", err);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getCatgory();
        setCategories(cats || []);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };

    fetchCategories();
  }, [getCatgory]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Add Menu Item</h2>
      <div className={styles.formRow}>
        <div className={styles.inputGroup}>
          <img
            src="/img/menuAdded.png"
            alt="menuAdded img"
            className={styles.image}
          />
        </div>
        <div className={styles.inputGroup}>
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Name</label>
              <input
                type="text"
                className={styles.input}
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Price</label>
              <input
                type="number"
                className={styles.input}
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Description</label>
              <textarea
                className={styles.textarea}
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Image URL</label>
              <input
                type="text"
                className={styles.input}
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Spice Level</label>
              <select
                className={styles.select}
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

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                Ingredients (comma separated)
              </label>
              <input
                type="text"
                className={styles.input}
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Select Category</label>
              <select
                className={styles.select}
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.checkboxContainer}>
              <input
                className={styles.input}
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
              />
              <label className={styles.label}>Is Available?</label>
            </div>

            <div>
              <button type="submit" className={styles.submitButton}>
                Add Menu Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MenuForm;
