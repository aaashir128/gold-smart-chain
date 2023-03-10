import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { baseURL, tradeAPI } from "../../../../Strings/Strings";
import standCoin from "../../../../images/stand.png";
import solidToken from "../../../../images/solid.png";
import CurrencyFormat from "react-currency-format";
import { Spinner } from "react-bootstrap";

const ProjectSlider = (props) => {
  const [data, setData] = useState([]);
  const [coins, setCoins] = useState(0);
  const [invest, setInvest] = useState(0);
  const [coin, setCoin] = useState();
  const [solid, setSolid] = useState();
  const [isLoaded, setIsLoaded] = useState({ coin: false, token: false });

  const tokn = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    let usr = localStorage.getItem("user");
    usr = JSON.parse(usr);
    setIsLoaded({ ...isLoaded, coin: true });
    axios
      .get(`${baseURL}/api/solidcoin/${usr?.id}`, {
        headers: { "x-auth-token": tokn },
      })
      .then((res) => {
        // console.log(res, "resCoin");
        setCoin(res?.data?.solid_coin);
        setIsLoaded({ ...isLoaded, coin: false });
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
        setIsLoaded({ ...isLoaded, token: false });
      })
      .catch((e) => {
        console.log(e);
      });
    setIsLoaded({ ...isLoaded, coin: false, token: false });
  }, []);

  console.log("coin", props);
  useEffect(() => {
    let usr = localStorage.getItem("user");
    usr = JSON.parse(usr);
    // axios.get(`${baseURL}api/wallet/${usr?.id}`).then((res) => {
    //   console.log(res, "res");
    //   setData(res.data.wallet);
    // });

    // axios.get(`${baseURL}${tradeAPI}?user_id=1`).then((res) => {
    //   console.log(res, "res");
    //   var TotalInvested = res.data.ActiveTradeRequests.reduce(
    //     (accumulator, item) => accumulator + parseFloat(item.trade),
    //     0
    //   );

    //   setInvest(TotalInvested);
    // });
  }, [props.history]);

  console.log("props", props);
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 3000,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1401,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Slider className="owl-carousel card-slider" {...settings}>
        <div className="items">
          <div className="slide-info">
            <div className="d-flex align-items-center mb-3">
              <div className="slide-icon"></div>
            </div>
            <center>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={standCoin}
                  alt=""
                  width="64px"
                  height="64px"
                  style={{ objectFit: "contain", marginRight: "24px" }}
                />
                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span className="mb-7 d-block fs-28 fw-bold">STAND Coin</span>
                  <span className="mb-0 d-block fs-22 text-start">
                    {isLoaded.coin ? (
                      <Spinner animation="grow" />
                    ) : (
                      <strong>
                        {props.coin > 0 ? (
                          <CurrencyFormat
                            value={parseFloat(props.coin).toFixed(2)}
                            displayType={"text"}
                            // decimalScale={4}
                            thousandSeparator={true}
                            fixedDecimalScale={true}
                            renderText={(value) => <p>{value}</p>}
                          />
                        ) : (
                          "0.00"
                        )}
                      </strong>
                    )}
                  </span>
                </div>
              </div>
            </center>
          </div>
        </div>
        <div className="items">
          <div className="slide-info">
            <div className="d-flex align-items-center mb-3">
              <div className="slide-icon"></div>
            </div>
            <center>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={solidToken}
                  alt=""
                  width="64px"
                  height="64px"
                  style={{ objectFit: "contain", marginRight: "24px" }}
                />
                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span className="mb-7 d-block fs-28 fw-bold">
                    SOLID Token
                  </span>
                  <span className="mb-0 d-block fs-22 text-start">
                    {/* <strong>{props?.token}</strong> */}
                    {isLoaded.token ? (
                      <Spinner animation="grow" />
                    ) : (
                      <strong>
                        {props.solid > 0 ? (
                          <CurrencyFormat
                            // value={props.solid}
                            value={parseFloat(props.solid).toFixed(4)}
                            displayType={"text"}
                            // decimalScale={2}
                            thousandSeparator={true}
                            fixedDecimalScale={true}
                            renderText={(value) => <p>{value}</p>}
                          />
                        ) : (
                          "0.00"
                        )}
                      </strong>
                    )}
                  </span>
                </div>
              </div>
            </center>
          </div>
        </div>
        {/* <div className="items">
          <div className="slide-info">
            <div className="d-flex align-items-center mb-3">
              <div className="slide-icon"></div>
            </div>
            <center>
              <span className="mb-3 d-block fs-22">
                <strong>$ 0.00</strong>
              </span>

              <span className="mb-7 d-block fs-18">Profit/Loss</span>
            </center>
          </div>
        </div> */}
      </Slider>
    </>
  );
};
export default ProjectSlider;
