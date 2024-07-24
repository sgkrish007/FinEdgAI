import React from "react";
import { images } from "../../constants";
// import { IconScroll } from "../../components";
import "./Hero.css";
import { BsArrowRight } from "react-icons/bs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// const logos = ["logo01", "logo02", "logo03", "logo04", "logo05", "logo06"];
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/about");
  };
  return (
    <div className="hero">
      <div className="row align-items-center">
        <div className="col-md-6 col-12">
          <h1 className="title"> FinEdgAI </h1>
          {/* <p className="py-4">Our digital marketing agency helps businesses grow and succeed online through a range of services including SEO, PPC, social media marketing, and content creation.</p> */}
          {/* <button className="btn-positivus">Book a consultation</button> */}
        </div>
        <div className="col-md-6 col-12 mt-md-0 mt-4">
          <img className="img-fluid" src={images.hero} alt="design" />
        </div>
      </div>

      {/* <div className="clients">
        {logos.map((logo, index) => (
          <img key={index} src={images[logo]} alt={images[logo]} />
        ))}
      </div>
      <IconScroll /> */}
      <div className="text-center my-5 py-5">
        <h3 className="mb-5
         heading">Redefine Banking with AI Innovation</h3>
        <p className="lh-lg">
          AI and GenAI are beginning to demonstrate proven outcomes in the
          banking and financial services sector, leading to the emergence of
          several potential use cases.61% banking technology leaders believe
          GenAI, AI/ML critical to achieving short term ambitions. 55% FS
          leaders are investing in new technology, specifically in GenAI.
          FinEdgAI offers comprehensive Data and AI/ML services, spanning
          consulting, modelling, implementation, and optimization, to help
          unlock the full business potential and drive tangible results.
        </p>
      </div>
      <div className="my-5 py-5">
      <h3 className="mb-5 heading text-center">Aspire's FinEdgAI Solutions</h3>
      <Row>
        <Col lg={4} md={6} sm={12} className="mb-5">
          <div className="d-flex justify-content-between flex-column h-100">
            <div
              className="w-100 bg-secondary mb-5"
              style={{ height: "250px" }}
            ></div>
            <h3 className="mb-4">Customer Experience</h3>
            <p className="caption">
              Creating a customer-centric environment focused on personalization
              and providing self-service platforms for convenience. Discover how
              we enhance customer satisfaction
            </p>
            <div className="d-flex align-items-center">
              <button
                style={{ width: "88px" }}
                className="readmore p-0 bg-transparent border-0"
                onClick={()=>navigate("/customer-experience")}
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
            <h3 className="mb-4">Operational Efficiency</h3>
            <p>
              Automating operational processes to provide more hands-on service
              and reduce operational overhead, resulting in lower fees for
              customers. See how we improve service delivery and productivity.
            </p>
            <div className="d-flex align-items-center">
              <button
                style={{ width: "88px" }}
                className="readmore p-0 bg-transparent border-0"
                onClick={()=>navigate("/operational-efficiency")}
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
            <h3 className="mb-4">Risk & Regulatory Management</h3>
            <p>
              Enhancing compliance with regulatory requirements to reduce risk
              and improve overall banking performance. Discover robust risk
              management and regulatory adherence.
            </p>
            <div className="d-flex align-items-center">
              <button
                style={{ width: "88px" }}
                className="readmore p-0 bg-transparent border-0"
                onClick={()=>navigate("/risk-and-regulatory-management")}
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
            <h3 className="mb-4">Credit Decisioning</h3>
            <p>
              Enabling access to advisory services with early warning signals to
              predict credit risk portfolio. Learn about our accurate and timely
              credit assessments.
            </p>
            <div className="d-flex align-items-center">
              <button
                style={{ width: "88px" }}
                className="readmore p-0 bg-transparent border-0"
                onClick={()=>navigate("/credit-decisioning")}
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
            <h3 className="mb-4">Campaign & Channel Management</h3>
            <p>
              Reducing campaign overhead, passing down the benefits to customers
              for improved satisfaction. Explore streamlined marketing efforts
              that maximize engagement.
            </p>
            <div className="d-flex align-items-center">
              <button
                style={{ width: "88px" }}
                className="readmore p-0 bg-transparent border-0"
                onClick={()=>navigate("/campaign-and-channel-management")}
              >
                Learn more
              </button>
              <BsArrowRight className="arrowSVG" />
            </div>
          </div>
        </Col>
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
    </div>
  );
};

export default Hero;
