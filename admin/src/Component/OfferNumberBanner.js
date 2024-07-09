import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineLibraryAdd } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function OfferNumberBanner() {
  const [open, setOpen] = useState(false);
  const [Category, setCategory] = useState([]);
  const [OfferNumBanner, setOfferNumBanner] = useState("");
  const [PopupbannerData, setPopupbannerData] = useState([]);
  const [SelectCate, setSelectCate] = useState("");
  const [Edit, setEdit] = useState(null);
  console.log(PopupbannerData, "PopupbannerData");
  const columns = [
    {
      name: "Offers number banner",
      selector: (row) => (
        <img width={100} height={100} src={row?.offerNumbanner} />
      ),
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
    setOfferNumBanner("");
    setOpen(true);
  };

  const handleSaveOrUpdate = async () => {
    try {
      const url = `https://api.vijayhomeservice.com/api/vbanner/updateoffernumbanner/${
        Edit ? Edit._id : SelectCate
      }`;
      const config = {
        url,
        method: "put",
        data: {
          offerNumbanner: OfferNumBanner,
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

  const handleAddOffBanner = async () => {
    try {
      const config = {
        url: "https://api.vijayhomeservice.com/api/vbanner/addoffernumbanner",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: {
          offerNumbanner: OfferNumBanner,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert("added successfully");
        setOpen(false);
        getcategory();
        getallOfferNumBanner();
      }
    } catch (error) {
      console.log("Error in handleSaveOrUpdate:", error);
    }
  };

  useEffect(() => {
    getcategory();
    getallOfferNumBanner();
    if (Edit) {
      setOfferNumBanner(Edit.offerNumbanner);
    }
  }, [Edit]);

  const getcategory = async () => {
    try {
      const res = await axios.get("https://api.vijayhomeservice.com/api/getcategory");
      // setCategory(res.data.category);
    } catch (error) {
      console.log("Error in getcategory:", error);
    }
  };

  const getallOfferNumBanner = async () => {
    try {
      const res = await axios.get(
        "https://api.vijayhomeservice.com/api/vbanner/getalloffernumbanner"
      );
      console.log(res.data);
      setPopupbannerData(res.data.banner);
    } catch (error) {
      console.log("Error in getcategory:", error);
    }
  };

  const handleDelete = async (row) => {
    try {
      const res = await axios.post(
        `https://api.vijayhomeservice.com/api/vbanner/deleteoffernumbanner/${row._id}`
      );
      if (res.status === 200) {
        alert("Deleted Succesfully");
        getallOfferNumBanner();
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
            Offer Number Banner management{" "}
          </span>
          <MdOutlineLibraryAdd
            onClick={handleAddCategory}
            className="m-auto cursor"
          />
        </div>
      </div>
      <DataTable columns={columns} data={PopupbannerData} pagination={true} />

      <Modal
        show={open}
        onHide={() => setOpen(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {Edit ? "Edit Offer Number Banner " : "Add Offer Number Banner "}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Form.Group className="mb-3">
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
          </Form.Group> */}
          <Form.Group className="mb-3">
            <Form.Label> Offer Number Banner Link</Form.Label>
            <Form.Control
              onChange={(e) => setOfferNumBanner(e.target.value)}
              type="text"
              placeholder="View image"
              value={OfferNumBanner}
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
              onClick={handleAddOffBanner}
            >
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
