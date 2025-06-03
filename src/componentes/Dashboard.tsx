import React from "react";
import { Div } from "./Div";
import { DivWrapper } from "./DivWrapper";
import { Frame } from "./Frame";
import { FrameWrapper } from "./FrameWrapper";
import { SectionComponentNode } from "./SectionComponentNode";
import ellipse2 from "./ellipse-2.png";
import frame44 from "./frame-44.svg";
import frame45 from "./frame-45.svg";
import group from "./group.png";
import iconColor4 from "./icon-color-4.svg";
import iconColor5 from "./icon-color-5.svg";
import iconColor from "./icon-color.svg";
import "./style.css";
import vector4 from "./vector-4.svg";
import vector6 from "./vector-6.svg";
import vector7 from "./vector-7.svg";
import vector8 from "./vector-8.svg";
import vector9 from "./vector-9.svg";
import vector10 from "./vector-10.svg";
import vector11 from "./vector-11.svg";
import vector12 from "./vector-12.svg";
import vector13 from "./vector-13.svg";
import vector14 from "./vector-14.svg";
import vector15 from "./vector-15.svg";
import vector16 from "./vector-16.svg";
import vector17 from "./vector-17.svg";
import vector18 from "./vector-18.svg";
import vector19 from "./vector-19.svg";
import vector20 from "./vector-20.svg";
import vector21 from "./vector-21.svg";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="div-20">
        <Frame />
        <div className="overlap-2">
          <FrameWrapper />
          <div className="frame-22">
            <div className="events-wrapper">
              <div className="events">Events</div>
            </div>

            <div className="frame-23">
              <div className="frame-24">
                <div className="frame-25">
                  <div className="text-wrapper-24">Time :</div>
                </div>

                <div className="frame-25">
                  <div className="text-wrapper-25">Last Hour</div>

                  <img
                    className="icon-color-2"
                    alt="Icon color"
                    src={iconColor4}
                  />
                </div>
              </div>

              <div className="frame-24">
                <div className="frame-25">
                  <div className="text-wrapper-24">Type :</div>
                </div>

                <div className="frame-25">
                  <div className="text-wrapper-25">All</div>

                  <img
                    className="icon-color-2"
                    alt="Icon color"
                    src={iconColor5}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rectangle-6" />

        <div className="rectangle-7" />

        <div className="frame-26">
          <div className="your-top-courses-wrapper">
            <div className="your-top-courses">Your Top Courses</div>
          </div>

          <div className="most-viewed-wrapper">
            <div className="most-viewed">Most Viewed</div>
          </div>
        </div>

        <DivWrapper />
        <Div />
        <div className="frame-27">
          <img className="vector-8" alt="Vector" src={vector4} />

          <div className="search-and-find">Search And Find</div>
        </div>

        <div className="frame-28">
          <div className="frame-29">
            <img className="frame-30" alt="Frame" src={frame45} />

            <img className="frame-30" alt="Frame" src={frame44} />
          </div>

          <div className="frame-31">
            <img className="ellipse-5" alt="Ellipse" src={ellipse2} />

            <div className="frame-32">
              <input className="input" placeholder="Name" type="text" />

              <div className="admin-2">Admin</div>
            </div>

            <img className="icon-color-2" alt="Icon color" src={iconColor} />
          </div>
        </div>

        <div className="frame-33">
          <div className="frame-34">
            <div className="group-wrapper">
              <div className="overlap-group-wrapper">
                <div className="overlap-group-2">
                  <img className="vector-9" alt="Vector" src={vector6} />

                  <img className="vector-10" alt="Vector" src={vector7} />

                  <img className="vector-11" alt="Vector" src={vector8} />

                  <img className="vector-12" alt="Vector" src={vector9} />

                  <img className="vector-13" alt="Vector" src={vector10} />

                  <img className="group-2" alt="Group" src={group} />

                  <img className="vector-14" alt="Vector" src={vector11} />

                  <img className="vector-15" alt="Vector" src={vector12} />

                  <img className="vector-16" alt="Vector" src={vector13} />

                  <img className="vector-17" alt="Vector" src={vector14} />

                  <img className="vector-18" alt="Vector" src={vector15} />

                  <img className="vector-19" alt="Vector" src={vector16} />

                  <img className="vector-20" alt="Vector" src={vector17} />

                  <img className="vector-21" alt="Vector" src={vector18} />

                  <img className="vector-22" alt="Vector" src={vector19} />

                  <img className="vector-23" alt="Vector" src={vector20} />

                  <img className="vector-24" alt="Vector" src={vector21} />
                </div>
              </div>
            </div>

            <div className="text-wrapper-26">12/14/2023</div>
          </div>

          <div className="text-wrapper-26">07:26</div>
        </div>

        <SectionComponentNode />
      </div>
    </div>
  );
};
