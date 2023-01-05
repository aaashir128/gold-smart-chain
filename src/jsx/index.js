import React, { useContext } from "react";
/// React router dom
import { Switch, Route, useParams } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";
import "react-toastify/dist/ReactToastify.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";
/// Dashboard
import Home from "./components/Dashboard/Home";
import DashboardDark from "./components/Dashboard/DashboardDark";
import Kanban from "./components/Dashboard/Kanban";
import ProjectDetails from "./components/Dashboard/ProjectDetails";
import Messages from "./components/Dashboard/Messages";
import LatestActivity from "./components/Dashboard/LatestActivity";
import Clients from "./components/Dashboard/Clients";
import Task from "./components/Dashboard/Task";

import Deposit from "./components/Deposit/Deposit";

/////Demo
import Theme1 from "./components/Dashboard/Demo/Theme1";
import Theme2 from "./components/Dashboard/Demo/Theme2";
import Theme3 from "./components/Dashboard/Demo/Theme3";
import Theme4 from "./components/Dashboard/Demo/Theme4";
import Theme5 from "./components/Dashboard/Demo/Theme5";
import Theme6 from "./components/Dashboard/Demo/Theme6";

/// App
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";

/// Charts
// import SparklineChart from "./components/charts/Sparkline";
import ChartJs from "./components/charts/Chartjs";
import Chartist from "./components/charts/chartist";
import RechartJs from "./components/charts/rechart";
import ApexChart from "./components/charts/apexcharts";

/// Bootstrap
import UiAlert from "./components/bootstrap/Alert";
import UiAccordion from "./components/bootstrap/Accordion";
import Discover from "./components/Discover/Discover";
import UiBadge from "./components/bootstrap/Badge";
import UiButton from "./components/bootstrap/Button";
import UiModal from "./components/bootstrap/Modal";
import UiButtonGroup from "./components/bootstrap/ButtonGroup";
import UiListGroup from "./components/bootstrap/ListGroup";
import UiMediaObject from "./components/bootstrap/MediaObject";
import UiCards from "./components/bootstrap/Cards";
import UiCarousel from "./components/bootstrap/Carousel";
import UiDropDown from "./components/bootstrap/DropDown";
import UiPopOver from "./components/bootstrap/PopOver";
import UiProgressBar from "./components/bootstrap/ProgressBar";
import UiTab from "./components/bootstrap/Tab";
import UiPagination from "./components/bootstrap/Pagination";
import UiGrid from "./components/bootstrap/Grid";
import UiTypography from "./components/bootstrap/Typography";

/// Plugins
import Select2 from "./components/PluginsMenu/Select2/Select2";

import MainSweetAlert from "./components/PluginsMenu/SweetAlert/SweetAlert";
// import Toastr from "./components/PluginsMenu/Toastr/Toastr";

//Redux
import IndexReduxSimpaleForm from "./pages/IndexReduxSimpaleForm";
import Todo from "./pages/Todo";
//import ReduxForm from "./components/Forms/ReduxForm/ReduxForm";
import WizardForm from "./components/Forms/ReduxWizard/Index";

/// Widget
import Widget from "./pages/Widget";

/// Table
import SortingTable from "./components/table/SortingTable/SortingTable";
import FilteringTable from "./components/table/FilteringTable/FilteringTable";
import DataTable from "./components/table/DataTable";
import BootstrapTable from "./components/table/BootstrapTable";

/// Form
import Element from "./components/Forms/Element/Element";
import Wizard from "./components/Forms/Wizard/Wizard";
import SummerNote from "./components/Forms/Summernote/SummerNote";
import Pickers from "./components/Forms/Pickers/Pickers";
import jQueryValidation from "./components/Forms/jQueryValidation/jQueryValidation";

/// Pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
// import Setting from "./layouts/Setting";
import { ThemeContext } from "../context/ThemeContext";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import DepositHistory from "./components/Dashboard/DepositHistory";
import Withdrawl from "./components/Withdrawl/Withdrawl";
import Portfolio from "./components/Portfolio/Portfolio";
import Breakdown from "./components/Portfolio/Breakdown";
import TradeHistory from "./components/TradeHistory/TradeHistory";

// Admin PAges
import UserManagement from "./components/AdminScreen/UserManagement";
import ProfitLossManagement from "./components/AdminScreen/ProfitLossManagement";
import CommissionSettings from "./components/AdminScreen/CommissionSettings";
import ManageCoins from "./components/AdminScreen/ManageCoins";
import Market from "./components/Market/Market";
import DepositRequest from "./components/AdminScreen/DepositRequest";
import WithdrawalRequests from "./components/AdminScreen/WithdrawalRequests";
import TransactionHistoryScreen from "./components/Transaction history Screen/TransactionHistoryScreen";
import DiscoverScreen from "./components/Discover Screen/DiscoverScreen";
import Exchange from "./components/Exchange/Exchange";
import Buy from "./components/Buy/Buy";
import Sell from "./components/Sell/Sell";

