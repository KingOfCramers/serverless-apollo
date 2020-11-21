import AWS from "aws-sdk";
import { handler } from "./Types";
import { createError, createSuccess } from "./helpers";

// If in production, connect to production DynamoDB server.
const config =
  process.env.NODE_ENV === "development"
    ? { region: "us-east-1", endpoint: "http://localhost:8000" }
    : {};
const dynamoDb = new AWS.DynamoDB.DocumentClient(config);

type Input = {
  [key: string]: string;
};

export const basic: handler = async (event, _context) => {
  try {
    // Input is JSON
    const input: Input = JSON.parse(event.body);
    var params = {
      TableName: process.env.TABLE,
      Item: { email: input.email },
    };
    await dynamoDb.put(params).promise();
    return createSuccess(input.email);
  } catch (err) {
    return createError(err);
  }
};
