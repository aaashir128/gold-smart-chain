import React, { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Row } from "react-bootstrap";
import ProjectSlider from "../Dashboard/Dashboard/ProjectSlider";
import { ToastContainer, toast } from "react-toastify";
import PageTitle from "../../layouts/PageTitle";
import axios from "axios";
import { baseURL } from "../../../Strings/Strings";
import standCoinImage from "../../../images/stand.png";
import solidTokenImage from "../../../images/solid.png";
import styles from "./Exchange.module.scss";
import { ChangeCircle, ImportExport } from "@mui/icons-material";
import CurrencyFormat from "react-currency-format";

function Buy(props) {
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState(0);
  const [data, setData] = useState([]);
  const tokn = JSON.parse(localStorage.getItem("token"));
  const [solidToStand, setSolidToStand] = useState(true);
  const [standRate, setStandRate] = useState(0);
  const [solidCoin, setSolidCoin] = useState(0);
  const [standCoin, setStandCoin] = useState([]);
  const [buyAmount, setBuyAmount] = useState({ solid: 1, stand: standRate });

  const changeFields = () => {
    if (solidToStand === true) {
      setSolidToStand(false);
      // axios
      //   .get(`${baseURL}/api/exchangecoin/w/solidtostand/${1}`, {
      //     headers: { "x-auth-token": tokn },
      //   })
      //   .then((res) => {
      //     // console.log(res, "res");
      //     setStandRate(res?.data.standexchange);
      //   })
      //   .catch((err) => {
      //     console.log("err", err.response.data);
      //   });
    } else {
      setSolidToStand(true);
      // axios
      //   .get(`${baseURL}/api/exchangecoin/w/standtosolid/${1}`, {
      //     headers: { "x-auth-token": tokn },
      //   })
      //   .then((res) => {
      //     // console.log(res, "res");
      //     setStandRate(res?.data.standexchange);
      //   })
      //   .catch((err) => {
      //     console.log("err", err.response.data);
      //   });
    }
  };

  const changeAmountSolid = (e) => {
    console.log("val", e.target.value);
    setBuyAmount({
      ...buyAmount,
      solid: Number(e.target.value),
      stand: Number(e.target.value * standRate),
    });
  };
  const changeAmountStand = (e) => {
    setBuyAmount({
      ...buyAmount,
      stand: Number(e.target.value),
      solid: Number(e.target.value / standRate),
    });
  };

  const convertCoinAPI = async (e) => {
    e.preventDefault();

    if (buyAmount.stand > 0) {
      console.log("amount is sufficent");
      let token = await localStorage.getItem("token");
      token = JSON.parse(token);
      console.log("token", token);

      let usr = await localStorage.getItem("user");
      usr = JSON.parse(usr);
      console.log("usr", usr);

      if (solidToStand) {
        if (solidCoin <= 0 || solidCoin < buyAmount.solid) {
          toast.error("❌ Invalid Solid Amount!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          // setTimeout(() => {
          //   props.history.push("/dashboard");
          // }, 5000);
        } else {
          const postData = {
            user_id: usr?.id,
            exchange_coin_amount: parseFloat(buyAmount.stand),
            solid_coin: parseFloat(buyAmount.solid),
          };
          console.log("postData", postData);
          axios
            .post(`${baseURL}/api/exchangecoin/`, postData, {
              headers: { "x-auth-token": token },
            })
            .then((res) => {
              console.log(res, "res");
              toast
                .success("✔️ Stand to Solid Exchange Successfully!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  onClose: () => props.history.push("/dashboard"),
                })
                .then(() => {
                  props.history.push("/dashboard");
                });
            })
            .catch((err) => {
              console.log("err", err.response.data);
            });
        }
      } else {
        if (
          buyAmount.stand <= 0 ||
          standCoin.exchange_coin_amount < buyAmount.stand
        ) {
          toast.error("❌ Invalid Stand Amount!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          // setTimeout(() => {
          //   props.history.push("/dashboard");
          // }, 5000);
        } else {
          const postData = {
            user_id: usr?.id,
            exchange_coin_amount: parseFloat(buyAmount.stand),
            solid_coin: parseFloat(buyAmount.solid),
          };
          console.log("postData", postData);
          axios
            .put(`${baseURL}/api/exchangecoin/${standCoin.id}`, postData, {
              headers: { "x-auth-token": token },
            })
            .then((res) => {
              console.log(res, "res");
              toast
                .success("✔️ Solid to Stand Exchange Successfully!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  onClose: () => props.history.push("/dashboard"),
                })
                .then(() => {
                  props.history.push("/dashboard");
                });
            })
            .catch((err) => {
              console.log("err", err.response.data);
            });
        }
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

  // const convertCoinAPI = () => {
  //   toast.success("✔️ Top Right !", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //   });
  // };

  useEffect(() => {
    let usr = localStorage.getItem("user");
    usr = JSON.parse(usr);
    axios
      .get(`${baseURL}/api/exchangecoin/w/solidtostand/${1}`, {
        headers: { "x-auth-token": tokn },
      })
      .then((res) => {
        // console.log(res, "res");
        setStandRate(res?.data.standexchange);
      })
      .catch((err) => {
        console.log("err", err.response.data);
      });
    axios
      .get(`${baseURL}/api/solidcoin/${usr?.id}`, {
        headers: { "x-auth-token": tokn },
      })
      .then((res) => {
        // console.log(res, "resCoin");
        setSolidCoin(res?.data?.solid_coin);
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
        setStandCoin(res?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <PageTitle motherMenu="Home" activeMenu="Exchange" />
      <div className="d-flex align-items-center justify-content-center">
        <div className="col-xl-8 col-lg-8" style={{ marginTop: "0%" }}>
          <div className="card align-items-center justify-content-center">
            <div className="card-header ">
              {solidToStand ? (
                <h4 className="card-title ">Exchange SOLID with STAND</h4>
              ) : (
                <h4 className="card-title ">Exchange STAND with SOLID</h4>
              )}
            </div>
            {/* <form onSubmit={(e) => convertCoinAPI(e)}> */}
            {solidToStand ? (
              <div className="col-xl-6 col-lg-6 m-auto border rounded p-4 my-4 replace">
                <div className="d-flex justify-content-between">
                  <p>Spend</p>
                  <p className="d-flex">
                    Available Limit:
                    <CurrencyFormat
                      value={solidCoin}
                      displayType={"text"}
                      decimalScale={2}
                      thousandSeparator={true}
                      fixedDecimalScale={true}
                      renderText={(value) => <p>{value}</p>}
                    />
                  </p>
                </div>

                <div className="d-flex justify-content-between">
                  <input
                    type="number"
                    value={buyAmount.solid}
                    onChange={(e) => changeAmountSolid(e)}
                    placeholder="1000"
                    className="border-0"
                  />
                  <div className={styles["tokenDiv"]}>
                    <img
                      src={solidTokenImage}
                      width="36px"
                      height="36px"
                      style={{ objectFit: "contain" }}
                    />
                    <p>Solid</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-xl-6 col-lg-6 m-auto border rounded p-4 my-4 replace">
                <div className="d-flex justify-content-between">
                  <p>Spend</p>
                  <p className="d-flex">
                    Available Limit:
                    <CurrencyFormat
                      value={standCoin.exchange_coin_amount}
                      displayType={"text"}
                      decimalScale={2}
                      thousandSeparator={true}
                      fixedDecimalScale={true}
                      renderText={(value) => <p>{value}</p>}
                    />
                  </p>
                </div>

                <div className="d-flex justify-content-between">
                  <input
                    // disabled
                    type="number"
                    value={buyAmount.stand}
                    onChange={(e) => changeAmountStand(e)}
                    placeholder="0.04"
                    className="border-0"
                  />

                  <div className={styles["tokenDiv"]}>
                    <img
                      src={standCoinImage}
                      width="36px"
                      height="36px"
                      style={{ objectFit: "contain" }}
                    />
                    <p>Stand</p>
                  </div>
                </div>
              </div>
            )}

            <ImportExport onClick={changeFields} className="cursor-pointer" />

            {solidToStand ? (
              <div className="col-xl-6 col-lg-6 m-auto border rounded p-4 my-4 replace">
                <div className="d-flex justify-content-between">
                  <p>Receive</p>
                  <p className="d-flex">
                    Available:
                    {standCoin >= 1 ? (
                      <CurrencyFormat
                        value={standCoin}
                        displayType={"text"}
                        decimalScale={2}
                        thousandSeparator={true}
                        // prefix={"$"}
                        fixedDecimalScale={true}
                        renderText={(value) => <p>{value}</p>}
                      />
                    ) : (
                      0
                    )}
                  </p>
                </div>

                <div className="d-flex justify-content-between">
                  <input
                    type="number"
                    disabled
                    value={buyAmount.stand}
                    onChange={(e) => changeAmountStand(e)}
                    placeholder="0.04"
                    className="border-0"
                  />

                  <div className={styles["tokenDiv"]}>
                    <img
                      src={standCoinImage}
                      width="36px"
                      height="36px"
                      style={{ objectFit: "contain" }}
                    />
                    <p>Stand</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-xl-6 col-lg-6 m-auto border rounded p-4 my-4 replace">
                <div className="d-flex justify-content-between">
                  <p>Receive</p>
                  <p className="d-flex">
                    Available:
                    <CurrencyFormat
                      value={solidCoin}
                      displayType={"text"}
                      decimalScale={2}
                      thousandSeparator={true}
                      fixedDecimalScale={true}
                      renderText={(value) => <p>{value}</p>}
                    />
                  </p>
                </div>

                <div className="d-flex justify-content-between">
                  <input
                    type="number"
                    disabled
                    value={buyAmount.solid}
                    onChange={(e) => changeAmountSolid(e)}
                    placeholder="1000"
                    className="border-0"
                  />
                  <div className={styles["tokenDiv"]}>
                    <img
                      src={solidTokenImage}
                      width="36px"
                      height="36px"
                      style={{ objectFit: "contain" }}
                    />
                    <p>Solid</p>
                  </div>
                </div>
              </div>
            )}
            <div className="col-xl-6 col-lg-6 m-auto  d-flex justify-content-between">
              <p>Price</p>
              <p className="d-flex">
                1 Solid =
                <CurrencyFormat
                  value={standRate}
                  displayType={"text"}
                  decimalScale={2}
                  thousandSeparator={true}
                  fixedDecimalScale={true}
                  renderText={(value) => <p>{value}</p>}
                />
                Stand
              </p>
            </div>

            <button
              // type="submit"
              onClick={convertCoinAPI}
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
