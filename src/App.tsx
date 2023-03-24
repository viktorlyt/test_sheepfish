import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./Pages/home/Home";
import { Header } from "./Components/Header";
import { NotFoundPage } from "./Pages/NotFoundPage";
import Products from "./Pages/products/products";

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/products">
          <Route index element={<Products />} />
          <Route path=":personSlug" element={<Products />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