const Markup = () => {
  let { coin } = useParams();
  const { menuToggle } = useContext(ThemeContext);
  const routes = [
    /// Admin Pages
    { url: "user-management", component: UserManagement },
    { url: "manage-coins", component: ManageCoins },
    { url: "deposit-requests", component: DepositRequest },
    { url: "withdrawal-requests", component: WithdrawalRequests },
    { url: "pl-management", component: ProfitLossManagement },
    { url: "commission-settings", component: CommissionSettings },

    /// Dashboard
    { url: "", component: Home },
    { url: "dashboard", component: Home },
    { url: "dashboard-dark", component: DashboardDark },
    { url: "kanban", component: Kanban },
    { url: "messages", component: Messages },
    { url: "project-details", component: ProjectDetails },
    { url: "latest-activity", component: LatestActivity },
    { url: "clients", component: Clients },
    { url: "task", component: Task },
    { url: "deposit", component: Deposit },
    { url: "withdrawl", component: Withdrawl },
    { url: "trade-history", component: TradeHistory },
    { url: "transaction-history", component: TransactionHistoryScreen },

    ///Portfolio
    { url: "portfolio", component: Portfolio },
    { url: "portfolio/breakdown/:coin", component: Breakdown },
    ///Demo
    { url: "horizontal-sidebar", component: Theme1 },
    { url: "nav-header", component: Theme2 },
    { url: "dashboard-header", component: Theme3 },
    { url: "primary-sidebar", component: Theme4 },
    { url: "dark-sidebar", component: Theme5 },
    { url: "mini-sidebar", component: Theme6 },

    //Market
    { url: "market", component: Market },

    //Exchange
    { url: "exchange", component: Exchange },

    //Buy
    { url: "buy", component: Buy },

    //Sell
    { url: "sell", component: Sell },

    /// Apps
    { url: "app-profile", component: AppProfile },
    { url: "admin-dashboard", component: AdminDashboard },
    { url: "deposit-history", component: DepositHistory },

    /// Chart
    // { url: "chart-sparkline", component: SparklineChart },
    { url: "chart-chartjs", component: ChartJs },
    { url: "chart-chartist", component: Chartist },
    { url: "chart-apexchart", component: ApexChart },
    { url: "chart-rechart", component: RechartJs },

    // Discover
    { url: "discover", component: DiscoverScreen },

    { url: "ui-alert", component: UiAlert },
    { url: "ui-badge", component: UiBadge },
    { url: "ui-button", component: UiButton },
    { url: "ui-modal", component: UiModal },
    { url: "ui-button-group", component: UiButtonGroup },
    { url: "ui-accordion", component: UiAccordion },
    { url: "ui-list-group", component: UiListGroup },
    { url: "ui-media-object", component: UiMediaObject },
    { url: "ui-card", component: UiCards },
    { url: "ui-carousel", component: UiCarousel },
    { url: "ui-dropdown", component: UiDropDown },
    { url: "ui-popover", component: UiPopOver },
    { url: "ui-progressbar", component: UiProgressBar },
    { url: "ui-tab", component: UiTab },
    { url: "ui-pagination", component: UiPagination },
    { url: "ui-typography", component: UiTypography },
    { url: "ui-grid", component: UiGrid },

    /// Plugin
    { url: "uc-select2", component: Select2 },
    // { url: "uc-nestable", component: Nestable },
    // { url: "uc-noui-slider", component: MainNouiSlider },
    { url: "uc-sweetalert", component: MainSweetAlert },
    // { url: "uc-toastr", component: Toastr },
    // { url: "map-jqvmap", component: JqvMap },
    // { url: "uc-lightgallery", component: Lightgallery },

    ///Redux
    { url: "todo", component: Todo },
    { url: "redux-form", component: IndexReduxSimpaleForm },
    //{ url: "redux-form", component: ReduxForm },
    { url: "redux-wizard", component: WizardForm },

    /// Widget
    { url: "widget-basic", component: Widget },

    /// Shop
    // { url: "ecom-product-grid", component: ProductGrid },
    // { url: "ecom-product-list", component: ProductList },
    // { url: "ecom-product-detail", component: ProductDetail },
    // { url: "ecom-product-order", component: ProductOrder },
    // { url: "ecom-checkout", component: Checkout },
    // { url: "ecom-invoice", component: Invoice },
    // { url: "ecom-product-detail", component: ProductDetail },
    // { url: "ecom-customers", component: Customers },

    /// Form
    { url: "form-element", component: Element },
    { url: "form-wizard", component: Wizard },
    { url: "form-editor-summernote", component: SummerNote },
    { url: "form-pickers", component: Pickers },
    { url: "form-validation-jquery", component: jQueryValidation },

    /// table
    { url: "table-filtering", component: FilteringTable },
    { url: "table-sorting", component: SortingTable },
    // { url: "portfolio", component: DataTable },
    { url: "table-bootstrap-basic", component: BootstrapTable },

    /// pages
    { url: "page-register", component: Registration },
    { url: "page-lock-screen", component: LockScreen },
    { url: "page-login", component: Login },
    { url: "page-forgot-password", component: ForgotPassword },
    { url: "page-error-400", component: Error400 },
    { url: "page-error-403", component: Error403 },
    { url: "page-error-404", component: Error404 },
    { url: "page-error-500", component: Error500 },
    { url: "page-error-503", component: Error503 },
  ];
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "vh-100"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? "content-body" : ""}`}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                />
              ))}
            </Switch>
          </div>
        </div>
        {/* {!pagePath && <Footer />} */}
      </div>
      {/* <Setting /> */}
      <ScrollToTop />
    </>
  );
};

export default Markup;
