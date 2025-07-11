import {memo} from "react";
import { CiFilter } from "react-icons/ci";
import { instance } from "../../../config/Axios";
const UserSideBar = () => {

  return (
    <>
    <div className="col-4 border border-1 rounded-3 p-4">
        <p style={{fontSize: '20px'}}><CiFilter />Lọc theo khách hàng</p>
      <div className="mt-4">
        <ul className="list-group">
          {/* {categories.length > 0 && categories.map((category)=> {
            return (
              <li  key={category.categoryId} className="list-group-item">
                <input checked={selectedCategory === category.categoryName} onChange={()=> handleSelected(category.categoryName, category.categoryId)} type="checkbox" style={{display: 'inline-block' ,width:'15px', height: '15px', marginRight: '10px', marginTop: '4px'}} />
                <span>{category.categoryName}</span>
              </li>
            )
          })} */} 
          <li   className="list-group-item">
                <input  type="checkbox" style={{display: 'inline-block' ,width:'15px', height: '15px', marginRight: '10px', marginTop: '4px'}} />
                <span>ABC</span>
              </li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default memo(UserSideBar)