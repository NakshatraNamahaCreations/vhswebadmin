import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineLibraryAdd } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function HowITWorks() {
  const [open, setOpen] = useState(false);
  let initialdata = {
    title: "",
    discription: "",
    image: "",
  };
  const [HowItWorkdata, setHowItWorkdata] = useState(initialdata);

  const [HowItWork, setHowItWork] = useState([]);
  const [SelectCate, setSelectCate] = useState("");
  const [Edit, setEdit] = useState(null);

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Website Image",
      selector: (row) => <img width={100} height={100} src={row?.image} />,
    },
    {
      name: "Description",
      selector: (row) => row.discription,
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

    setOpen(true);
  };

  const handleSaveOrUpdate = async () => {
    try {
      const url = `https://api.vijayhomeservice.com/api/howitwork/updatehowitworks/${
        Edit ? Edit._id : SelectCate
      }`;
      const config = {
        url,
        method: "put",
        data: {
          image: HowItWorkdata.image,
          title: HowItWorkdata.title,
          discription: HowItWorkdata.discription,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert("Updated successfully");
        setOpen(false);

        window.location.reload("");
      }
    } catch (error) {
      console.log("Error in handleSaveOrUpdate:", error);
    }
  };

  const handleAddHowItWork = async () => {
    try {
      const config = {
        url: "https://api.vijayhomeservice.com/api/howitwork/addhowitworks",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: {
          image: HowItWorkdata.image,
          title: HowItWorkdata.title,
          discription: HowItWorkdata.discription,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert("added successfully");
        setOpen(false);

        getWhyChooose();
      }
    } catch (error) {
      console.log("Error in handleSaveOrUpdate:", error);
    }
  };

  useEffect(() => {
    if (Edit) {
      setHowItWorkdata({
        title: Edit.title || HowItWorkdata.title,
        image: Edit.image || HowItWorkdata.image,
        discription: Edit.discription || HowItWorkdata.discription,
      });
    }
    getWhyChooose();
  }, [Edit]);

  const getWhyChooose = async () => {
    try {
      const res = await axios.get(
        "https://api.vijayhomeservice.com/api/howitwork/getallhowitworks"
      );
      setHowItWork(res.data.data);
    } catch (error) {
      console.log("Error in getcategory:", error);
    }
  };

  const handleDelete = async (row) => {
    try {
      const res = await axios.post(
        `https://api.vijayhomeservice.com/api/howitwork/deletehowitworks/${row._id}`
      );
      if (res.status === 200) {
        alert("Deleted Succesfully");
        getWhyChooose();
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
  const handleChange = (e) => {
    let { value, name } = e.target;
    setHowItWorkdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="row m-auto p-2">
      <div className="row text-center">
        <div className="col-md-3 d-flex m-auto">
          <span className="m-auto text-bold">How It Works Management </span>
          <MdOutlineLibraryAdd
            onClick={handleAddCategory}
            className="m-auto cursor"
          />
        </div>
      </div>
      <DataTable columns={columns} data={HowItWork} pagination={true} />

      <Modal
        show={open}
        onHide={() => setOpen(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {Edit ? "Edit How It Works" : "Add How It Works"}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              placeholder="title"
              value={HowItWorkdata.title}
              name="title"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image Link</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="image"
              placeholder="Image link"
              value={HowItWorkdata.image}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={handleChange}
              as="textarea"
              name="discription"
              placeholder="description"
              value={HowItWorkdata.discription}
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
          {Edit ? (
            <Button
              className="col-md-2"
              variant="primary"
              onClick={handleSaveOrUpdate}
            >
              Update
            </Button>
          ) : (
            <Button
              className="col-md-2"
              variant="primary"
              onClick={handleAddHowItWork}
            >
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
