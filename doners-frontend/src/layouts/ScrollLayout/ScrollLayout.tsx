import { Header } from "components";
import { Outlet } from "react-router";


const ScrollLayout = () => {
  return <div>
    <Header />
    <Outlet />
  </div>
}

export default ScrollLayout;