import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext, useState, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";

const UpdatePost = () => {
  //Contexts
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
    imagePreview,
    setImagePreview,
  } = useContext(PostContext);

  //State
  const [updatedPost, setUpdatedPost] = useState(post)

  useEffect(()=>{
    setUpdatedPost(post);
  },[post])

  const {title,content,image,like}= updatedPost

  const closeDialog = () => {
    // setUpdatedCourse(course);
    setShowUpdatePostModal(false);
    setImagePreview(null)

  };

  const onChangeUpdatedPostForm = (event) =>
    setUpdatedPost({
      ...updatedPost,
      [event.target.name]: event.target.value,
    });

    const onChangeFile = (event) => {
        setUpdatedPost({ ...updatedPost, image: event.target.files[0] });
        setImagePreview(URL.createObjectURL(event.target.files[0]))
      };

      const onSubmit = async (event) => {
        event.preventDefault();
        const { success, message } = await updatePost(updatedPost);
        setShowUpdatePostModal(false);
        setImagePreview(null)
        setShowToast({ show: true, message, type: success ? "success" : "danger" });
      };

  return <div>
    <Modal show={showUpdatePostModal} onHide={closeDialog}>
    <Modal.Header closeButton>
        <Modal.Title>Update your post here</Modal.Title>
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
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your content"
              required
              name="content"
              value={content}
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>  
          <img
            className="mt-3"
            style={{ height: "15rem" }}
            src={updatedPost.image.data?
             (`data:${updatedPost.image.contentType};base64, ${Buffer.from(
                updatedPost.image.data.data
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
  </div>;
};

export default UpdatePost;
