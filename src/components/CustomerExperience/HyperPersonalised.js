import React from "react";
import "../../App.css";
import Stepper from "../../container/Stepper/Stepper";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { BsArrowRight } from "react-icons/bs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
function HyperPersonalised() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/about");
  };
  return (
    <div className="my-5">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/customer-experience">
          Customer Experience
        </Breadcrumb.Item>
        <Breadcrumb.Item
          active
          href="https://getbootstrap.com/docs/4.0/components/breadcrumb/"
        >
          Hyper Personalised
        </Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="mb-3">Hyper Personalised</h1>
      <div className="py-5">
        <Stepper />
      </div>
    </div>
  );
}

export default HyperPersonalised;
