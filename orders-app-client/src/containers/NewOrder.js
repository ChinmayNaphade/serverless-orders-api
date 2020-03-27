import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewOrder.css";
import { useFormFields } from "../libs/hooksLib";
import { API } from "aws-amplify";

export default function NewOrder(props) {
  const [fields, handleFieldChange] = useFormFields({
    category: "Category1",
    service: "Service1"
  });
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return fields.category.length > 0 && fields.service.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await createOrder({ category: fields.category, service: fields.service });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function createOrder(order) {
    return API.post("orders", "/orders", {
      body: order
    });
  }

  return (
    <div className="NewOrder">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="category">
          <ControlLabel>Category</ControlLabel>
          <FormControl
            value={fields.category}
            componentClass="select"
            onChange={handleFieldChange}
          >
            <option value="Category1">Category1</option>
            <option value="Category2">Category2</option>
            <option value="Category3">Category3</option>
          </FormControl>
        </FormGroup>
        <FormGroup controlId="service">
          <ControlLabel>Service</ControlLabel>
          <FormControl
            value={fields.service}
            componentClass="select"
            onChange={handleFieldChange}
          >
            <option value="Service1">Service1</option>
            <option value="Service2">Service2</option>
            <option value="Service3">Service3</option>
          </FormControl>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}
