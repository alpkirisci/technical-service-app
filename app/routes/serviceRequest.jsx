// app/routes/serviceRequest.jsx
import { Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export async function loader({ request }) {
  const { admin, session } = await authenticate.admin(request);
  return json({ customer: session.customer });
}

export default function ServiceRequest() {
  const data = useLoaderData();
  return (
    <Form method="post">
      <h1>Service Request Form</h1>
      {/* Add your form fields here */}
      <input type="text" name="customerName" defaultValue={data.customer.name} />
      <button type="submit">Submit</button>
    </Form>
  );
}
