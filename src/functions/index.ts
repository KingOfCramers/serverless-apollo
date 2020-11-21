import { handler } from "./Types";
import { createError, createSuccess } from "../common";
import { dynamoDb } from "../db";

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
