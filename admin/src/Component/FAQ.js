import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineLibraryAdd } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function FAQ() {
  const [open, setOpen] = useState(false);
  const [Category, setCategory] = useState([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [VHSPromisesData, setVHSPromisesData] = useState([]);
  const [SelectCate, setSelectCate] = useState("");
  const [Edit, setEdit] = useState(null);
  // question, category, answer
  const columns = [
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Question",
      selector: (row) => row.question,
    },

    {
      name: "Answer",
      selector: (row) => row.answer,
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
      const url = `https://api.vijayhomeservice.com/api/faq/updatevhsfaq/${
        Edit ? Edit._id : SelectCate
      }`;
      const config = {
        url,
        method: "put",
        data: {
          category: SelectCate,
          answer: description,
          question: title,
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
        url: "https://api.vijayhomeservice.com/api/faq/addvhsfaq",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: {
          category: SelectCate,
          answer: description,
          question: title,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert("added successfully");
        setOpen(false);
        getcategory();
        getFAQ();
      }
    } catch (error) {
      console.log("Error in handleSaveOrUpdate:", error);
    }
  };

  useEffect(() => {
    getcategory();
    getFAQ();
    if (Edit) {
      setSelectCate(Edit.category);
      setDescription(Edit.answer);
      setTitle(Edit.question);
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

  const getFAQ = async () => {
    try {
      const res = await axios.get("https://api.vijayhomeservice.com/api/faq/getallvhsfaq");
      setVHSPromisesData(res.data.data);
    } catch (error) {
      console.log("Error in getcategory:", error);
    }
  };

  const handleDelete = async (row) => {
    try {
      const res = await axios.post(
        `https://api.vijayhomeservice.com/api/faq/deletevhsfaq/${row._id}`
      );
      if (res.status === 200) {
        alert("Deleted Succesfully");
        getFAQ();
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
          <span className="m-auto text-bold"> FAQ Management </span>
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
          <Modal.Title>{Edit ? "Edit FAQ" : "Add FAQ"} </Modal.Title>
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
          {/* 
          <Form.Group className="mb-3">
            <Form.Label> FAQ Image</Form.Label>
            <Form.Control
              onChange={(e) => setFAQImage(e.target.value)}
              type="text"
              placeholder="FAQ image"
              value={FAQImage}
              autoFocus
            />
          </Form.Group> */}
          <Form.Group className="mb-3">
            <Form.Label>Question </Form.Label>
            <Form.Control
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Question"
              value={title}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Answer </Form.Label>
            <Form.Control
              onChange={(e) => setDescription(e.target.value)}
              as="textarea"
              placeholder="Answer"
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
