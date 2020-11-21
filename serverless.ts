import type { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: {
    name: "serverless-typescript-template",
  },
  package: {
    individually: true,
  },
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: [
    "serverless-webpack",
    "serverless-offline",
    "serverless-dotenv-plugin",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
        ],
        Resource: {
          "Fn::GetAtt": ["usersTable", "Arn"],
        },
      },
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      secret: "${env:TABLE}",
    },
  },
  resources: {
    Resources: {
      usersTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "usersTable",
          AttributeDefinitions: [
            {
              AttributeName: "email",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "email",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
  functions: {
    basic: {
      handler: "./src/index.basic",
      events: [
        {
          http: {
            method: "post",
            path: "basic",
          },
        },
      ],
    },
    server: {
      handler: "./src/index.server",
      events: [
        {
          http: {
            method: "post",
            path: "graphql",
            cors: true,
          },
        },
        {
          http: {
            method: "get",
            path: "graphql",
            cors: true,
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
