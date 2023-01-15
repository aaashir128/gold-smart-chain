import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../../Strings/Strings";
import PageTitle from "../../layouts/PageTitle";
import { ToastContainer, toast } from "react-toastify";
import solidCoin from "../../../images/solid.png";
import CurrencyFormat from "react-currency-format";

function CommissionSettings(props) {
  const [solidPrice, setSolidPrice] = useState(0);
  const [isEditInput, setIsEditInput] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));

  const usr = JSON.parse(localStorage.getItem("user"));
  useEffect(async () => {
    console.log("usr", usr);
    if (!usr.is_admin) {
      props.history.push("/dashboard");
    }
  }, [usr]);

  const changeEditInput = () => {
    setIsEditInput(true);
  };

  const updateValue = async (e) => {
    e.preventDefault();

    if (solidPrice > 0) {
      // let token = await localStorage.getItem("token");
      // token = JSON.parse(token);
      // console.log("token", token);

      let usr = await localStorage.getItem("user");
      usr = JSON.parse(usr);
      console.log("usr", usr);

      const postData = {
        value: parseFloat(solidPrice),
      };
      console.log("postData", postData);
      axios
        .post(`${baseURL}/api/solidvalue/`, postData, {
          headers: { "x-auth-token": token },
        })
        .then((res) => {
          console.log(res, "res");
          setIsEditInput(false);
          toast.success("✔️ Solid Price Updated", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          // setTimeout(() => {
          //   props.history.push("/admin-dashboard");
          // }, 5000);
          // props.history.push("/dashboard");
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
    // console.log("token", tokn);
    axios
      .get(`${baseURL}/api/solidvalue`, {
        headers: { "x-auth-token": token },
      })
      .then((res) => {
        console.log("Message", res.data);
        setSolidPrice(res?.data?.value);
      })
      .catch((e) => {
        console.log("errorMessage", e.response.data);
      });
  }, []);
  return (
    <div>
      <PageTitle activeMenu="Price Settings" motherMenu="Admin" />

      <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Price Settings</h4>
          </div>
          <div className="card-body">
            <div className="basic-form">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                  <div className="form-group mb-3 col-md-12">
                    <div className="d-flex row justify-content-center">
                      <img
                        src={solidCoin}
                        width="64px"
                        height="64px"
                        style={{ objectFit: "contain" }}
                      />
                      <div className="d-flex justify-content-center my-4 align-items-center">
                        {/* <div className=""> */}
                        <h5 className="flex-shrink-0 mx-4 mb-0">
                          Set Solid Price
                        </h5>
                        {isEditInput ? (
                          <input
                            type="text"
                            className="form-control w-25"
                            placeholder="$70"
                            value={solidPrice}
                            onChange={(e) => setSolidPrice(e.target.value)}
                          />
                        ) : (
                          <h5 className="mb-0" onClick={changeEditInput}>
                            ${solidPrice}
                          </h5>
                        )}
                        {/* <CurrencyFormat
                          thousandSeparator={true}
                          prefix={"$"}
                          value={solidPrice}
                          
                        /> */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="form-group mb-3 col-md-6">
                    <h5>Sell Commission</h5>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="1.5%"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>Minimum SL</h5>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="1.1"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>Minimum TP</h5>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="1.9"
                    />
                  </div> */}
                </div>

                <div className="text-center my-4">
                  <button
                    type="submit"
                    className="btn btn-primary text-center w-25"
                    onClick={updateValue}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
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
  );
}

export default CommissionSettings;
