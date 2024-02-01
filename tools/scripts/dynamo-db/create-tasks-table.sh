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

aws dynamodb update-table \
    --endpoint-url http://localhost:8000 \
    --table-name Tasks \
    --attribute-definitions AttributeName=UserId,AttributeType=S \
    --global-secondary-index-updates \
        "[{\"Create\":{\"IndexName\": \"UserId-index\",\"KeySchema\":[{\"AttributeName\":\"UserId\",\"KeyType\":\"HASH\"}], \
        \"ProvisionedThroughput\": {\"ReadCapacityUnits\": 10, \"WriteCapacityUnits\": 5      },\"Projection\":{\"ProjectionType\":\"ALL\"}}}]"