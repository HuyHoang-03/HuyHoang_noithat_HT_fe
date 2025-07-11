import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
const SearchBarAdmin = ({ title, dropdownItems }) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="">{title}</h2>
        <Form className="d-flex gap-2" style={{ width: "40%" }}>
          <Form.Control
            type="search"
            placeholder="Tìm kiếm"
            className="me-2"
            aria-label="Search"
          />
          <Button
            style={{ width: "30%", background: "#f53e32", border: 0 }}
            type="submit"
          >
            Tìm kiếm
          </Button>
        </Form>
        <Dropdown drop="down">
          <Dropdown.Toggle
            style={{ background: "#f53e32", border: 0 }}
            id="dropdown-basic"
          >
            Thêm
          </Dropdown.Toggle>
          <Dropdown.Menu>
            { dropdownItems ? dropdownItems.map((item, index) => (
              <Dropdown.Item key={index} onClick={item.onClick}>
                {item.label}
              </Dropdown.Item>
            )) : ""}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default SearchBarAdmin;
