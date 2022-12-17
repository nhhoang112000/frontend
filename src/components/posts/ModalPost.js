import React,{useState} from "react";
import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import user from "../../assets/user.png";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const ModalPost = ({ post, userRole, userId }) => {
  const {deletePost,findPost,setShowUpdatePostModal,updateLike}=useContext(PostContext)

  //State
  const [updatedPost, setUpdatedPost] = useState(post)
  const {like}=updatedPost

  const choosePost =(postId)=>{
    findPost(postId);
    setShowUpdatePostModal(true);
  }

  const handleUpdateLike = async()=>{
    // setUpdatedPost({
    //   ...updatedPost,
    //   like:updatedPost.like+1
    // })
     await updateLike({
      ...updatedPost,
      like:updatedPost.like+1
    })
  }

  return (
    <div>
      <Container
        style={{
          backgroundColor: "#0077b6",
          borderRadius: "5px",
          padding: "5px  20px",
          color: "white",
        }}
      >
        <Row>
          <Col sm={1}>
            <img
              src={user}
              style={{ height: "3rem", width: "3rem", objectFit: "contain" }}
              alt="user image"
            />
          </Col>
          <Col sm={2} className="d-flex align-items-center ">
            {" "}
            <b>{post.postedBy.username}</b>
          </Col>
          {(post.postedBy === userId || post.postedBy._id === userId) ? (
            <>
              <Col className="d-flex align-items-center justify-content-end">
                <img
                src={editIcon}
                style={{ cursor:"pointer",marginRight:"10px",height: "1.5rem", width: "1.5rem", objectFit: "contain" }}
                alt="editIcon"
                onClick={choosePost.bind(this, post._id)}
              />
              
              <img
              src={deleteIcon}
              style={{ cursor:"pointer", height: "1.5rem", width: "1.5rem", objectFit: "contain" }}
              alt="deleteIcon"
              onClick={deletePost.bind(this, post._id)}
            />
            </Col>
            </>
          ):null}
        </Row>
        <Row className="pt-1 ">
          <b>{post.title}</b>
        </Row>
        <Row className="pt-1 ms-1">{post.content}</Row>
        <Row>
          <img
            className="pt-2"
            style={{ height: "25rem", objectFit: "cover" }}
            src={`data:${post.image.contentType};base64, ${Buffer.from(
              post.image.data.data
            ).toString("base64")}`}
          />
        </Row>
        <Row  style={{ color: "#f28482" }} className="mt-3 mb-2 d-flex justify-content-start">
        <Col sm={1}><FontAwesomeIcon onClick={handleUpdateLike} style={{ height: "25px",cursor:"pointer" }} className="ms-3" icon={faHeart} /></Col>
        <Col sm={1} >{post.like}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default ModalPost;
