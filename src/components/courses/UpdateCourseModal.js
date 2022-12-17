import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState, useEffect } from "react";
import { CourseContext } from "../../contexts/CourseContext";

const UpdateCourseModal = () => {
  // Contexts
  const {
    courseState: { course },
    showUpdateCourseModal,
    setShowUpdateCourseModal,
    updateCourse,
    setShowToast,
    imagePreview, setImagePreview
  } = useContext(CourseContext);

  // State
  // const [imagePreview, setImagePreview] = useState(null)
  const [updatedCourse, setUpdatedCourse] = useState(course);
  useEffect(() => {
    setUpdatedCourse(course);
  }, [course]);

  const {
    title,
    type,
    framework,
    rate,
    url,
    description,
    cost,
    image,
    learner,
  } = updatedCourse;

  const onChangeUpdatedCourseForm = (event) =>
    setUpdatedCourse({
      ...updatedCourse,
      [event.target.name]: event.target.value,
    });

  const onChangeFile = (event) => {
    setUpdatedCourse({ ...updatedCourse, image: event.target.files[0] });
    setImagePreview(URL.createObjectURL(event.target.files[0]))
  };

  const closeDialog = () => {
    setUpdatedCourse(course);
    setShowUpdateCourseModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateCourse(updatedCourse);
    setShowUpdateCourseModal(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  return (
    <Modal show={showUpdateCourseModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Update your course here</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeUpdatedCourseForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your description"
              name="description"
              value={description}
              onChange={onChangeUpdatedCourseForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Link to course</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL"
              name="url"
              value={url}
              onChange={onChangeUpdatedCourseForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Type of course</Form.Label>
            <Form.Select
              name="type"
              value={type}
              onChange={onChangeUpdatedCourseForm}
              aria-label="Default select example"
            >
              <option value="Full stack">Full stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Tester">Tester</option>
              <option value="BA">BA</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Framework</Form.Label>
            <Form.Control
              type="text"
              name="framework"
              value={framework}
              onChange={onChangeUpdatedCourseForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Cost</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter cost here"
              name="cost"
              value={cost}
              onChange={onChangeUpdatedCourseForm}
            />
          </Form.Group>
          <img
            className="mt-3"
            style={{ height: "15rem" }}
            src={updatedCourse.image.data?
             (`data:${updatedCourse.image.contentType};base64, ${Buffer.from(
              updatedCourse.image.data.data
            ).toString("base64")}`)
            :
            imagePreview
          }
            alt="image update"
          />
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              required
              type="file"
              placeholder="Choose file"
              name="image"
              onChange={onChangeFile}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateCourseModal;
