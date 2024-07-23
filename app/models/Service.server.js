import db from "../db.server";

async function getCustomerId(email, graphql) {
    if (!email) {
        throw new Error("Email is null");
    }

    const response = await graphql(
        `
        query getCustomerId($query: String!) {
            customers(first: 1, query: $query) {
                edges {
                    node {
                        id
                        firstName
                        lastName
                        email
                    }
                }
            }
        }
        `,
        {
            variables: {
                query: `email:${email}`, // Search customers by email
            }
        }
    );

    const { data: { customers } } = await response.json();
    const customer = customers.edges[0]?.node;

    return {
        customerEmail: email,
        customerId: customer?.id,
        customerFirstName: customer?.firstName,
        customerLastName: customer?.lastName
    };
}

export { getCustomerId };
