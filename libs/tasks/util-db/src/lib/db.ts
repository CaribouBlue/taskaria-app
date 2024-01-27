import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import {
  TASK_TABLE_NAME,
  USER_ID_INDEX_NAME,
} from '@taskaria-app/tasks/util-constants';
import { Task, Tasks } from '@taskaria-app/tasks/util-types';

export class TasksDb {
  _client?: DynamoDBClient;

  async createClient() {
    const client = new DynamoDBClient({ endpoint: 'http://localhost:8000' });
    return client;
  }

  get client(): Promise<DynamoDBClient> {
    return Promise.resolve(this._client || this.createClient());
  }

  async queryTasks(userId: string): Promise<Tasks> {
    const input: QueryCommandInput = {
      TableName: TASK_TABLE_NAME,
      IndexName: USER_ID_INDEX_NAME,
      ExpressionAttributeValues: {
        ':id': {
          S: userId,
        },
      },
      KeyConditionExpression: 'UserId = :id',
    };
    const command = new QueryCommand(input);
    const output = await (await this.client).send(command);
    return output.Items?.map((item) => unmarshall(item) as Task) || [];
  }

  async getTask(taskId: string, userId?: string) {
    const input: GetItemCommandInput = {
      Key: {
        TaskId: {
          S: taskId,
        },
      },
      TableName: TASK_TABLE_NAME,
    };
    if (input.Key && userId) {
      input.Key.UserId = { S: userId };
    }
    const command = new GetItemCommand(input);
    const output = await (await this.client).send(command);
    return output.Item && (unmarshall(output.Item) as Task);
  }

  async putTask(unmarshalledTask: Task) {
    const input: PutItemCommandInput = {
      TableName: TASK_TABLE_NAME,
      Item: marshall(unmarshalledTask),
    };
    const command = new PutItemCommand(input);
    await (await this.client).send(command);
    return unmarshalledTask;
  }
}
