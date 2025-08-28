#!/bin/bash
# deploy.sh - Custom deployment script

echo "Starting deployment..."

# Backup current version (optional)
BACKUP_DIR="/home/$USER/backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR
cp -r ~/public_html/* $BACKUP_DIR/ 2>/dev/null || true

# Sync files excluding sensitive directories
rsync -av --delete \
    --exclude='.env' \
    --exclude='config/production.php' \
    --exclude='uploads/' \
    --exclude='node_modules/' \
    ~/deploy-temp/ ~/public_html/

# Set proper permissions
find ~/public_html -type d -exec chmod 755 {} \;
find ~/public_html -type f -exec chmod 644 {} \;

# Specific file permissions
chmod 600 ~/public_html/.env 2>/dev/null || true
chmod 644 ~/public_html/wp-config.php 2>/dev/null || true

# Run database migrations if needed
# php ~/public_html/artisan migrate --force  # Laravel example

echo "Deployment completed!"