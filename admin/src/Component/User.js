import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineLibraryAdd } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function UserData() {
  const [open, setOpen] = useState(false);
  const [customerData, setcustomerData] = useState([]);
  const [CateLink, setCateLink] = useState("");
  const [SelectCate, setSelectCate] = useState("");
  const [Edit, setEdit] = useState(null);

  const columns = [
    {
      name: "Username",
      selector: (row) => row.customerName,
    },
    {
      name: "Mob.No",
      selector: (row) => row.mainContact,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "City",
      selector: (row) => row.city,
    },

    // {
    //   name: "Action",
    //   selector: (row) => <span>Edit</span>,
    // },
  ];

  useEffect(() => {
    getusers();
    if (Edit) {
      setCateLink(Edit.imglink);
      setSelectCate(Edit._id);
    }
  }, [Edit]);

  const getusers = async () => {
    try {
      const res = await axios.get("https://api.vijayhomeservice.com/api/getbywebsite");
      setcustomerData(res.data.customers);
    
    } catch (error) {
      console.log("Error in user:", error);
    }
  };

  return (
    <div className="row m-auto p-2">
      <DataTable columns={columns} data={customerData} pagination={true} />
    </div>
  );
}
