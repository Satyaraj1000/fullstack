// src/components/EnquiryList.tsx
import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("/admin/enquiries", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnquiries(res.data.enquiries);
    };
    fetch();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Enquiry Submissions</h2>
      {enquiries.map((e) => (
        <div key={e._id} className="bg-white p-4 shadow-md rounded-md mb-4">
          <p>
            <strong>Name:</strong> {e.name}
          </p>
          <p>
            <strong>Email:</strong> {e.email}
          </p>
          {e.phone && (
            <p>
              <strong>Phone:</strong> {e.phone}
            </p>
          )}
          {e.product && (
            <p>
              <strong>Product:</strong> {e.product}
            </p>
          )}
          <p>
            <strong>Quantiy:</strong> {e.quantity}
          </p>
          <p>
            <strong>Message:</strong> {e.requirements}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EnquiryList;
