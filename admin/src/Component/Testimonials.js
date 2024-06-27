import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineLibraryAdd } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function Testimonials() {
  const [open, setOpen] = useState(false);
  let initialdata = {
    title: "",
    review: "",
    videolink: "",
    Testimonialname: "",
  };

  const [Testimonialdata, setTestimonialdata] = useState(initialdata);
  const [Testimonial, setTestimonial] = useState([]);
  const [SelectCate, setSelectCate] = useState("");
  const [Edit, setEdit] = useState(null);

  const columns = [
    {
      name: "Testomonial name",
      selector: (row) => row.Testimonialname,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },

    {
      name: "Testimonial video",
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

        const embedUrl = getEmbedUrl(row.videolink);
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
      name: "Description",
      selector: (row) => row.review,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <span className="me-1 edit cursor " onClick={() => handleEdit(row)}>
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
      const url = `https://api.vijayhomeservice.com/api/testimonial/updatedtestimonial/${
        Edit ? Edit._id : SelectCate
      }`;
      const config = {
        url,
        method: "put",
        data: {
          title: Testimonialdata.title,
          review: Testimonialdata.review,
          videolink: Testimonialdata.videolink,
          Testimonialname: Testimonialdata.Testimonialname,
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

  const handleAddTestimonial = async () => {
    try {
      const config = {
        url: "https://api.vijayhomeservice.com/api/testimonial/addtestimonial",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: {
          title: Testimonialdata.title,
          review: Testimonialdata.review,
          videolink: Testimonialdata.videolink,
          Testimonialname: Testimonialdata.Testimonialname,
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
      setTestimonialdata({
        title: Edit.title || Testimonialdata.title,
        videolink: Edit.videolink || Testimonialdata.videolink,
        review: Edit.review || Testimonialdata.review,
        Testimonialname: Testimonialdata.Testimonialname,
      });
    }
    getWhyChooose();
  }, [Edit]);

  const getWhyChooose = async () => {
    try {
      const res = await axios.get(
        "https://api.vijayhomeservice.com/api/testimonial/getalltestimonial"
      );
      setTestimonial(res.data.data);
    } catch (error) {
      console.log("Error in getcategory:", error);
    }
  };

  const handleDelete = async (row) => {
    try {
      const res = await axios.post(
        `https://api.vijayhomeservice.com/api/testimonial/deletetestimonial/${row._id}`
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
    setTestimonialdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // console.log(Testimonialdata, "Testimonialdata");

  return (
    <div className="row m-auto p-2">
      <div className="row text-center">
        <div className="col-md-3 d-flex m-auto">
          <span className="m-auto text-bold"> Testimonial Management </span>
          <MdOutlineLibraryAdd
            onClick={handleAddCategory}
            className="m-auto cursor"
          />
        </div>
      </div>
      <DataTable columns={columns} data={Testimonial} pagination={true} />

      <Modal
        show={open}
        onHide={() => setOpen(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {Edit ? "Edit Testimonial" : "Add Testimonial"}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Testimonial name</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              placeholder="username"
              value={Testimonialdata.Testimonialname}
              name="Testimonialname"
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              placeholder="title"
              value={Testimonialdata.title}
              name="title"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>videolink Link</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="videolink"
              placeholder="videolink link"
              value={Testimonialdata.videolink}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={handleChange}
              as="textarea"
              name="review"
              placeholder="description"
              value={Testimonialdata.review}
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
            <Button className="col-md-2 "  variant="primary" onClick={handleAddTestimonial}>
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
