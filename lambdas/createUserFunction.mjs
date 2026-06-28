import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {

    const body = JSON.parse(event.body);

    const params = {
        TableName: "DevOpsUsersTable",
        Item: {
            userId: body.userId,
            name: body.name,
            email: body.email
        }
    };

    try {

        await dynamodb.send(new PutCommand(params));

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "User created successfully via CI/CD Pipeline"
            })
        };

    } catch (error) {

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message
            })
        };
    }
    console.log("User creation process completed.");
};