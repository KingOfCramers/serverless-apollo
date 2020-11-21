import { APIGatewayProxyResult } from "aws-lambda";

export const createError = (e: Error): APIGatewayProxyResult => {
  // Log error and return to user.
  console.error("❌", e);
  return {
    statusCode: 502,
    body: JSON.stringify({ message: e.message, name: e.name }),
  };
};

export const createSuccess = (body: string): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    body,
  };
};
