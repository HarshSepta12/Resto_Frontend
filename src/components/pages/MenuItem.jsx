import { useContext } from 'react';
import styles from "./MenuItem.module.css";
import RestoContext from '../Context/RestoContaxt.jsx';

const MenuItem = () => {
  const { getMenuData, deletMenuItem } = useContext(RestoContext);
  console.log(getMenuData);

  
  return (
    <div className={styles.Menuitem_parent}>
      <h1 className='text-center'>All Menu</h1>

      <div className="table-responsive">
        <table className="table table-dark table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Menu Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Image</th>
              <th scope="col">Is Available</th>
              <th scope="col">Category</th>
              <th scope="col">Delete</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {
              getMenuData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>
                    <img src={item.imageUrl} alt={item.name} className={styles.imgStyle} />
                  </td>
                  <td>{item.isAvailable ? "Yes" : "No"}</td>
                  <td>{item.category.name}</td>
                  <td><button className="btn btn-danger" onClick={()=> deletMenuItem(item._id)}>Delete</button></td>
                  <td><button className="btn btn-info">Edit</button></td>
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
