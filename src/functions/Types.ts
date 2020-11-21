import {
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
  Context,
  Callback,
} from "aws-lambda";

export interface InputType {
  url: string;
  puppeteer: boolean;
}

export interface InputWithSelector extends InputType {
  selector?: string;
  unique?: boolean;
  limit?: number;
}

export type handlerWithCallback = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<APIGatewayProxyResult>
) => Promise<void>;

export type handler = (
  event: APIGatewayProxyEvent,
  context: Context
) => Promise<APIGatewayProxyResult>;
