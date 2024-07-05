import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineLibraryAdd } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function VHSPromises() {
  const [open, setOpen] = useState(false);
  const [Category, setCategory] = useState([]);
  const [VHSPromisesImage, setVHSPromisesImage] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [VHSPromisesData, setVHSPromisesData] = useState([]);
  const [SelectCate, setSelectCate] = useState("");
  const [Edit, setEdit] = useState(null);

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Description",
      selector: (row) => row.discription,
    },
    {
      name: "Website Image",
      selector: (row) => <img width={100} height={100} src={row?.image} />,
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
    setVHSPromisesImage("");
    setOpen(true);
  };

  const handleSaveOrUpdate = async () => {
    try {
      const url = `https://api.vijayhomeservice.com/api/vhspromise/updatevhspromise/${
        Edit ? Edit._id : SelectCate
      }`;
      const config = {
        url,
        method: "put",
        data: {
          category: SelectCate,
          image: VHSPromisesImage,
          discription: description,
          title: title,
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
        url: "https://api.vijayhomeservice.com/api/vhspromise/addvhspromise",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: {
          category: SelectCate,
          image: VHSPromisesImage,
          discription: description,
          title: title,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert("added successfully");
        setOpen(false);
        getcategory();
        getVHSPromises();
      }
    } catch (error) {
      console.log("Error in handleSaveOrUpdate:", error);
    }
  };

  useEffect(() => {
    getcategory();
    getVHSPromises();
    if (Edit) {
      setVHSPromisesImage(Edit.image);
      setSelectCate(Edit.category);
      setDescription(Edit.discription);
      setTitle(Edit.title);
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

  const getVHSPromises = async () => {
    try {
      const res = await axios.get(
        "https://api.vijayhomeservice.com/api/vhspromise/getallvhspromise"
      );
      setVHSPromisesData(res.data.data);
    } catch (error) {
      console.log("Error in getcategory:", error);
    }
  };

  const handleDelete = async (row) => {
    try {
      const res = await axios.post(
        `https://api.vijayhomeservice.com/api/vhspromise/deletevhspromise/${row._id}`
      );
      if (res.status === 200) {
        alert("Deleted Succesfully");
        getVHSPromises();
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
        <div className="col-md-3 d-flex m-auto">
          <span className="m-auto text-bold"> VHS Promises Management </span>
          <MdOutlineLibraryAdd
            onClick={handleAddCategory}
            className="m-auto cursor"
          />
        </div>
      </div>
      <DataTable columns={columns} data={VHSPromisesData} pagination={true} />

      <Modal
        show={open}
        onHide={() => setOpen(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {Edit ? "Edit VHS Promises" : "Add VHS Promises"}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title </Form.Label>
            <Form.Control
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              value={title}
              autoFocus
            />
          </Form.Group>
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
            <Form.Label> VHS Promises Image</Form.Label>
            <Form.Control
              onChange={(e) => setVHSPromisesImage(e.target.value)}
              type="text"
              placeholder="VHS Promises image"
              value={VHSPromisesImage}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description </Form.Label>
            <Form.Control
              onChange={(e) => setDescription(e.target.value)}
              as="textarea"
              placeholder="Description"
              value={description}
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
              className="col-md-2 "
              variant="primary"
              onClick={handleSaveOrUpdate}
            >
              Update
            </Button>
          ) : (
            <Button
              className="col-md-2 "
              variant="primary"
              onClick={handleAddCreations}
            >
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
