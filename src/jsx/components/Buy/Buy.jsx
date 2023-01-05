import React, { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Row } from "react-bootstrap";
import ProjectSlider from "../Dashboard/Dashboard/ProjectSlider";
import { ToastContainer, toast } from "react-toastify";
import PageTitle from "../../layouts/PageTitle";
import axios from "axios";
import { baseURL } from "../../../Strings/Strings";
import standCoin from "../../../images/stand.png";

function Buy(props) {
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState(0);
  const [data, setData] = useState([]);
  const tokn = JSON.parse(localStorage.getItem("token"));
  const [buyAmount, setBuyAmount] = useState({ usd: 10, stand: 1 });

  const changeAmountUsd = (e) => {
    console.log("val", e.target.value);
    setBuyAmount({
      ...buyAmount,
      usd: Number(e.target.value),
      stand: Number(e.target.value * 0.1),
    });
  };
  const changeAmountStand = (e) => {
    setBuyAmount({
      ...buyAmount,
      stand: Number(e.target.value),
      usd: Number(e.target.value * 10),
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
        stand_coin: parseFloat(buyAmount.stand),
        invest_amount: parseFloat(buyAmount.usd),
      };
      console.log("postData", postData);
      const { data: st } = await axios
        .post(`${baseURL}/api/standcoin/`, postData, {
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
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          props.history.push("/dashboard");
        }, 5000);
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

  // const notifyTopRight = () => {
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
  }, []);
  return (
    <>
      <PageTitle motherMenu="Home" activeMenu="Buy" />
      <div className="d-flex align-items-center justify-content-center">
        <div className="col-xl-8 col-lg-8" style={{ marginTop: "0%" }}>
          <div className="card align-items-center justify-content-center">
            <div className="card-header ">
              <h4 className="card-title ">Buy Stand Coin</h4>
            </div>
            {/* <form onSubmit={(e) => notifyTopRight(e)}> */}
            <div className="col-xl-6 col-lg-6 m-auto border rounded p-4 my-4">
              <div className="d-flex justify-content-between">
                <p>Spend</p>
                <p>Available Limit: ${data?.balance}</p>
              </div>

              <div className="d-flex justify-content-between">
                <input
                  value={buyAmount.usd}
                  onChange={(e) => changeAmountUsd(e)}
                  placeholder="1000"
                  className="border-0"
                />
                <Dropdown>
                  <Dropdown.Toggle variant="light">$ USD</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">EUR</Dropdown.Item>
                    <Dropdown.Item href="#">JPY</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 m-auto border rounded p-4 my-4">
              <div className="d-flex justify-content-between">
                <p>Recieve</p>
              </div>

              <div className="d-flex justify-content-between">
                <input
                  value={buyAmount.stand}
                  onChange={(e) => changeAmountStand(e)}
                  placeholder="0.04"
                  className="border-0"
                />
                <Dropdown>
                  <Dropdown.Toggle variant="light">
                    <img
                      src={standCoin}
                      width="36px"
                      height="36px"
                      style={{ objectFit: "contain" }}
                    />{" "}
                    Stand
                  </Dropdown.Toggle>
                  {/* <Dropdown.Menu>
                    <Dropdown.Item href="#">ETH</Dropdown.Item>
                    <Dropdown.Item href="#">BNB</Dropdown.Item>
                  </Dropdown.Menu> */}
                </Dropdown>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 m-auto  d-flex justify-content-between">
              <p>Price</p>
              <p>$1 = 0.1g Gold</p>
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
