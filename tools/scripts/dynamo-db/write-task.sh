aws dynamodb put-item \
    --endpoint-url http://localhost:8000 \
    --table-name Tasks  \
    --item \
        '{"TaskId": {"S": "0"}, "UserId": {"S": "0"}}'