import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineLibraryAdd } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function Category() {
  const [open, setOpen] = useState(false);
  const [Services, setServices] = useState([]);
  const [CateLink, setCateLink] = useState("");
  const [SelectCate, setSelectCate] = useState("");
  const [Edit, setEdit] = useState(null);
  const [filterData, setfilterData] = useState([]);
  const [SearchValue, setSearchValue] = useState("");

  const columns = [
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Subcategory",
      selector: (row) => row.Subcategory,
    },
    {
      name: "Services name",
      selector: (row) => row.serviceName,
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

  const handleSaveOrUpdate = async () => {
    try {
      const url = `https://api.vijayhomeservice.com/api/userapp/updateservicelink/${
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
        getServices();
        window.location.reload("");
      }
    } catch (error) {
      console.log("Error in handleSaveOrUpdate:", error);
    }
  };

  useEffect(() => {
    getServices();
    if (Edit) {
      setCateLink(Edit.imglink);
      setSelectCate(Edit._id);
    }
  }, [Edit]);

  const getServices = async () => {
    try {
      const res = await axios.get(
        "https://api.vijayhomeservice.com/api/userapp/getserviced"
      );
      // console.log(res.data, "res.data");
      setServices(res.data.services);
      // console.log(res.data);
      console.log(res);
    } catch (error) {
      console.log("Error in getServices:", error);
    }
  };

  const handleEdit = (row) => {
    setEdit(row);
    setOpen(true);
  };
  // console.log(Services);
  useEffect(() => {
    let value = SearchValue.toLowerCase();
    let data = Services.filter((ele) =>
      ele?.serviceName?.toLowerCase()?.includes(value)
    );
    setfilterData(data);
  }, [Services, SearchValue]);
  return (
    <div className="row m-auto p-2">
      <div className="row text-center">
        {/* <div className="col-md-3 d-flex m-auto">
          <span className="m-auto text-bold">Services Management </span>
          <MdOutlineLibraryAdd onClick={handleAddCategory} className="m-auto cursor" />
        </div> */}
        <div className="col-md-2">
          <Form.Control
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search  Services"
          />
        </div>
      </div>
      <DataTable
        className="mt-2"
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
          <Modal.Title>{Edit ? "Edit Services" : "Add Services"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Services</Form.Label>
            {Edit ? (
              <Form.Control value={Edit.serviceName} readOnly />
            ) : (
              <Form.Select
                value={SelectCate}
                onChange={(e) => setSelectCate(e.target.value)}
              >
                <option value="">Select Services</option>
                {Services?.map((Ele) => (
                  <option key={Ele._id} value={Ele._id}>
                    {Ele.serviceName}
                  </option>
                ))}
              </Form.Select>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Services Link</Form.Label>
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
