import React, { useState } from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
// import ProgressBar from "react-bootstrap/ProgressBar";
import { useContext, useEffect } from "react";
import { CourseContext } from "../contexts/CourseContext";
import RateCourse from "../components/courses/RateCourse";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Rate } from "antd";
import Toast from "react-bootstrap/Toast";

const SingleCourse = () => {
  //state

  // Contexts
  const {
    courseState: { course },
    setShowRateCourse,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(CourseContext);

  useEffect(() => {
    setShowRateCourse(false);
  }, [course]);

  const openRateDialog = () => {
    setShowRateCourse(true);
  };
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  

  return (
    <div>
      <Container style={{backgroundColor:"#edf6f9",padding:"10px",borderRadius:"10px"}}>
        <Row className="mt-4 mb-4">
          <Col md={6}>
            <Card.Img
              //   style={{ height: "15rem" }}
              //   variant="top"
              src={`data:${course.image.contentType};base64, ${Buffer.from(
                course.image.data.data
              ).toString("base64")}`}
            />
          </Col>
          <Col md={6}>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h2>{course.title}</h2>
                </Accordion.Header>
                <Accordion.Body className="ms-4">
                  <Row>
                    <h6>Type of course: {course.type}</h6>
                  </Row>
                  <Row>
                    <h6>Framework: {course.framework}</h6>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <h4>Description</h4>
                </Accordion.Header>
                <Accordion.Body className="ms-4">
                  {course.description}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Row className="ps-5 mt-3">Cost: {course.cost}</Row>
            <Row className="mt-3 ps-5">
              <Col md={2}>Rating</Col>
              <Col md={9}>
                <Rate defaultValue={course.rate} disabled={true}/>
                {/* <ProgressBar
                  style={{ height: "8px", borderRadius: "50px" }}
                  className="mt-2"
                  now={course.rate}
                  label={`${course.rate}`}
                  visuallyHidden
                /> */}
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="ps-5 ms-5">
                <Button
                  size="lg"
                  variant="primary"
                  className="w-75"
                  onClick={openRateDialog}
                >
                  Rate
                </Button>
              </Col>

              <Col>
                <Button
                  size="lg"
                  variant="primary"
                  className="w-75"
                  onClick={() => openInNewTab(course.url)}
                >
                  Learn
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <RateCourse />
      </Container>
      <OverlayTrigger
            placement="left"
            overlay={<Tooltip>Remind me to study every day</Tooltip>}
          >
            <Button
              size="lg"
              style={{ backgroundColor: "#2fa4e7", borderRadius: "50px" }}
              className="btn-floating"
              onClick={() => openInNewTab("https://forms.office.com/Pages/ResponsePage.aspx?id=URfkaNOAg0Gve6XEISvf5QGmrRcOr7tKmqzCHhunP4ZUOUw4SlY1U1dFQUwwS01NMkxES0NaUkxEQSQlQCN0PWcu")}
            >
              
              <FontAwesomeIcon style={{ height: "23px" }}  icon={faBell} />
            </Button>
          </OverlayTrigger>
          {/* After rated, show toast */}
        <Toast
          show={show}
          style={{ position: "fixed", top: "20%", right: "10px" }}
          className={`bg-${type} text-white`}
          onClose={setShowToast.bind(this, {
            show: false,
            message: "",
            type: null,
          })}
          delay={2000}
          autohide
        >
          <Toast.Body>
            <strong>{message}</strong>
          </Toast.Body>
        </Toast>

      {/* footer */}
      <MDBFooter
        bgColor="light"
        className="text-center text-lg-start text-muted"
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <a href="https://www.facebook.com/udontknowhatinside112" className="me-4 text-reset">
              <MDBIcon fab icon="facebook-f" />
            </a>
            <a href="https://twitter.com/HongNgu72160541" className="me-4 text-reset">
              <MDBIcon fab icon="twitter" />
            </a>
            <a href="https://www.google.com/" className="me-4 text-reset">
              <MDBIcon fab icon="google" />
            </a>
            <a href="https://www.instagram.com/udontknowhatinside/" className="me-4 text-reset">
              <MDBIcon fab icon="instagram" />
            </a>
            <a href="https://www.linkedin.com/" className="me-4 text-reset">
              <MDBIcon fab icon="linkedin" />
            </a>
            <a href="https://github.com/nhhoang112000" className="me-4 text-reset">
              <MDBIcon fab icon="github" />
            </a>
          </div>
        </section>

        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <MDBIcon icon="gem" className="me-3" />
                  Synodus Company
                </h6>
                <p>
                One-stop shop for your mission-critical projects
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Technology</h6>
                <p>
                  <a href="https://reactjs.org/" className="text-reset">
                  React
                  </a>
                </p>
                <p>
                  <a href="https://www.mongodb.com/home/" className="text-reset">
                    MongoDB
                  </a>
                </p>
                <p>
                  <a href="https://expressjs.com/" className="text-reset">
                  Express
                  </a>
                </p>
                <p>
                  <a href="https://nodejs.org/en/" className="text-reset">
                    Nodejs
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Integrations</h6>
                <p>
                  <a href="https://www.microsoft.com/vi-vn/microsoft-365/online-surveys-polls-quizzes" className="text-reset">
                  Microsoft form
                  </a>
                </p>
                <p>
                  <a href="https://www.microsoft.com/vi-vn/microsoft-365/sharepoint/collaboration" className="text-reset">
                Sharepoint
                  </a>
                </p>
                <p>
                  <a href="https://powerautomate.microsoft.com/en-au/" className="text-reset">
                  Power automate
                  </a>
                </p>
                
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  Cau Giay District, Hanoi
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-3" />
                 nguyenhuyhoang112k@gmail.com
                </p>
                <p>
                  <MDBIcon icon="phone" className="me-3" /> 0889018689
                </p>
                <p>
                  <MDBIcon fab icon="cc-visa"  className="me-3" /> 21510002489345
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2022 Copyright: 
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          Hoàng Nguyễn. All rights reserved.
          </a>
        </div>
      </MDBFooter>
    </div>
  );
};

export default SingleCourse;
