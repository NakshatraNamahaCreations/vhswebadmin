import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineLibraryAdd } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function TCreations() {
  const [open, setOpen] = useState(false);
  const [Category, setCategory] = useState([]);
  const [CateLink, setCateLink] = useState("");
  const [CreationData, setCreationData] = useState([]);
  const [SelectCate, setSelectCate] = useState("");
  const [Edit, setEdit] = useState(null);

  const columns = [
    {
      name: "Category",
      selector: (row) => row.category,
    },

    {
      name: "Video Link",
      selector: (row) => {
        const getEmbedUrl = (url) => {
          let embedUrl = "";
          if (url.includes("/shorts/")) {
            embedUrl = url.replace("/shorts/", "/embed/");
          } else if (url.includes("youtube.com/watch?v=")) {
            const videoId = url.split("v=")[1];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
          } else if (url.includes("youtu.be/")) {
            const videoId = url.split("youtu.be/")[1];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
          }
          return embedUrl;
        };
        // creationslink

        const embedUrl = getEmbedUrl(row.creationslink);
        return (
          <iframe
            width="200"
            height="100"
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        );
      },
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
    setCateLink("");
    setOpen(true);
  };

  const handleSaveOrUpdate = async () => {
    try {
      const url = `http://localhost:8900/api/creation/updatecreation/${
        Edit ? Edit._id : SelectCate
      }`;
      const config = {
        url,
        method: "put",
        data: {
          category: SelectCate,
          creationslink: CateLink,
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
        url: "http://localhost:8900/api/creation/addwebcreation",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: {
          category: SelectCate,
          creationslink: CateLink,
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
      setCateLink(Edit.creationslink);
      setSelectCate(Edit.category);
    }
    getCreations();
  }, [Edit]);

  const getcategory = async () => {
    try {
      const res = await axios.get("http://localhost:8900/api/getcategory");
      setCategory(res.data.category);
    } catch (error) {
      console.log("Error in getcategory:", error);
    }
  };

  const getCreations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8900/api/creation/getallwebcreation"
      );
      setCreationData(res.data.creation);
    } catch (error) {
      console.log("Error in getcategory:", error);
    }
  };

  const handleDelete = async (row) => {
    try {
      const res = await axios.post(
        `http://localhost:8900/api/creation/deletewebcreation/${row._id}`
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
        <div className="col-md-3 d-flex m-auto">
          <span className="m-auto text-bold">
            {" "}
            Thoughts Creations Management{" "}
          </span>
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
          <Modal.Title>
            {Edit ? "Edit thoughtfull creation" : "Add thoughtfull creation"}{" "}
          </Modal.Title>
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
            <Form.Label> Thoughts Creations YouTube Link</Form.Label>
            <Form.Control
              onChange={(e) => setCateLink(e.target.value)}
              type="text"
              placeholder="Youtube link"
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
