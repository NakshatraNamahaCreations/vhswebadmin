import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineLibraryAdd } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function Category() {
  const [open, setOpen] = useState(false);
  const [bannerData, setbannerData] = useState([]);
  const [CateLink, setCateLink] = useState("");
  const [SelectCate, setSelectCate] = useState("");
  const [Edit, setEdit] = useState(null);

  const columns = [
    {
      name: "Website Image",
      selector: (row) => <img width={100} height={100} src={row?.webbanner} />,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <span className="me-1 edit cursor" onClick={() => handleEdit(row)}>
            Edit
          </span>
          <span className="m-auto me-1 text-bold">|</span>
          <span className="delete cursor" onClick={() => handleDelete(row)}>
            Delete
          </span>
        </>
      ),
    },
  ];

  const handleSaveOrUpdate = async () => {
    try {
      const url = `https://api.vijayhomeservice.com/api/website/updatebanner/${
        Edit ? Edit._id : SelectCate
      }`;
      const config = {
        url,
        method: "put",
        data: {
          webbanner: CateLink,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert("Updated successfully");
        setOpen(false);
        getbanner();
        window.location.reload("");
      }
    } catch (error) {
      console.log("Error in handleSaveOrUpdate:", error);
    }
  };

  useEffect(() => {
    getbanner();
    if (Edit) {
      setCateLink(Edit.webbanner);
      setSelectCate(Edit._id);
    }
  }, [Edit]);

  const getbanner = async () => {
    try {
      const res = await axios.get(
        "https://api.vijayhomeservice.com/api/website/getallwebbanner"
      );
      setbannerData(res.data.banner);
    } catch (error) {
      console.log("Error in getbanner:", error);
    }
  };

  const handleEdit = (row) => {
    setEdit(row);
    setOpen(true);
  };

  const handleDelete = async (row) => {
    try {
      const res = await axios.post(
        `https://api.vijayhomeservice.com/api/website/deletewebbanner/${row._id}`
      );
      if (res.status === 200) {
        alert("Deleted Succesfully");
        getbanner();
        window.location.reload("");
      }
    } catch (error) {
      console.log("Error in getbanner:", error);
    }
  };
  return (
    <div className="row m-auto p-2">
      <div className="row text-center">
        {/* <div className="col-md-3 d-flex m-auto">
          <span className="m-auto text-bold">Webbanner Management </span>
          <MdOutlineLibraryAdd onClick={handleAddCategory} className="m-auto" />
        </div> */}
      </div>
      <DataTable columns={columns} data={bannerData} pagination={true} />

      <Modal
        show={open}
        onHide={() => setOpen(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {Edit ? "Edit Webbanner" : "Add Web banner"}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Web banner Link</Form.Label>
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
