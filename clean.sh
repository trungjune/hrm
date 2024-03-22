#!/bin/bash
set -e

# Script: Docker_Cleanup.sh
# Author: @iamtakdir
# Date: September 12, 2023
# Build for: Omega Solution's Software.
# Description: This script stops the Docker service, cleans Docker, and checks for leftovers.

# Display a warning message and ask for confirmation.
echo "WARNING: This script will stop Docker, clean Docker data, and prune containers and volumes. This will remove all Docker-related data, including containers, images, and volumes. Make sure you have backups if needed."
read -p "Do you want to proceed? (y/n): " confirm

if [[ $confirm != "y" ]]; then
    echo "Cleanup aborted."
    exit 0
fi

echo "Stopping Docker service..."
sudo systemctl stop docker
echo "Docker service stopped successfully."

echo "Cleaning Docker data..."
sudo rm -rf /var/lib/docker
echo "Docker data cleaned successfully."

echo "Checking for leftovers..."
sudo docker system prune -a --volumes
echo "Leftovers checked and removed."

echo "Cleanup complete. You can now use Docker again."
