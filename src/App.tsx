import { Routes, Route, Navigate } from "react-router-dom";
import { MasterPage } from "@page/masters/master.page";
import { MasterProfilePage } from "@page/masters/master-profile.page";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/master" replace />} />
      <Route path="/master" element={<MasterPage />} />
      <Route path="/master/:username" element={<MasterProfilePage />} />
    </Routes>
  );
}

export default App;
