import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineLibraryAdd } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function Offer() {
  const [open, setOpen] = useState(false);
  const [Category, setCategory] = useState([]);
  const [Offer, setOffer] = useState("");
  const [CreationData, setCreationData] = useState([]);
  const [SelectCate, setSelectCate] = useState("");
  const [Edit, setEdit] = useState(null);

  const columns = [
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Offer",
      selector: (row) => <span>{row.offer} %</span>,
    },

    {
      name: "Action",
      selector: (row) => (
        <>
          <span className="me-1 edit cursor" onClick={() => handleEdit(row)}>
            Edit
          </span>{" "}
          <span className="m-auto me-1 text-bold">|</span>
          <span className="delete cursor" onClick={() => handleDelete(row)}>
            Delete
          </span>
        </>
      ),
    },
  ];

  const handleAddCategory = () => {
    setEdit(null);
    setSelectCate();
    setOffer("");
    setOpen(true);
  };

  const handleSaveOrUpdate = async () => {
    try {
      const url = `https://api.vijayhomeservice.com/api/offer/updatedoffer/${
        Edit ? Edit._id : SelectCate
      }`;
      const config = {
        url,
        method: "put",
        data: {
          category: SelectCate,
          offer: Offer,
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

  const handleAddCreations = async () => {
    try {
      const config = {
        url: "https://api.vijayhomeservice.com/api/offer/addwebdoffer",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: {
          category: SelectCate,
          offer: Offer,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert("added successfully");
        setOpen(false);
        getcategory();
        getCreations();
      }
    } catch (error) {
      console.log("Error in handleSaveOrUpdate:", error);
    }
  };

  useEffect(() => {
    getcategory();
    if (Edit) {
      setOffer(Edit.offer);
      setSelectCate(Edit.category);
    }
    getCreations();
  }, [Edit]);

  const getcategory = async () => {
    try {
      const res = await axios.get("https://api.vijayhomeservice.com/api/getcategory");
      setCategory(res.data.category);
    } catch (error) {
      console.log("Error in getcategory:", error);
    }
  };

  const getCreations = async () => {
    try {
      const res = await axios.get(
        "https://api.vijayhomeservice.com/api/offer/getallwebdoffer"
      );
      setCreationData(res.data.offer);
    } catch (error) {
      console.log("Error in getcategory:", error);
    }
  };

  const handleDelete = async (row) => {
    try {
      const res = await axios.post(
        `https://api.vijayhomeservice.com/api/offer/deletewebdoffer/${row._id}`
      );
      if (res.status === 200) {
        alert("Deleted Succesfully");
        getCreations();
        window.location.reload("");
      }
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
          <span className="m-auto text-bold"> Offer Management </span>
          <MdOutlineLibraryAdd
            onClick={handleAddCategory}
            className="m-auto cursor"
          />
        </div>
      </div>
      <DataTable columns={columns} data={CreationData} pagination={true} />

      <Modal
        show={open}
        onHide={() => setOpen(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{Edit ? "Edit Offer" : "Add Offer"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>

            <Form.Select
              value={SelectCate}
              onChange={(e) => setSelectCate(e.target.value)}
            >
              <option value="">Select category</option>
              {Category?.map((Ele) => (
                <option key={Ele.category} value={Ele.category}>
                  {Ele.category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label> Offer</Form.Label>
            <Form.Control
              onChange={(e) => setOffer(e.target.value)}
              type="text"
              placeholder="offer"
              value={Offer}
              autoFocus
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className="col-md-2 me-auto"  variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
          {Edit ? (
            <Button className="col-md-2 "  variant="primary" onClick={handleSaveOrUpdate}>
              Update
            </Button>
          ) : (
            <Button className="col-md-2 "  variant="primary" onClick={handleAddCreations}>
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
