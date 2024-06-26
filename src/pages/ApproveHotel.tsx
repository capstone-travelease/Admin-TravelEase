import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import TableHeader from "../components/TableHeader";
import TableRow from "../components/TableRow";
import TableImage from "../components/TableImage";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import ActionButton from "../components/TableButton";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import { api, partner_api_image } from "../constants/api";
import { FaCheck } from "react-icons/fa6";
import Modal from "antd/es/modal/Modal";

const ITEMS_PER_PAGE = 6;

const headers = ["Image", "Name", "Email", "Phone", "Action"];

interface DataHotel {
  hotel_id: number;
  hotel_name: string;
  hotel_email: string;
  hotel_address: string;
  hotel_contact_number: string;
  hotel_images: "";
}

export default function ApproveHotel() {
  const [currentPage, setCurrentPage] = useState(0);
  const [dataHotel, setDataHotel] = useState<DataHotel[]>([]);

  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleDetailApprove = (id: number) => {
    navigate(`/approval-hotel/${id}`);
  };

  const fetchDataHotel = async () => {
    try {
      const response = await axios.get(`${api}/approval-hotels`);
      const data = await response.data;
      setDataHotel(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [approveAlert, setApproveAlert] = useState(false);

  const handleApproveHotel = async (hotel_id: number) => {
    try {
      const response = await axios.post(
        `${api}/approval-hotel/approve/${hotel_id}`
      );
      if (response.status === 200) {
      } else {
        console.error(
          `Failed to approve hotel. Status code: ${response.status}`
        );
      }
    } catch (error) {
      console.error(`Error during hotel approval: ${error.message}`);
    }
  };

  const handleRejectHotel = async (hotel_id: number) => {
    try {
      const response = await axios.post(
        `${api}/approval-hotel/reject/${hotel_id}`
      );
      if (response.status === 200) {
        setApproveAlert(true);
      } else {
        console.error(
          `Failed to approve hotel. Status code: ${response.status}`
        );
      }
    } catch (error) {
      console.error(`Error during hotel approval: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchDataHotel();
  }, [handleRejectHotel, handleApproveHotel]);

  function handleOk() {
    return setApproveAlert(false);
  }

  return (
    <>
      <Header pageTitle="Approve Hotel" />

      <div className="flex">
        <SideBar />
        <div className=" bg-secondary h-[100vh] p-5 w-full pl-[240px] pt-[90px] flex flex-col gap-4">
          <div className=" bg-white p-6 h-full">
            <p className=" w-full text-2xl font-[400]">Approve Hotel</p>

            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-4 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <TableHeader headers={headers} />
                      <tbody>
                        {dataHotel.map((item, index) => (
                          <tr
                            className=" border-stroke border-[1px]"
                            key={index}
                          >
                            <TableImage
                              data={
                                item.hotel_images[0]
                                  ? partner_api_image + item.hotel_images[0]
                                  : "https://www.capstone-api-partner.online//hotel_images/minh-pham-OtXADkUh3-I-unsplash.jpg"
                              }
                            />

                            <TableRow
                              data={item.hotel_name}
                              onClick={() => handleDetailApprove(item.hotel_id)}
                            />
                            <TableRow
                              data={item.hotel_email}
                              onClick={undefined}
                            />
                            <TableRow
                              data={item.hotel_contact_number}
                              onClick={undefined}
                            />

                            <td className="px-6 py-4 text-sm font-normal text-black ">
                              <div className="flex gap-7">
                                <ActionButton
                                  Icon={CiCircleCheck}
                                  buttonText="Approve"
                                  onClick={() =>
                                    handleApproveHotel(item.hotel_id)
                                  }
                                />
                                <ActionButton
                                  Icon={CiCircleRemove}
                                  buttonText="Reject"
                                  onClick={() =>
                                    handleRejectHotel(item.hotel_id)
                                  }
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <Modal
                centered
                open={approveAlert}
                closeIcon={false}
                footer={false}
              >
                <div className="flex flex-col justify-center items-center gap-5">
                  <div className=" bg-primary p-5 rounded-full w-[90px] h-[90px] items-center flex  justify-center  -mt-14">
                    <FaCheck className="text-white w-full h-full" />
                  </div>
                  <div className="text-2xl">Successful</div>
                  <button
                    onClick={handleOk}
                    className="bg-secondary text-primary border-[1px] border-primary p-4 px-6 rounded-lg w-[200px] transition-all hover:bg-primary hover:text-secondary"
                  >
                    OK
                  </button>
                </div>
              </Modal>

              <div className=" flex justify-end ">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className=" text-xs border-[1px] border-stroke text-black py-2 px-4 rounded-md mx-1 hover:bg-gray_bg"
                >
                  Back
                </button>

                {Array(Math.ceil(dataHotel.length / ITEMS_PER_PAGE))
                  .fill(null)
                  .map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index)}
                      className={` text-xs border-[1px] border-stroke text-black py-2 px-4 rounded-md mx-1 hover:bg-gray_bg ${
                        index === currentPage ? "bg-gray_bg" : ""
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(dataHotel.length / ITEMS_PER_PAGE) - 1
                  }
                  className="text-xs border-[1px] border-stroke text-black py-2 px-4 rounded-md mx-1 hover:bg-gray_bg "
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
