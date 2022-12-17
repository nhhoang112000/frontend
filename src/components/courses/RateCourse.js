import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext, useState, useEffect } from "react";
import { CourseContext } from "../../contexts/CourseContext";
import { Rate } from "antd";

const RateCourse = () => {
  // Contexts
  const {
    courseState: { course },
    showRateCourse,
    setShowRateCourse,
    updateCourseRating,
    findCourse,
    setShowToast,
  } = useContext(CourseContext);

  // State
  const [updatedCourse, setUpdatedCourse] = useState(course);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    setUpdatedCourse(course);
  }, [course]);

  useEffect(() => {
    setUpdatedCourse({ ...updatedCourse, rate: (course.rate*course.learner.length + userRating)/(course.learner.length+1) });
  }, [userRating]);

  // const {rate}=updatedCourse;

  const onUpdateRating = (value) => {
    setUserRating(value);
  };

  const closeRateDialog = () => {
    setShowRateCourse(false);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateCourseRating(updatedCourse);
    setShowRateCourse(false);
    findCourse(course._id);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  return (
    <div>
      <Modal show={showRateCourse} onHide={closeRateDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Rating</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body className="d-flex justify-content-center">
            {/* <Form.Group>
              <Form.Label>
                Enter the score you want to rate for the course
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your rate"
                name="rate"
                required
                defaultValue={0}
                //   value={title}
                  onChange={onUpdateRating}
              />
            </Form.Group> */}
            <Rate
              value={userRating}
              onChange={(value) => {
                onUpdateRating(value);
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="danger" size="sm" onClick={closeRateDialog}>
              Cancel
            </Button> */}
              <Button variant="primary" size="sm" type="submit">
                Submit
              </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default RateCourse;
