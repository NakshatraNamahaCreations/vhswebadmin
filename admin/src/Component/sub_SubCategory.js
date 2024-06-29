import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineLibraryAdd } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function SubSubCategory() {
  const [open, setOpen] = useState(false);
  const [SubCategory, setSubCategory] = useState([]);
  const [CateLink, setCateLink] = useState("");
  const [SelectCate, setSelectCate] = useState("");
  const [Edit, setEdit] = useState(null);
  const [filterData, setfilterData] = useState([]);
  const [SearchValue, setSearchValue] = useState("");
  const columns = [
    {
      name: "subcategory",
      selector: (row) => row.subcategory,
    },
    {
      name: "sub_subcategory",
      selector: (row) => row.sub_subcategory,
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
  // https://api.vijayhomeservice.com
  const handleSaveOrUpdate = async () => {
    try {
      const url = `http://localhost:8900/api/userapp/updateresublink/${
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
        getSubcategory();
        window.location.reload("");
      }
    } catch (error) {
      console.log("Error in handleSaveOrUpdate:", error);
    }
  };

  useEffect(() => {
    getSubcategory();
    if (Edit) {
      setCateLink(Edit.imglink);
      setSelectCate(Edit._id);
    }
  }, [Edit]);

  const getSubcategory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8900/api/userapp/getappresubcat"
      );
      setSubCategory(res.data.subcategory);
    } catch (error) {
      console.log("Error in getSubcategory:", error);
    }
  };

  const handleEdit = (row) => {
    setEdit(row);
    setOpen(true);
  };
  // console.log(SubCategory);
  useEffect(() => {
    let value = SearchValue.toLowerCase();
    let data = SubCategory.filter((ele) =>
      ele?.sub_subcategory?.toLowerCase()?.includes(value)
    );
    setfilterData(data);
  }, [SubCategory, SearchValue]);

  
  return (
    <div className="row m-auto p-2">
      <div className="row text-center">
        {/* <div className="col-md-3 d-flex m-auto">
          <span className="m-auto text-bold">Subcategory Management </span>
          <MdOutlineLibraryAdd
            onClick={handleAddCategory}
            className="m-auto cursor"
          />
        </div> */}
        <div className="col-md-2">
          <Form.Control
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search  sub_subcategory"
          />
        </div>
      </div>
      <DataTable
        className="mt-3"
        columns={columns}
        data={filterData}
        pagination={true}
      />

      <Modal
        show={open}
        onHide={() => setOpen(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {Edit ? "Edit Subcategory" : "Add Subcategory"}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Subcategory</Form.Label>
            {Edit ? (
              <Form.Control value={Edit.category} readOnly />
            ) : (
              <Form.Select
                value={SelectCate}
                onChange={(e) => setSelectCate(e.target.value)}
              >
                <option value="">Select subcategory</option>
                {SubCategory?.map((Ele) => (
                  <option key={Ele._id} value={Ele._id}>
                    {Ele.sub_subcategory}
                  </option>
                ))}
              </Form.Select>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>SubCategory Link</Form.Label>
            <Form.Control
              onChange={(e) => setCateLink(e.target.value)}
              type="text"
              value={CateLink}
              autoFocus
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="col-md-2 me-auto"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
          <Button
            className="col-md-2 "
            variant="primary"
            onClick={handleSaveOrUpdate}
          >
            {Edit ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
