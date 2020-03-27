import React, { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import { Elements, StripeProvider } from "react-stripe-elements";
import BillingForm from "../components/BillingForm";
import config from "../config";

export default function Orders(props) {
  const [order, setOrder] = useState(null);
  const [category, setCategory] = useState("");
  const [service, setService] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  function billUser(details) {
    return API.post("orders", "/billing", {
      body: details
    });
  }

  useEffect(() => {
    function loadOrder() {
      return API.get("orders", `/orders/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const order = await loadOrder();
        const { category, service } = order;

        setCategory(category);
        setService(service);
        setOrder(order);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function deleteNote() {
    return API.del("orders", `/orders/${props.match.params.id}`);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteNote();
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }

  async function handleFormSubmit(orderid, { token, error }) {
    if (error) {
      alert(error);
      return;
    }

    setIsLoading(true);

    try {
      await billUser({
        orderid,
        source: token.id
      });

      alert("Your card has been charged successfully!");
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Orders">
      {order && (
        <div>
          <h2>{category}</h2>
          <h2>{service}</h2>
          <div className="Billing">
            <StripeProvider apiKey={config.stripe.STRIPE_KEY}>
              <Elements>
                <BillingForm
                  isLoading={isLoading}
                  onSubmit={handleFormSubmit}
                />
              </Elements>
            </StripeProvider>
          </div>
          <LoaderButton
            margin="12"
            block
            bsSize="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </div>
      )}
    </div>
  );
}
