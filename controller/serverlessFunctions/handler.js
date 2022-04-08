"use strict";
const connectToDatabase = require("../../config/serverlessDb");
const AWS = require("aws-sdk");
const Resuturant = require("../../models/Resuturantmodel");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

module.exports.CreateOrder = async (event, context, callback) => {
  // const { firstname, price, status, user } = JSON.parse(event.body);
  console.log("order create");

  context.callbackWaitsForEmptyEventLoop = false;
  try {
    console.log("todo create call");
    const data = await Resuturant.find();
    console.log("data", data);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
  }
  // connectToDatabase()
  //   .then(() => {
  //     Resuturant.find()
  //       .then((notes) => {
  //         console.log("call");
  //         console.log(notes);
  //         callback(null, {
  //           statusCode: 200,
  //           body: JSON.stringify(notes),
  //         });
  //       })
  //       .catch((err) => {
  //         console.log("error call");
  //         callback(null, {
  //           statusCode: err.statusCode || 500,
  //           headers: { "Content-Type": "text/plain" },
  //           body: "Could not fetch the notes.",
  //         });
  //       });
  //
  //   });
};
module.exports.AddDynomoDbOrder = async (event, context, callback) => {
  console.log("todo all create call");
  console.log("aws call", AWS);
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const { todo, id } = JSON.parse(event.body);
  const createdAt = new Date().toISOString();
  console.log("todo create call", createdAt);
  const newTodo = {
    id,
    completed: false,
    todo,
    createdAt,
  };
  await dynamoDb
    .put({
      TableName: "TodoTable",
      Item: newTodo,
    })
    .promise();
  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};

module.exports.getAllDynomoDbOrder = async (event, context, callback) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const data = await dynamoDb
    .scan({
      TableName: "TodoTable",
    })
    .promise();
  console.log("data", data.Items);
  return {
    statusCode: 200,
    body: JSON.stringify(data.Items),
  };
};

module.exports.getOneDynomoDbOrder = async (event, context, callback) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const data = await dynamoDb
    .get({
      TableName: "TodoTable",
      Key: {
        id,
      },
    })
    .promise();
  console.log("data", data.Item);
  return {
    statusCode: 200,
    body: JSON.stringify(data.Item),
  };
};
module.exports.updateDynomoDbOrder = async (event, context, callback) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const { todo, completed } = JSON.parse(event.body);
  const data = await dynamoDb
    .update({
      TableName: "TodoTable",
      Key: {
        id,
      },
      UpdateExpression: "set todo = :todo, completed = :completed",
      ExpressionAttributeValues: {
        ":todo": todo,
        ":completed": completed,
      },
      ReturnValues: "UPDATED_NEW",
    })
    .promise();
  console.log("data", data);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
