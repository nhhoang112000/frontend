import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { PostContext } from "../contexts/PostContext";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import ModalPost from "../components/posts/ModalPost";
import UpdatePost from "../components/posts/UpdatePost";


const Forum = () => {
  // Contexts
  const {
    authState: {
      user: { _id, username, role },
    },
  } = useContext(AuthContext);

  const {
    postState: { post, posts, postsLoading },
    getPosts,
    addPost,
    showToast: { show, message, type },
    setShowToast,
    imagePreview,
    setImagePreview,
  } = useContext(PostContext);

  //State
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    like: 0,
    image: null,
  });
  const [searchPostText, setSearchPostText] = useState("");

  const { title, content, like, image } = newPost;

  //  create a ref for the file input
  const inputRef = useRef(null);
  const resetFileInput = () => {
    //  reset input value
    inputRef.current.value = null;
  };

  // Start: Get all posts
  useEffect(() => {
    getPosts();
    setImagePreview(null);
  }, []);

  //search handle

  const onChangeNewPostForm = (event) =>
    setNewPost({ ...newPost, [event.target.name]: event.target.value });

  const onChangeFile = (event) => {
    setNewPost({ ...newPost, image: event.target.files[0] });
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  const resetAddPostData = () => {
    setNewPost({
      title: "",
      content: "",
      like: 0,
      image: null,
    });
    setImagePreview(null);
    resetFileInput();
  };

  const onSubmitPost = async (event) => {
    event.preventDefault();
    const { success, message } = await addPost(newPost);
    resetAddPostData();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
    // setImagePreview(null)
  };

  //set content of forum
  let body = null;

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hello {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to RECOURES</Card.Title>
            <Card.Text>
              There is no post now. Do you want to post something ?
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <Container>
        {posts
        .filter((post) => {
          if (searchPostText === "") {
            return post;
          } else if (
            post.title.toLowerCase().includes(searchPostText.toLowerCase())
            || post.content.toLowerCase().includes(searchPostText.toLowerCase())
          ) {
            return post;
          }
        })        
        .map((post) => (
          <Row key={post._id} className="justify-content-md-center mt-3">
            <Col sm={8}>
              <ModalPost
                post={post}
                key={post._id}
                userId={_id}
                userRole={role}
              
              />
            </Col>
          </Row>
        ))}
      </Container>
    );
  }

  return (
    <div>
      <Container >
        {/* search text */}
        <Row className="justify-content-md-center mt-3">
          <Col sm={8}>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </InputGroup.Text>
              <Form.Control
                as="input"
                placeholder="Search posts"
                value={searchPostText}
                onChange={(e) => {
                  setSearchPostText(e.target.value);
                }}
              />
            </InputGroup>
          </Col>
        </Row>
        {/* enter post content */}
        <Row className="justify-content-md-center ">
          <Col style={{ backgroundColor:"#0077b6" }} className="square  rounded-4  pb-2 pt-2" sm={8}>
            <Form>
              <Form.Group>
                <Form.Label style={{ color:"white" }} >Title </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title of the post"
                  name="title"
                  required
                  value={title}
                  onChange={onChangeNewPostForm}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ color:"white" }}>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter content of the post"
                  name="content"
                  value={content}
                  onChange={onChangeNewPostForm}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        {/* image and button  */}
        <Row className="justify-content-md-center ">
          <Col sm={4}>
            {imagePreview !== null ? (
              <img
                className="mt-3"
                style={{ height: "20rem" }}
                src={imagePreview}
                alt="image update"
              />
            ) : null}
            <Form.Group>
              {/* <Form.Label>Image</Form.Label> */}
              <Form.Control
                ref={inputRef}
                className="mt-3 mb-3"
                type="file"
                placeholder="Choose image"
                name="image"
                onChange={onChangeFile}
              />
            </Form.Group>
          </Col>
          <Col sm={4} className="d-flex align-items-start justify-content-end">
            <Button
              className="mt-3"
              size="sm"
              variant="danger"
              onClick={resetAddPostData}
            >
              Cancel
            </Button>
            <Button
              className="ms-1 mt-3"
              size="sm"
              variant="primary"
              onClick={onSubmitPost}
            >
              Post
            </Button>
          </Col>
        </Row>
        {/* body */}
        <Row>{body}</Row>
      </Container>
      {post !==null && <UpdatePost/>}
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

export default Forum;
