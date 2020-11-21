import AWS from "aws-sdk";
import { handler } from "./Types";
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const basic: handler = async (_event, _context) => {
  var params = {
    TableName: process.env.TABLE,
    Item: {
      email: "testing@gmail.com",
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      body: "Hooray",
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 502,
      body: "Failure",
    };
  }
};
