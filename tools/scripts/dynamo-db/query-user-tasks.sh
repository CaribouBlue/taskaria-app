aws dynamodb query \
    --endpoint-url http://localhost:8000 \
    --table-name Tasks \
    --index-name UserId-index \
    --key-condition-expression "UserId = :id" \
    --expression-attribute-values  '{":id":{"S":"0"}}'