import AWS from "aws-sdk";

// If in production, connect to production DynamoDB server.
const config =
  process.env.NODE_ENV === "development"
    ? { region: "us-east-1", endpoint: "http://localhost:8000" }
    : {};

export const dynamoDb = new AWS.DynamoDB.DocumentClient(config);
