import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getUserDetailsAction,
  updateUserProfileAction,
} from "../actions/userActions";
import { listMyOrder } from "../actions/orderActions";
const ProfileScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const {
    loading: loadingMyOrderList,
    error: errorMyOrderList,
    orders,
  } = orderMyList;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword || password.length <= 5) {
      setMessage(
        "Make sure both password matches and are more than 5 characters long"
      );
    } else {
      dispatch(
        updateUserProfileAction({
          id: user._id,
          name,
          email,
          password,
        })
      );
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(listMyOrder());

        dispatch(getUserDetailsAction("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);
  return (
    <div>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {message && <Message variant="danger">{message}</Message>}
          {success && <Message variant="success">Successfully Updated</Message>}

          {error && <Message variant="danger">{error}</Message>}
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="py-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email" className="py-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password" className="py-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="conPwd" className="py-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-enter the password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {loadingMyOrderList ? (
            <Loader />
          ) : errorMyOrderList ? (
            <Message variant="danger">{errorMyOrderList}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>DETAILS</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant="primary">Details</Button>
                        </LinkContainer>
                      </td>
                    </tr>
              

                  ))}
                </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProfileScreen;
