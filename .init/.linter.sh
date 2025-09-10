#!/bin/bash
cd /home/kavia/workspace/code-generation/online-shop-platform-19414/ecommerce_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

