/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect, useState } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
// import watchListIcon from "../../../icons/sidebar/watchlist.png";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new Metismenu(this.$el);
  }
  componentWillUnmount() {}
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const SideBar = () => {
  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext);
  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);

    //sidebar icon Heart blast
    var handleheartBlast = document.querySelector(".heart");
    function heartBlast() {
      return handleheartBlast.classList.toggle("heart-blast");
    }
    handleheartBlast.addEventListener("click", heartBlast);
  }, []);

  // For scroll
  const [hideOnScroll, setHideOnScroll] = useState(true);
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll]
  );

  //let scrollPosition = useScrollPosition();

  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  let deshBoard = [
      "dashboard",
      "dashboard-dark",
      "kanban",
      "clients",
      "project-details",
      "messages",
      "latest-activity",
      "task",
    ],
    app = [
      "app-profile",
      "post-details",
      "app-calender",
      "email-compose",
      "email-inbox",
      "email-read",
      "ecom-product-grid",
      "ecom-product-list",
      "ecom-product-order",
      "ecom-checkout",
      "ecom-invoice",
      "ecom-customers",
      "post-details",
      "ecom-product-detail",
    ],
    deposit = ["deposit"],
    portfolio = ["portfolio"],
    withdrawl = ["withdrawl"],
    discover = ["discover"],
    buy = ["buy"],
    exchange = ["exchange"],
    settings = ["settings"],
    pages = [
      "page-register",
      "page-login",
      "page-lock-screen",
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ],
    error = [
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ];
  return (
    <div
      className={`dlabnav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? hideOnScroll > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      <PerfectScrollbar className="dlabnav-scroll">
        <MM className="metismenu" id="menu">
          <ul>
            <li>
              <Link
                className={`${path === "dashboard" ? "mm-active" : ""}`}
                to="/admin-dashboard"
              >
                Admin Dashboard
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "dashboard-dark" ? "mm-active" : ""}`}
                to="/dashboard-dark"
              >
                Dashboard Dark
              </Link>
            </li>
          </ul>
          <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/dashboard">
              <i className="fas fa-home"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>
          <ul></ul>

          <li className={`${buy.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/buy">
              {/* <i className="fas fa-coins"></i> */}

              <i className="fas fa-clipboard-list"></i>
              <span className="nav-text">Buy</span>
            </Link>
          </li>

          {/* </li> */}

          {/* li for Watchlist */}
          {/* <li className={`${portfolio.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/portfolio">
              <i className="fas fa-dollar-sign"></i>
              <span className="nav-text">Withdraw</span>
            </Link>
          </li> */}
          {/* <li className={`${pages.includes(path) ? "mm-active" : ""}`}>
            <Link to="market" className="ai-icon">
              <i className="fas fa-poll"></i>
              <span className="nav-text">Market</span>
            </Link>
          </li> */}
          <li className={`${deposit.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/deposit">
              <i className="fas fa-wallet"></i>
              <span className="nav-text">Deposit</span>
            </Link>
          </li>
          <li className={`${withdrawl.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/withdrawl">
              <i className="fas fa-money-bill-alt"></i>
              <span className="nav-text">Withdrawal</span>
            </Link>
          </li>
          <li className={`${exchange.includes(path) ? "mm-active" : ""}`}>
            <Link to="/exchange" className="ai-icon">
              <i className="fas fa-chart-line"></i>
              <span className="nav-text">Exchange</span>
            </Link>
          </li>
          <li className={`${settings.includes(path) ? "mm-active" : ""}`}>
            <Link to="/settings" className="ai-icon">
              <i className="fas fa-chart-line"></i>
              <span className="nav-text">Settings</span>
            </Link>
          </li>
          {/* <li className={`${pages.includes(path) ? "mm-active" : ""}`}>
            <Link to="/trade-history" className="ai-icon">
              <i className="fas fa-chart-line"></i>
              <span className="nav-text">Trade History</span>
            </Link>
          </li>

          <li className={`${pages.includes(path) ? "mm-active" : ""}`}>
            <Link to="transaction-history" className="ai-icon">
              <i className="fas fa-history"></i>
              <span className="nav-text">Transaction History</span>
            </Link>
          </li>

          <li className={`${discover.includes(path) ? "mm-active" : ""}`}>
            <Link to="discover" className="ai-icon">
              <i className="far fa-compass"></i>
              <span className="nav-text">Discover</span>
            </Link>
          </li> */}
        </MM>
        <div className="plus-box">
          <div className="text-center"></div>
        </div>
        <div className="copyright">
          <p>
            <strong>Prime Crypto Exchange</strong> © 2022 All Rights Reserved
          </p>
          <p className="fs-12">
            <span className="heart" style={{ display: "none" }}></span>
          </p>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
