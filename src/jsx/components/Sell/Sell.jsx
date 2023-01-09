import React, { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import PageTitle from "../../layouts/PageTitle";
import axios from "axios";
import { baseURL } from "../../../Strings/Strings";
import standCoin from "../../../images/stand.png";
import solidToken from "../../../images/solid.png";
import styles from "./Sell.module.scss";
import CurrencyFormat from "react-currency-format";

function Sell(props) {
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState(0);
  const [coin, setCoin] = useState([]);
  const [solid, setSolid] = useState();
  const [solidValue, setSolidValue] = useState(0);

  const [buyAmount, setBuyAmount] = useState({ usd: 1, solid: 1 });
  const tokn = JSON.parse(localStorage.getItem("token"));

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

    if (buyAmount.solid >= 0 || buyAmount.usd >= 0) {
      console.log("amount is sufficent");
      let token = await localStorage.getItem("token");
      token = JSON.parse(token);
      console.log("token", token);

      let usr = await localStorage.getItem("user");
      usr = JSON.parse(usr);
      console.log("usr", usr);

      const postData = {
        solid_coin: parseFloat(buyAmount.solid),
      };
      console.log("postData", postData);
      axios
        .put(`${baseURL}/api/solidcoin/${coin.id}`, postData, {
          headers: { "x-auth-token": token },
        })
        .then((res) => {
          console.log(res, "res");
          toast.success("✔️ Coin Sold!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            onClose: () => props.history.push("/dashboard"),
          });
        })
        .catch((err) => {
          console.log("err", err.response.data);
        });
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
    axios
      .get(`${baseURL}/api/wallet/${usr?.id}`, {
        headers: { "x-auth-token": tokn },
      })
      .then((res) => {
        // console.log(res, "res");
        setAmount(res?.data);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get(`${baseURL}/api/solidcoin/${usr?.id}`, {
        headers: { "x-auth-token": tokn },
      })
      .then((res) => {
        console.log(res, "resCoin");
        setCoin(res?.data);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get(`${baseURL}/api/exchangecoin/${usr?.id}`, {
        headers: { "x-auth-token": tokn },
      })
      .then((res) => {
        // console.log(res, "resExhcange");
        setSolid(res?.data?.exchange_coin_amount);
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
        setBuyAmount({ ...buyAmount, solid: res?.data?.value });
      })
      .catch((e) => {
        console.log("errorMessage", e.response.data);
      });
  }, []);
  return (
    <>
      <PageTitle motherMenu="Home" activeMenu="Sell" />
      <div className="d-flex align-items-center justify-content-center">
        <div className="col-xl-8 col-lg-8" style={{ marginTop: "0%" }}>
          <div className="card align-items-center justify-content-center">
            <div className="card-header ">
              <h4 className="card-title ">Sell Stand Coin</h4>
            </div>

            <div className="col-xl-6 col-lg-6 m-auto border rounded p-4 my-4">
              <div className="d-flex justify-content-between">
                <p>Sell</p>
                <p className="d-flex">
                  Available:{" "}
                  <CurrencyFormat
                    value={coin?.solid_coin}
                    displayType={"text"}
                    decimalScale={2}
                    thousandSeparator={true}
                    prefix={"$"}
                    fixedDecimalScale={true}
                    renderText={(value) => <p>{value}</p>}
                  />
                </p>
              </div>

              <div className="d-flex justify-content-between">
                <input
                  placeholder="0.04"
                  className="border-0"
                  value={buyAmount.stand}
                  onChange={(e) => changeAmountSolid(e)}
                />
                <div className={styles["tokenDiv"]}>
                  <img
                    src={solidToken}
                    width="36px"
                    height="36px"
                    style={{ objectFit: "contain" }}
                  />
                  <p>Solid</p>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 m-auto border rounded p-4 my-4">
              <div className="d-flex justify-content-between">
                <p>Recieve</p>
                <p className="d-flex">
                  Available:{" "}
                  <CurrencyFormat
                    value={amount?.balance}
                    displayType={"text"}
                    decimalScale={2}
                    thousandSeparator={true}
                    prefix={"$"}
                    fixedDecimalScale={true}
                    renderText={(value) => <p>{value}</p>}
                  />
                </p>
              </div>

              <div className="d-flex justify-content-between">
                <input
                  placeholder="1000"
                  className="border-0"
                  value={buyAmount.usd}
                  onChange={(e) => changeAmountUsd(e)}
                />
                <div className={styles["tokenDiv"]}>
                  <p>$USD</p>
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
              type="submit"
              className="btn btn-primary my-4 text-center"
              style={{ width: "120px" }}
              onClick={notifyTopRight}
            >
              Continue
            </button>
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

export default Sell;
