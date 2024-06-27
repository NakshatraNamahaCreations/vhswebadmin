import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineLibraryAdd } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function Category() {
  const [open, setOpen] = useState(false);
  const [Category, setCategory] = useState([]);
  const [CateLink, setCateLink] = useState("");
  const [SelectCate, setSelectCate] = useState("");
  const [Edit, setEdit] = useState(null);

  const columns = [
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Website Image",
      selector: (row) => <img width={100} height={100} src={row?.imglink} />,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <span className="me-1 edit cursor" onClick={() => handleEdit(row)}>
            Edit
          </span>
        </>
      ),
    },
  ];

  const handleAddCategory = () => {
    setEdit(null); // Reset edit state
    setSelectCate("");
    setCateLink("");
    setOpen(true);
  };

  const handleSaveOrUpdate = async () => {
    try {
      const url = `https://api.vijayhomeservice.com/api/updateimglink/${
        Edit ? Edit._id : SelectCate
      }`;
      const config = {
        url,
        method: "put",
        data: {
          imglink: CateLink,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert("Updated successfully");
        setOpen(false);
        getcategory();
        window.location.reload("");
      }
    } catch (error) {
      console.log("Error in handleSaveOrUpdate:", error);
    }
  };

  useEffect(() => {
    getcategory();
    if (Edit) {
      setCateLink(Edit.imglink);
      setSelectCate(Edit._id);
    }
  }, [Edit]);

  const getcategory = async () => {
    try {
      const res = await axios.get("https://api.vijayhomeservice.com/api/getcategory");
      setCategory(res.data.category);
    } catch (error) {
      console.log("Error in getcategory:", error);
    }
  };

  const handleEdit = (row) => {
    setEdit(row);
    setOpen(true);
  };

  return (
    <div className="row m-auto p-2">
      <div className="row text-center">
        <div className="col-md-2 d-flex m-auto">
          <span className="m-auto text-bold">Category Management </span>
          <MdOutlineLibraryAdd onClick={handleAddCategory} className="m-auto cursor" />
        </div>
      </div>
      <DataTable columns={columns} data={Category} pagination={true} />

      <Modal
        show={open}
        onHide={() => setOpen(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{Edit ? "Edit Category" : "Add Category"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            {Edit ? (
              <Form.Control value={Edit.category} readOnly />
            ) : (
              <Form.Select
                value={SelectCate}
                onChange={(e) => setSelectCate(e.target.value)}
              >
                <option value="">Select category</option>
                {Category?.map((Ele) => (
                  <option key={Ele._id} value={Ele._id}>
                    {Ele.category}
                  </option>
                ))}
              </Form.Select>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category Link</Form.Label>
            <Form.Control
              onChange={(e) => setCateLink(e.target.value)}
              type="text"
              value={CateLink}
              autoFocus
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveOrUpdate}>
            {Edit ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
