import { Routes, Route } from "react-router-dom";
import { Team,BusinessProfile, RolesPermissions, Login, OTP,Catalogue,Dashboard  } from "../../pages";

const RouteTypo = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/team" element={<Team />} />
        <Route path="/business-profile" element={<BusinessProfile/>} />
        <Route path="/roles-permissions" element={<RolesPermissions/>} />
        <Route path="/catalogue" element={<Catalogue/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </>
  );
};

export default RouteTypo;
