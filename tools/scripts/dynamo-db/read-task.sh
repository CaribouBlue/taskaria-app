aws dynamodb get-item --consistent-read \
    --endpoint-url http://localhost:8000 \
    --table-name Tasks \
    --key '{ "TaskId": {"S": "0"}}'