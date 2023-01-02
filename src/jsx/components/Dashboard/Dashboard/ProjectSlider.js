import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { baseURL, tradeAPI } from "../../../../Strings/Strings";

const ProjectSlider = (props) => {
  const [data, setData] = useState([]);
  const [invest, setInvest] = useState(0);
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
          slidesToShow: 3,
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
              <span className="mb-3 d-block fs-22">
                <strong>$ {data?.balance}</strong>
              </span>

              <span className="mb-7 d-block fs-18">Stand Coin</span>
            </center>
          </div>
        </div>
        <div className="items">
          <div className="slide-info">
            <div className="d-flex align-items-center mb-3">
              <div className="slide-icon"></div>
            </div>
            <center>
              <span className="mb-3 d-block fs-22">
                <strong>$ {invest}</strong>
              </span>

              <span className="mb-7 d-block fs-18">Solid Token</span>
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
