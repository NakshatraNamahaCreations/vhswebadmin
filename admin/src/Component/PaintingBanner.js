import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineLibraryAdd } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function PaintingBanner() {
  const [open, setOpen] = useState(false);
  const [bannerData, setbannerData] = useState([]);
  const [CateLink, setCateLink] = useState("");
  const [SelectCate, setSelectCate] = useState("");
  const [Edit, setEdit] = useState(null);
  const [Category, setCategory] = useState([]);
  const columns = [
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Painting Banner",
      selector: (row) => <img width={100} height={100} src={row?.banner} />,
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
  const getcategory = async () => {
    try {
      const res = await axios.get("https://api.vijayhomeservice.com/api/getcategory");
      setCategory(res.data.category);
    } catch (error) {
      console.log("Error in getcategory:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const config = {
        url: `https://api.vijayhomeservice.com/api/paintingbanner/updatebanner/${Edit._id}`,
        method: "put",
        data: {
          banner: CateLink,
          category: SelectCate,
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
    getcategory();
    if (Edit) {
      setCateLink(Edit.banner);
      setSelectCate(Edit.category);
    }
  }, [Edit]);

  const getbanner = async () => {
    try {
      const res = await axios.get(
        "https://api.vijayhomeservice.com/api/paintingbanner/getallpaintingbanner"
      );
      setbannerData(res.data.banner);
      console.log(res.data.banner, "res.data.banner");
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
        `https://api.vijayhomeservice.com/api/paintingbanner/deletepaintingbanner/${row._id}`
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

  const handleAddBanner = async () => {
    try {
      const config = {
        url: "https://api.vijayhomeservice.com/api/paintingbanner/addwebpainbanner",
        method: "post",
        data: {
          banner: CateLink,
          category: SelectCate,
        },
      };
      console.log(SelectCate,"SelectCate")

      const res = await axios(config);
      if (res.status === 200) {
        alert("Banner added successfully");
        setOpen(false);
        getbanner();
        window.location.reload("");
      }
    } catch (error) {
      console.log("Error in handleSaveOrUpdate:", error);
    }
  };
  return (
    <div className="row m-auto p-2">
      <div className="row text-center">
        <div className="col-md-3 d-flex m-auto">
          <span className="m-auto text-bold">Painting Banner Management </span>
          <MdOutlineLibraryAdd
            onClick={() => setOpen(true)}
            className="m-auto"
          />
        </div>
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
            {Edit ? "Edit Webbanner" : "Add Painting Banner"}{" "}
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
            <Form.Label>Painting Banner Link</Form.Label>
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
          {Edit ? (
            <Button
              className="col-md-2"
              variant="primary"
              onClick={handleUpdate}
            >
              update
            </Button>
          ) : (
            <Button
              className="col-md-2"
              variant="primary"
              onClick={handleAddBanner}
            >
              save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
