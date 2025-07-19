echo "Stopping all PM2 processes..."
pm2 delete all

echo "Starting PM2 processes..."
pm2 start ecosystem.config.js --env production

echo "Saving PM2 process list..."
pm2 save

echo PM2 processes restarted successfully.