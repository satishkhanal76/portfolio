sudo cp ./nginx/satishkhanal.com.conf /etc/nginx/sites-available/satishkhanal.com
sudo ln -sf /etc/nginx/sites-available/satishkhanal.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx