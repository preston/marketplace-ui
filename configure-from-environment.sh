#!/bin/bash

echo "{
	\"MARKETPLACE_SERVER_URL\" : \"${MARKETPLACE_SERVER_URL}\",
	\"MARKETPLACE_SERVER_WEBSOCKET_URL\" : \"${MARKETPLACE_SERVER_WEBSOCKET_URL}\"
}" > configuration.json
exit 0