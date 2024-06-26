import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ApproveHotel from "./pages/ApproveHotel";
import DetailHotel from "./pages/DetailApproveHotel";
import FacilityType from "./pages/FacilityType";
import HotelFacility from "./pages/ListFacilities";
import DashBoard from "./pages/DashBoard";
import ManageHotel from "./pages/ManageHotel";
import ManageAccount from "./pages/ManageAccount";
import DetailManageHotel from "./pages/DetailManageHotel";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/approval-hotel/:hotel_id" element={<DetailHotel />} />
      <Route path="/approval-hotel" element={<ApproveHotel />} />
      <Route path="/facility-type" element={<FacilityType />} />
      <Route path="/facilities" element={<HotelFacility />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/manage-hotel" element={<ManageHotel />} />
      <Route path="/manage-account" element={<ManageAccount />} />
      <Route path="/manage-hotel/:id" element={<DetailManageHotel />} />
    </Routes>
  );
}
