import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import UpdateCategory from "../modals/UpdateCategory";
import { toast } from "react-hot-toast";
import { instanceAdmin } from "../../../config/Axios";
const TableCategory = ({ categories, fetchCategories }) => {
  const [showUpdateCategory, setShowUpdateCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const handleUpdateCategory = (category) => {
    setShowUpdateCategory(true);
    setSelectedCategory(category);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
        const response = await instanceAdmin.delete(`/categories/${categoryId}`);
        if (response.code === 200) {
          toast.success(response.message);
          fetchCategories();
        } else {
          toast.error("Xoá danh mục thất bại");
        }
    } catch (error) {
      console.log("Lỗi khi xoá danh mục : " + error);
    }
  }
  return (
    <>
      <div className="col-9">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "30%" }}>Tên danh mục</th>
              <th style={{ width: "50%" }}>Mô tả</th>
              <th style={{ width: "20%" }}>Chỉnh sửa</th>
            </tr>
          </thead>
          <tbody>
            {categories ? (
              categories.map((category) => {
                return (
                  <tr key={category.categoryId}>
                    <td>{category.categoryName}</td>
                    <td>{category.description}</td>
                    <td className="d-flex align-items-center gap-4">
                      <Button variant="info" onClick={()=>handleUpdateCategory(category)}>
                        Sửa
                      </Button>
                      <Button variant="danger" onClick={()=>handleDeleteCategory(category.categoryId)}>Xoá</Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>Chưa có danh mục</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      {showUpdateCategory && (
        <UpdateCategory
          show={showUpdateCategory}
          setshow={setShowUpdateCategory}
          selectedCategory={selectedCategory}
          fetchCategories={fetchCategories}
        />
      )}
    </>
  );
};

export default TableCategory;
