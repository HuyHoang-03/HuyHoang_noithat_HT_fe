import {useState, memo} from "react";
import { CiFilter } from "react-icons/ci";
const ProductSideBar = ({setCategoryId, categories}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelected = (categoryName, categoryId)=>{
    setSelectedCategory((prev)=> prev === categoryName ? null : categoryName)
    setCategoryId(categoryId)
    console.log(`${categoryName} and ${categoryId}`)
  }

  return (
    <>
    <div className="border border-1 rounded-3 p-4">
        <p style={{fontSize: '20px'}}><CiFilter /> Lọc theo danh mục </p>
      <div className="mt-4">
        <ul className="list-group">
          {categories.length > 0 && categories.map((category)=> {
            return (
              <li  key={category.categoryId} className="list-group-item">
                <input id={category.categoryId} checked={selectedCategory === category.categoryName} onChange={()=> handleSelected(category.categoryName, category.categoryId)} type="checkbox" style={{display: 'inline-block' ,width:'15px', height: '15px', marginRight: '10px', marginTop: '4px'}} />
                <label htmlFor={category.categoryId} >{category.categoryName}</label>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
    </>
  )
}

export default memo(ProductSideBar)