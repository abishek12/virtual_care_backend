#!/bin/bash
# rollback.sh - Emergency rollback script

LATEST_BACKUP=$(ls -t /home/$USER/backups/ | head -1)

if [ -z "$LATEST_BACKUP" ]; then
    echo "No backups found!"
    exit 1
fi

echo "Rolling back to: $LATEST_BACKUP"
cp -r /home/$USER/backups/$LATEST_BACKUP/* ~/public_html/
echo "Rollback completed!"