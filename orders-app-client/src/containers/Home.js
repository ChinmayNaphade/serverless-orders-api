import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";

export default function Home(props) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const orders = await loadOrders();
        setOrders(orders);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  function loadOrders() {
    return API.get("orders", "/orders");
  }

  function renderOrdersList(orders) {
    return [{}].concat(orders).map((order, i) =>
      i !== 0 ? (
        <LinkContainer key={order.orderid} to={`/orders/${order.orderid}`}>
          <ListGroupItem header={order.category + " " + order.service}>
            {"Created: " + new Date(order.createdAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/orders/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new order
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Orders</h1>
        <p>Futuralis Orders</p>
      </div>
    );
  }

  function renderOrders() {
    return (
      <div className="orders">
        <PageHeader>Your Orders</PageHeader>
        <ListGroup>{!isLoading && renderOrdersList(orders)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderOrders() : renderLander()}
    </div>
  );
}
