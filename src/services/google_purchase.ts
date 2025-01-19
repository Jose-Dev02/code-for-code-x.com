// import { google } from "googleapis";

// const validateGooglePurchase = async (
//   packageName: string,
//   productId: string,
//   purchaseToken: string
// ) => {
//   const auth = new google.auth.GoogleAuth({
//     scopes: ["https://www.googleapis.com/auth/androidpublisher"],
//   });

//   const client = await auth.getClient();
//   const publisher = google.androidpublisher({ version: "v3", auth: client });

//   const response = await publisher.purchases.products.get({
//     packageName,
//     productId,
//     token: purchaseToken,
//   });

//   if (response.data.purchaseState === 0) {
//     return response.data;
//   } else {
//     throw new Error(`Google validation failed: ${response.data.purchaseState}`);
//   }
// };
