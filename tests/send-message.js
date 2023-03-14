import sqs from 'k6/x/sqs'
import { randomString, uuidv4 } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
const client = sqs.newClient();

export default function (){
    let uuid = uuidv4();
    let name = randomString(10);

    const params = {
        DelaySeconds: 0,
        MessageAttributes: {
            "ContentType": {
                DataType: "String",
                StringValue: "application/json"
            }
        },
        MessageBody: `{
            "id":"${uuid}",
            "name":"${name}"
        }`,
        // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
        // MessageGroupId: "Group1",  // Required for FIFO queues
        QueueUrl: "http://localhost:4566/000000000000/dummy-k6-queue"
    };

    sqs.send(client,params);
}