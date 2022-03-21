import { Footer, Header } from "components";
import { Outlet } from "react-router";


const ScrollLayout = () => {
  return <div>
    <Header />
    <Outlet />
    <Footer />
  </div>
}

export default ScrollLayout;