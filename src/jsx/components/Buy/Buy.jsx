import React, { useState } from "react";
import { Button, Card, Col, Dropdown, Row } from "react-bootstrap";
import ProjectSlider from "../Dashboard/Dashboard/ProjectSlider";
import { ToastContainer, toast } from "react-toastify";
import PageTitle from "../../layouts/PageTitle";
import axios from "axios";
import { baseURL } from "../../../Strings/Strings";

function Buy(props) {
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState(0);

  const notifyTopRight = async (e) => {
    e.preventDefault();

    if (amount > 0) {
      console.log("amount is sufficent");
      let token = await localStorage.getItem("token");
      token = JSON.parse(token);
      console.log("token", token);

      let usr = await localStorage.getItem("user");
      usr = JSON.parse(usr);
      console.log("usr", usr);

      const postData = {
        user_id: usr?.id,
        amount: parseFloat(amount),
        address: address,
      };
      console.log("postData", postData);
      axios
        .post(`${baseURL}/api/deposit`, postData, {
          headers: { "x-auth-token": token },
        })
        .then((res) => {
          console.log(res, "res");
          toast.success("✔️ Deposit Request Initiated!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          props.history.push("/dashboard");
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
  return (
    <>
      <PageTitle motherMenu="Home" activeMenu="Buy" />
      <div className="d-flex align-items-center justify-content-center">
        <div className="col-xl-8 col-lg-8" style={{ marginTop: "0%" }}>
          <div className="card align-items-center justify-content-center">
            <div className="card-header ">
              <h4 className="card-title ">Buy with your Credit/Debit Card</h4>
            </div>

            <div className="col-xl-6 col-lg-6 m-auto border rounded p-4 my-4">
              <div className="d-flex justify-content-between">
                <p>Spend</p>
                <p>Available Limit: $1200</p>
              </div>

              <div className="d-flex justify-content-between">
                <input placeholder="1000" className="border-0" />
                <Dropdown>
                  <Dropdown.Toggle variant="light">EUR</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">USD</Dropdown.Item>
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
                <input placeholder="0.04" className="border-0" />
                <Dropdown>
                  <Dropdown.Toggle variant="light">BTC</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">ETH</Dropdown.Item>
                    <Dropdown.Item href="#">BNB</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 m-auto  d-flex justify-content-between">
              <p>Price</p>
              <p>1 BTC = 26,655 USD</p>
            </div>

            <button
              type="submit"
              className="btn btn-primary my-4 text-center"
              style={{ width: "120px" }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Buy;
