import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState , useEffect } from "react";
import { CourseContext } from "../../contexts/CourseContext";

const AddCourse = () => {
  // Contexts
  const { showAddCourse, setShowAddCourse, addCourse, setShowToast,imagePreview, setImagePreview } =
    useContext(CourseContext);

  // State
  // const [imagePreview, setImagePreview] = useState(null);
  const [newCourse, setNewCourse] = useState({
    title: "",
    type: "Full stack",
    framework: "",
    rate: 0,
    url: "",
    description: "",
    cost: 0,
    // learner: [],
    image: null,
  });

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
  } = newCourse;

  useEffect(() => {
    setImagePreview(null);
  }, []);

  const onChangeNewCourseForm = (event) =>
    setNewCourse({ ...newCourse, [event.target.name]: event.target.value });

  const onChangeFile = (event) => {
    setNewCourse({ ...newCourse, image: event.target.files[0] });
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  const closeDialog = () => {
    resetAddCourseData();
  };

  const resetAddCourseData = () => {
    setNewCourse({
      title: "",
      type: "Full stack",
      framework: "",
      rate: 0,
      url: "",
      description: "",
      cost: 0,
      // learner: [],
      image: null,
    });
    setShowAddCourse(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addCourse(newCourse);
    resetAddCourseData();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
    setImagePreview(null)

  };

  return (
    <Modal show={showAddCourse} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Add your course here</Modal.Title>
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
              onChange={onChangeNewCourseForm}
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
              onChange={onChangeNewCourseForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Link to course</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL"
              name="url"
              value={url}
              onChange={onChangeNewCourseForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Type of course</Form.Label>
            <Form.Select
              name="type"
              value={type}
              defaultValue="Full stack"
              onChange={onChangeNewCourseForm}
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
              onChange={onChangeNewCourseForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Cost</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter cost here"
              name="cost"
              value={cost}
              onChange={onChangeNewCourseForm}
            />
          </Form.Group>
          {imagePreview!==null ? (
            <img
              className="mt-3"
              style={{ height: "15rem" }}
              src={imagePreview}
              alt="image update"
            />
          ) : null}
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
            Add
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddCourse;
