#!/bin/bash
cd /home/kavia/workspace/code-generation/chess-tutor-interactive-30532-30541/chess_learning_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

