import { Routes, Route } from "react-router-dom";
import { TodayPage } from "../pages/TodayPage";
import { ByDatePage } from "../pages/ByDatePage";
import { SincePage } from "../pages/SincePage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<TodayPage />} />
      <Route path="/today" element={<TodayPage />} />
      <Route path="/by-date" element={<ByDatePage />} />
      <Route path="/since" element={<SincePage />} />
    </Routes>
  );
};
