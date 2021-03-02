import { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

class Layout extends Component {
  render() {
    const {children} = this.props;
    return (
      <>
        <Header />
        <div className="content wrapper">
          <Sidebar />
          <div className="content__page">{children}</div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Layout;
