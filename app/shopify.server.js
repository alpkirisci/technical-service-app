import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-07";
import prisma from "./db.server";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.July24,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  restResources,
  future: {
    unstable_newEmbeddedAuthStrategy: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
  async afterAuth({ session }) {
    // Create Metaobjects after successful authentication
    await createMetaobjects(session.shop, session.accessToken);
  },
});

async function createMetaobjects(shop, accessToken) {
  const createMetaobject = async (metaobjectDefinition) => {
    const response = await fetch(`https://${shop}/admin/api/2024-07/metaobjects.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      body: JSON.stringify({
        metaobject: metaobjectDefinition,
      }),
    });

    return await response.json();
  };

  const serviceChildDefinition = {
    type: 'serviceChild',
    fields: [
      { name: 'customerId', type: 'string' },
      { name: 'productHandle', type: 'string' },
      { name: 'boughtFrom', type: 'string' },
      { name: 'billingDate', type: 'date' },
      { name: 'billingNo', type: 'string' },
      { name: 'complaint', type: 'string' },
      { name: 'status', type: 'string' },
      { name: 'repair', type: 'string' },
      { name: 'repairCost', type: 'float' },
      { name: 'createdAt', type: 'date' },
      { name: 'images', type: 'json' },
    ],
  };

  const serviceParentDefinition = {
    type: 'serviceParent',
    fields: [
      { name: 'serviceRequests', type: 'json' }, // This will be a list of references to serviceChild Metaobjects
    ],
  };

  await createMetaobject(serviceChildDefinition);
  await createMetaobject(serviceParentDefinition);
}

export default shopify;
export const apiVersion = ApiVersion.July24;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
