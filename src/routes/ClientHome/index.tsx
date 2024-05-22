import { Outlet } from "react-router-dom";
import HeaderClient from "../../components/HeaderClient";
import "./styles.css";

export default function ClientHome() {
  return (
    <>
      <HeaderClient />
      <Outlet />
    </>
  );
}
