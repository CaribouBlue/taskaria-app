aws dynamodb update-item \
    --endpoint-url http://localhost:8000 \
    --table-name Tasks \
    --key '{ "TaskId": {"S": "0"}}' \
    --update-expression "SET UserId = :newval" \
    --expression-attribute-values '{":newval":{"S":"0"}}' \
    --return-values ALL_NEW