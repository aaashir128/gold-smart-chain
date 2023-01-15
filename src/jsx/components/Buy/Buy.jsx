import React, { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Row } from "react-bootstrap";
import ProjectSlider from "../Dashboard/Dashboard/ProjectSlider";
import { ToastContainer, toast } from "react-toastify";
import PageTitle from "../../layouts/PageTitle";
import axios from "axios";
import { baseURL } from "../../../Strings/Strings";
import standCoin from "../../../images/stand.png";
import solidCoin from "../../../images/solid.png";
import CurrencyFormat from "react-currency-format";
import styles from "./Buy.module.scss";

function Buy(props) {
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState(0);
  const [coin, setCoin] = useState();
  const [solidValue, setSolidValue] = useState(0);
  const [data, setData] = useState([]);
  const tokn = JSON.parse(localStorage.getItem("token"));
  const [buyAmount, setBuyAmount] = useState({ usd: 1, solid: 1 });

  const changeAmountUsd = (e) => {
    console.log("val", e.target.value);
    setBuyAmount({
      ...buyAmount,
      usd: Number(e.target.value),
      solid: Number(e.target.value / solidValue),
    });
  };
  const changeAmountSolid = (e) => {
    setBuyAmount({
      ...buyAmount,
      solid: Number(e.target.value),
      usd: Number(e.target.value * solidValue),
    });
  };

  const notifyTopRight = async (e) => {
    e.preventDefault();

    if (buyAmount.usd > 0) {
      console.log("amount is sufficent");
      let token = await localStorage.getItem("token");
      token = JSON.parse(token);
      console.log("token", token);

      let usr = await localStorage.getItem("user");
      usr = JSON.parse(usr);
      console.log("usr", usr);

      const postData = {
        user_id: usr?.id,
        solid_coin: parseFloat(buyAmount.solid),
        invest_amount: parseFloat(buyAmount.usd),
      };
      console.log("postData", postData);
      const { data: st } = await axios
        .post(`${baseURL}/api/solidcoin/`, postData, {
          headers: { "x-auth-token": token },
        })
        // .then((res) => {
        //   console.log(res, "res");
        // })
        .catch((err) => {
          console.log("err", err.response.data);
        });
      if (st) {
        toast.success("✔️ Buy Request Initiated!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          onClose: () => props.history.push("/dashboard"),
        });
        // setTimeout(() => {
        //   props.history.push("/dashboard");
        // }, 5000);
        // props.history.push("/dashboard");
      }
    } else {
      console.log("amount not sufficent");
      toast.error("❌ Invalid Amount", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    let usr = localStorage.getItem("user");
    usr = JSON.parse(usr);
    console.log("token", tokn);
    axios
      .get(`${baseURL}/api/wallet/${usr?.id}`, {
        headers: { "x-auth-token": tokn },
      })
      .then((res) => {
        // console.log(res, "res");
        setData(res?.data);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get(`${baseURL}/api/solidcoin/${usr?.id}`, {
        headers: { "x-auth-token": tokn },
      })
      .then((res) => {
        // console.log(res, "resCoin");
        setCoin(res?.data?.solid_coin);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get(`${baseURL}/api/solidvalue`, {
        headers: { "x-auth-token": tokn },
      })
      .then((res) => {
        console.log("Message", res.data);
        setSolidValue(res?.data?.value);
        setBuyAmount({ ...buyAmount, usd: res?.data?.value });
      })
      .catch((e) => {
        console.log("errorMessage", e.response.data);
      });
  }, []);
  return (
    <>
      <PageTitle motherMenu="Home" activeMenu="Buy" />
      <div className="d-flex align-items-center justify-content-center">
        <div className="col-xl-8 col-lg-8" style={{ marginTop: "0%" }}>
          <div className="card align-items-center justify-content-center">
            <div className="card-header ">
              <h4 className="card-title ">Buy SOLID token</h4>
            </div>
            {/* <form onSubmit={(e) => notifyTopRight(e)}> */}
            <div className="col-xl-6 col-lg-6 m-auto border rounded p-4 my-4">
              <div className="d-flex justify-content-between">
                <p>Spend</p>
                <p className="d-flex">
                  <p className="mx-1">Available:</p>
                  {data?.balance >= 1 ? (
                    <CurrencyFormat
                      value={data?.balance}
                      displayType={"text"}
                      decimalScale={2}
                      thousandSeparator={true}
                      prefix={"$"}
                      fixedDecimalScale={true}
                      renderText={(value) => <p>{value}</p>}
                    />
                  ) : (
                    "0.00"
                  )}
                </p>
              </div>

              <div className="d-flex justify-content-between">
                <input
                  type="number"
                  value={buyAmount.usd}
                  onChange={(e) => changeAmountUsd(e)}
                  placeholder="1000"
                  className="border-0"
                />
                <div className={styles["tokenDiv"]}>
                  <p>$USD</p>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 m-auto border rounded p-4 my-4">
              <div className="d-flex justify-content-between">
                <p>Receive</p>
                <p className="d-flex">
                  <p className="mx-1">Available:</p>
                  {coin >= 1 ? (
                    <CurrencyFormat
                      value={coin}
                      displayType={"text"}
                      decimalScale={2}
                      thousandSeparator={true}
                      // prefix={"$"}
                      fixedDecimalScale={true}
                      renderText={(value) => <p>{value}</p>}
                    />
                  ) : (
                    "0.00"
                  )}
                </p>
              </div>
              {/* <div className="d-flex justify-content-between">
                <p>Receive</p>
                <div className="d-flex">
                  <p className="mx-1">Available:</p>
                  {coin >= 1 ? (
                    <CurrencyFormat
                      value={coin}
                      displayType={"text"}
                      decimalScale={2}
                      thousandSeparator={true}
                      // prefix={"$"}
                      fixedDecimalScale={true}
                      renderText={(value) => <p>{value}</p>}
                    />
                  ) : (
                    "0.00"
                  )}
                </div>
              </div> */}

              <div className="d-flex justify-content-between">
                <input
                  type="number"
                  value={buyAmount.solid}
                  onChange={(e) => changeAmountSolid(e)}
                  placeholder="0.04"
                  className="border-0"
                />
                <div className={styles["tokenDiv"]}>
                  <img
                    src={solidCoin}
                    width="36px"
                    height="36px"
                    style={{ objectFit: "contain" }}
                  />
                  <p>Solid</p>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 m-auto  d-flex justify-content-between">
              <p>Price</p>
              <p className="d-flex">
                1 Solid =
                <CurrencyFormat
                  value={solidValue}
                  displayType={"text"}
                  decimalScale={2}
                  thousandSeparator={true}
                  prefix={"$"}
                  fixedDecimalScale={true}
                  renderText={(value) => <p>{value}</p>}
                />
              </p>
            </div>

            <button
              // type="submit"
              onClick={notifyTopRight}
              // onClick={(e) => notifyTopRight(e)}
              className="btn btn-primary my-4 text-center"
              style={{ width: "120px" }}
            >
              Continue
            </button>
            {/* </form> */}
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </>
  );
}

export default Buy;
