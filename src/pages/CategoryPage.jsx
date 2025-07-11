import FormAddCategory from "../components/admin/forms/FormAddCategory";
import TableCategory from "../components/admin/tables/TableCategory";
import useFetchCategories from "../hooks/useFetchCategories";
const CategoryPage = () => {
    const {categories, isLoading, error, fetchCategories} = useFetchCategories();
     if (isLoading) {
        return <div className="text-center mt-5">Đang tải danh mục...</div>;
    }
    if (error) {
        return <div className="alert alert-danger mt-5">Lỗi: {error}</div>;
    }
  return (
    <div className="row">
      <FormAddCategory  fetchCategories={fetchCategories} />
      <TableCategory fetchCategories={fetchCategories} categories={categories} />
    </div>
  );
};

export default CategoryPage;
