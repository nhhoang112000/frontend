import React, { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CourseContext } from "../contexts/CourseContext";
import { useContext, useEffect } from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModalCourse from "../components/courses/ModalCourse";
import AddCourse from "../components/courses/AddCourse";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Toast from "react-bootstrap/Toast";
import Tooltip from "react-bootstrap/Tooltip";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import UpdateCourseModal from "../components/courses/UpdateCourseModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  // Contexts
  const {
    authState: {
      user: { _id, username, role },
    },
  } = useContext(AuthContext);

  const {
    courseState: { course, courses, coursesLoading },
    getCourses,
    setShowAddCourse,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(CourseContext);

  // Start: Get all courses
  useEffect(() => {
    getCourses();
  }, []);

  //search handle
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("All");
  const [searchFramework, setSearchFramework] = useState("All framework");

  const handleChangeSearchType = (e) => {
    setSearchType(e.target.value);
  };
  const handleChangeSearchFramework = (e) => {
    setSearchFramework(e.target.value);
  };

  //slide handle
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  let body = null;

  if (coursesLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (courses.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hello {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to RECOURES</Card.Title>
            <Card.Text>There is no course to learn now</Card.Text>
            {/* <Button
              variant="primary"
              onClick={setShowAddCourse.bind(this, true)}
            >
              Let's go !
            </Button> */}
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Container
          style={{
            backgroundColor: "#edf6f9",
            padding: "8px",
            borderRadius: "10px",
          }}
          className="mt-3"
        >
          <Row>
            <Col sm={8}>
              <InputGroup className="mb-3">
                <InputGroup.Text style={{ height: "40px" }}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </InputGroup.Text>
                <Form.Control
                  as="input"
                  placeholder="Search courses"
                  style={{ height: "40px" }}
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
              </InputGroup>
            </Col>
            <Col sm={2}>
              {" "}
              <Form.Select
                name="searchType"
                value={searchType}
                onChange={handleChangeSearchType}
                aria-label="Default select example"
              >
                <option value="All">All</option>
                <option value="Full stack">Full stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Tester">Tester</option>
                <option value="BA">BA</option>
              </Form.Select>
            </Col>
            <Col sm={2}>
              {" "}
              <Form.Select
                name="searchFramework"
                value={searchFramework}
                onChange={handleChangeSearchFramework}
                aria-label="Default select example"
              >
                <option value="All framework">All framework</option>
                <option value="React">React</option>
                <option value="Vue">Vue</option>
                <option value="Angular">Angular</option>
                <option value="Nodejs">Nodejs</option>
              </Form.Select>
            </Col>
          </Row>
        </Container>

        <Row
          style={{
            backgroundColor: "#edf6f9",
            padding: "10px",
            borderRadius: "10px",
          }}
          className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3"
        >
          {courses
            .filter((course) => {
              if (searchText === "") {
                return course;
              } else if (
                course.title.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return course;
              }
            })
            .filter((course) => {
              if (searchType === "All") {
                return course;
              } else if (course.type === searchType) {
                return course;
              }
            })
            .filter((course) => {
              if (searchFramework === "All framework") {
                return course;
              } else if (
                course.framework
                  .toLowerCase()
                  .includes(searchFramework.toLowerCase())
              ) {
                return course;
              }
            })
            .map((course) => (
              <ModalCourse
                course={course}
                key={course._id}
                userId={_id}
                userRole={role}
              />
            ))}
        </Row>
      </>
    );
  }

  return (
    <div>
      {/* slide */}
      <div className="d-flex justify-content-center" >
        <Carousel
          style={{width:"88vw"}}
          activeIndex={index}
          onSelect={handleSelect}
          interval={2100}
          className="carousel"
        >
          <Carousel.Item className="item">
            <img
              style={{ objectFit: "cover" }}
              className="d-block w-100"
              src="https://midu.dev/images/wallpapers/web-technologies-4k-wallpaper.png"
              alt="First0 slide"
            />
            <Carousel.Caption >
              {/* <h3 style={{color:"#e85d04"}}>First slide label</h3> */}
              <p style={{fontSize:"20px"}} >Start with basic languages</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="item">
            <img
              style={{ objectFit: "cover" }}
              className="d-block w-100"
              src="https://www.kawankoding.id/wp-content/uploads/2020/04/flutter-project.png"
              alt="First0 slide"
            />
            <Carousel.Caption>
              {/* <h3 style={{color:"#e85d04"}}>First slide label</h3> */}
              <p style={{fontSize:"20px"}} >Build apps for any screen</p>
            </Carousel.Caption>
          </Carousel.Item>
           <Carousel.Item className="item">
            <img
              style={{ objectFit: "cover" }}
              className="d-block w-100"
              src="https://wallpaperaccess.com/full/4584344.png"
              alt="First0 slide"
            />
            <Carousel.Caption>
              {/* <h3 style={{color:"#e85d04"}}>First slide label</h3> */}
              <p style={{fontSize:"20px"}} >The Progressive JavaScript Framework</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="item">
            <img
              style={{ objectFit: "cover" }}
              className="d-block w-100"
              src="https://wallpapercave.com/wp/wp5722051.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              {/* <h3 style={{color:"#e85d04"}}>First slide label</h3> */}
              <p style={{fontSize:"20px"}} >The modern web developer's platform</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="item">
            <img
            style={{ objectFit: "cover" }}
              className="d-block w-100"
              src="https://wallpapercave.com/wp/wp4923981.jpg"
              alt="Second slide"
            />
  
            <Carousel.Caption>
              {/* <h3 style={{color:"#e85d04"}}>Second slide label</h3> */}
              <p style={{fontSize:"20px"}} >A JavaScript library for building user interfaces</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="item">
            <img
            style={{ objectFit: "cover" }}
              className="d-block w-100"
              src="https://wallpapercave.com/wp/wp5070716.jpg"
              alt="Third slide"
            />
  
            <Carousel.Caption>
              {/* <h3 style={{color:"#e85d04"}}>Third slide label</h3> */}
              <p style={{fontSize:"20px"}} >
              Open-source, cross-platform JavaScript runtime environment
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      {/* body */}
      <Container>
        {body}
        {/* Open Add Course Modal */}
        {role === "SELLER" && (
          <OverlayTrigger
            placement="left"
            overlay={<Tooltip>Add a new course</Tooltip>}
          >
            <Button
              size="lg"
              style={{ backgroundColor: "#2fa4e7", borderRadius: "50px" }}
              className="btn-floating"
              onClick={setShowAddCourse.bind(this, true)}
            >
              +
              {/* <img src={addIcon} alt='add-course' width='60' height='60' /> */}
            </Button>
          </OverlayTrigger>
        )}
        <AddCourse />
        {course !== null && <UpdateCourseModal />}
        {/* After post is added, show toast */}
        <Toast
          show={show}
          style={{ position: "fixed", top: "20%", right: "10px" }}
          className={`bg-${type} text-white`}
          onClose={setShowToast.bind(this, {
            show: false,
            message: "",
            type: null,
          })}
          delay={3000}
          autohide
        >
          <Toast.Body>
            <strong>{message}</strong>
          </Toast.Body>
        </Toast>
      </Container>
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

export default Dashboard;
