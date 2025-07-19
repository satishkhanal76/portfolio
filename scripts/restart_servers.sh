echo "Stopping all PM2 processes..."
pm2 delete all

echo "Installing dependencies for all server-based projects..."
for dir in projects/*; do
  if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
    echo "Installing dependencies in $dir..."
    (cd "$dir" && npm install)
  fi
done

echo "Starting PM2 processes..."
pm2 start ecosystem.config.cjs --env production

echo "Saving PM2 process list..."
pm2 save

echo PM2 processes restarted successfully.