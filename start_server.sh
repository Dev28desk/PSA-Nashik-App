
#!/bin/bash
# Cleanup existing processes
pkill -f "node|npm|ts-node|nodemon" 2>/dev/null

# Start server with logging
cd /workspace/PSA-Nashik-App/backend
npm run dev > server.log 2>&1 &

# Verify startup
sleep 5
if grep -q "Server running on port 51801" server.log; then
  echo "Server started successfully on port 51801"
  echo "Logs available at /workspace/PSA-Nashik-App/backend/server.log"
else
  echo "Server failed to start. Check server.log for details"
  tail -n 20 server.log
fi
