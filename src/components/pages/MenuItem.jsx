import { useContext, useState } from 'react';
import styles from "./MenuItem.module.css";
import RestoContext from '../Context/RestoContaxt.jsx';

const MenuItem = () => {
  const { getMenuData, deletMenuItem, updateMenuItem } = useContext(RestoContext);
  
  const [editId, setEditId] = useState(null); // ID of item being edited
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleEditClick = (item) => {
    setEditId(item._id);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
    });
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleUpdate = async () => {
    await updateMenuItem(editId, formData); // context function
    setEditId(null); // close edit mode
  };

  return (
    <div className={styles.Menuitem_parent}>
      <h1 className='text-center'>All Menu</h1>
      <div className="table-responsive">
        <table className="table table-dark table-bordered table-hover">
          <thead>
            <tr>
              <th>Menu Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Is Available</th>
              <th>Category</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {
              getMenuData.map((item, index) => (
                <tr key={index}>
                  {editId === item._id ? (
                    <>
                      <td><input type="text" name="name" value={formData.name} onChange={handleChange} /></td>
                      <td><input type="text" name="description" value={formData.description} onChange={handleChange} /></td>
                      <td><input type="number" name="price" value={formData.price} onChange={handleChange} /></td>
                      <td><img src={item.imageUrl} className={styles.imgStyle} alt={item.name} /></td>
                      <td>{item.isAvailable ? "Yes" : "No"}</td>
                      <td>{item.category.name}</td>
                      <td><button className="btn btn-secondary" disabled>Delete</button></td>
                      <td><button className="btn btn-success" onClick={handleUpdate}>Save</button></td>
                    </>
                  ) : (
                    <>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.price}</td>
                      <td><img src={item.imageUrl} className={styles.imgStyle} alt={item.name} /></td>
                      <td>{item.isAvailable ? "Yes" : "No"}</td>
                      <td>{item.category.name}</td>
                      <td><button className="btn btn-danger" onClick={() => deletMenuItem(item._id)}>Delete</button></td>
                      <td><button className="btn btn-info" onClick={() => handleEditClick(item)}>Edit</button></td>
                    </>
                  )}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuItem;
