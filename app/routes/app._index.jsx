import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { getCustomerId } from "../models/Service.server";

export async function loader({ request }) {
  const { admin, session } = await authenticate.admin(request);
  const customer = await getCustomerId("russel.winfield@example.com", admin.graphql);

  return json({
    customer,
  });
}

export default function CustomerPage() {
  const { customer } = useLoaderData();

  return (
    <div>
      <h1>Customer Information</h1>
      {customer ? (
        <div>
          <p>Customer ID: {customer.customerId}</p>
          <p>Customer Name: {customer.customerFirstName} {customer.customerLastName}</p>
        </div>
      ) : (
        <p>No customer found.</p>
      )}
    </div>
  );
}