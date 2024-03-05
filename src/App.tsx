import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
// import "leaflet/dist/leaflet.css";
import Loader from "./components/loader/Loader";

const SharedLayout = lazy(() => import("./components/layout/Layout"));
const DrugStorePage = lazy(
  () => import("./pages/drugStoresPage/DrugStoresPage")
);
const ShoppingCardPage = lazy(
  () => import("./pages/shoppingCardPage/ShoppingCardPage")
);

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<DrugStorePage />} />
          <Route path="shopping-card" element={<ShoppingCardPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
