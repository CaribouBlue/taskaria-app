aws dynamodb create-table \
    --endpoint-url http://localhost:8000 \
    --table-name Tasks \
    --attribute-definitions \
        AttributeName=TaskId,AttributeType=S \
    --key-schema \
        AttributeName=TaskId,KeyType=HASH \
    --provisioned-throughput \
        ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --table-class STANDARD
