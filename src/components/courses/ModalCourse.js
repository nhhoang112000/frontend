import React from "react";
import { useContext } from "react";
import { CourseContext } from "../../contexts/CourseContext";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
// import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Rate } from "antd";

import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

const ModalCourse = ({ course, userRole, userId }) => {
  const { deleteCourse, findCourse, setShowUpdateCourseModal } =
    useContext(CourseContext);

  const chooseCourse = (courseId) => {
    findCourse(courseId);
    setShowUpdateCourseModal(true);
  };

  return (
    <Col key={course._id} className="my-2">
      <Card>
        <Card.Img
          style={{ height: "15rem",objectFit:"cover" }}
          variant="top"
          src={`data:${course.image.contentType};base64, ${Buffer.from(
            course.image.data.data
          ).toString("base64")}`}
        />
        <Card.Body>
          <Card.Title>{course.title}</Card.Title>
          <Card.Text>{`${course.type} : ${course.framework}`}</Card.Text>
          <Container className="ps-0 pe-0">
            <Row>
              <Col  className="mt-1" md={3}>
                <small className="text-muted">Rating</small>
              </Col>
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
          </Container>
        </Card.Body>
        <Card.Footer className="ps-0 pe-0">
          <Container>
            {userRole === "SELLER" &&
            (course.postedBy === userId || course.postedBy._id === userId) ? (
              <Row>
                <Col md={6}>
                  <small className="text-muted">{`${course.cost} VNDD`}</small>
                </Col>
                <Col
                  md={6}
                  className="d-flex align-items-center justify-content-end"
                >
                  <Button
                    className="ms-1"
                    size="sm"
                    variant="warning"
                    onClick={chooseCourse.bind(this, course._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="ms-1"
                    size="sm"
                    variant="danger"
                    onClick={deleteCourse.bind(this, course._id)}
                  >
                    Delete
                  </Button>
                  <Link to="/singlecourse">
                    <Button
                      className="ms-1"
                      size="sm"
                      variant="primary"
                      onClick={findCourse.bind(this,course._id)}
                    >
                      View
                    </Button>
                  </Link>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col md={9}>
                  <small className="text-muted">{`${course.cost} VNDD`}</small>
                </Col>
                <Col
                  md={3}
                  className="d-flex align-items-center justify-content-end"
                >
                  <Link to="/singlecourse">
                    <Button size="sm" variant="primary" onClick={findCourse.bind(this,course._id)}>
                      View
                    </Button>
                  </Link>
                </Col>
              </Row>
            )}
          </Container>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default ModalCourse;
