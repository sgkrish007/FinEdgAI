import React from "react";
import Stepper from "../../container/Stepper/Stepper";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { BsArrowRight } from "react-icons/bs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import "../../App.css";
function CustomerExperience() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/about");
  };
  return (
    <div className="my-5">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item
          active
          href="https://getbootstrap.com/docs/4.0/components/breadcrumb/"
        >
          Customer Experience
        </Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="mb-3">Customer Experience</h1>
      <div className="py-5">
        <Row>
          <Col lg={4} md={6} sm={12} className="mb-5">
            <div className="d-flex justify-content-between flex-column h-100">
              <div
                className="w-100 bg-secondary mb-5"
                style={{ height: "250px" }}
              ></div>
              <h3 className="mb-4">Enhanced Targeting Efficiency for Credit cards</h3>
              <p className="caption">
                Creating a customer-centric environment focused on
                personalization and providing self-service platforms for
                convenience. Discover how we enhance customer satisfaction
              </p>
              {/* <a href="">Hover This Link</a> */}
              <div className="d-flex align-items-center">
                <button
                  style={{ width: "88px" }}
                  className="readmore p-0 bg-transparent border-0"
                  onClick={() => navigate("/customer-experience/ETECreditCards")}
                >
                  Learn more
                </button>
                <BsArrowRight className="arrowSVG" />
              </div>
            </div>
          </Col>
          <Col lg={4} md={6} sm={12} className="mb-5">
            <div className="d-flex justify-content-between flex-column h-100">
              <div
                className="w-100 bg-secondary mb-5"
                style={{ height: "250px" }}
              ></div>
              <h3 className="mb-4">Hyper-personalised - Customer Selection Model for Banking Products</h3>
              <p>
                Automating operational processes to provide more hands-on
                service and reduce operational overhead, resulting in lower fees
                for customers. See how we improve service delivery and
                productivity.
              </p>
              <div className="d-flex align-items-center">
                <button
                  style={{ width: "88px" }}
                  className="readmore p-0 bg-transparent border-0"
                  onClick={() => navigate("/customer-experience/HyperPersonalised")}
                >
                  Learn more
                </button>
                <BsArrowRight className="arrowSVG" />
              </div>
            </div>
          </Col>
          {/* <Col lg={4} md={6} sm={12} className="mb-5">
            <div className="d-flex justify-content-between flex-column h-100">
              <div
                className="w-100 bg-secondary mb-5"
                style={{ height: "250px" }}
              ></div>
              <h3 className="mb-4">Risk & Regulatory Management</h3>
              <p>
                Enhancing compliance with regulatory requirements to reduce risk
                and improve overall banking performance. Discover robust risk
                management and regulatory adherence.
              </p>
              <div className="d-flex align-items-center">
                <a
                  href="/"
                  style={{ width: "88px" }}
                  alt="Learn More"
                  className="readmore"
                >
                  Learn more
                </a>
                <BsArrowRight className="arrowSVG" />
              </div>
            </div>
          </Col>
          <Col lg={4} md={6} sm={12} className="mb-5">
            <div className="d-flex justify-content-between flex-column h-100">
              <div
                className="w-100 bg-secondary mb-5"
                style={{ height: "250px" }}
              ></div>
              <h3 className="mb-4">Credit Decisioning</h3>
              <p>
                Enabling access to advisory services with early warning signals
                to predict credit risk portfolio. Learn about our accurate and
                timely credit assessments.
              </p>
              <div className="d-flex align-items-center">
                <a
                  href="/"
                  style={{ width: "88px" }}
                  alt="Learn More"
                  className="readmore"
                >
                  Learn more
                </a>
                <BsArrowRight className="arrowSVG" />
              </div>
            </div>
          </Col>
          <Col lg={4} md={6} sm={12} className="mb-5">
            <div className="d-flex justify-content-between flex-column h-100">
              <div
                className="w-100 bg-secondary mb-5"
                style={{ height: "250px" }}
              ></div>
              <h3 className="mb-4">Campaign & Channel Management</h3>
              <p>
                Reducing campaign overhead, passing down the benefits to
                customers for improved satisfaction. Explore streamlined
                marketing efforts that maximize engagement.
              </p>
              <div className="d-flex align-items-center">
                <a
                  href="/"
                  style={{ width: "88px" }}
                  alt="Learn More"
                  className="readmore"
                >
                  Learn more
                </a>
                <BsArrowRight className="arrowSVG" />
              </div>
            </div>
          </Col> */}
        </Row>
        {/* <div className="cardBox">
        <div className="card">
          <h2>Animated Card</h2>
          <span>Hover Me</span>
          <div className="content">
            <h3>How's it goin Fam ?</h3>
            <p>
              This is Sachin Samal, your tech mate!!! I love you all. Lets make
              this world a better place for all of us. Keep prospering...Keep
              learning!!!
            </p>
          </div>
        </div>
      </div> */}
      </div>
      {/* <Stepper /> */}
    </div>
  );
}

export default CustomerExperience;
