#!/bin/bash

# Function to check system RAM size
get_ram_size() {
    total_mem_kb=$(grep MemTotal /proc/meminfo | awk '{print $2}')
    total_mem_mb=$((total_mem_kb / 1024))
    echo "$total_mem_mb"
}

# Check if the script is running with root privileges
if [[ $EUID -ne 0 ]]; then
    echo "This script must be run as root. Please use 'sudo $0'."
    exit 1
fi

# Check if the system RAM is less than 3GB
if [ $(get_ram_size) -lt 3072 ]; then
    # Calculate the swap size in megabytes (2GB)
    swapsize=2548

    # Check if a swap file already exists
    if [ -e /swapfile ]; then
        echo "Swap file already exists. No action needed."
    else
        # Create a swap file with the specified size
        dd if=/dev/zero of=/swapfile bs=1M count=$swapsize

        # Set appropriate permissions for the swap file
        chmod 600 /swapfile

        # Make it a swap file
        mkswap /swapfile

        # Enable the swap file
        swapon /swapfile

        # Add an entry to /etc/fstab to make the swap file permanent
        echo '/swapfile none swap sw 0 0' >> /etc/fstab

        echo "Swap file created and activated."
    fi
else
    echo "System RAM is 3GB or higher. No swap file created."
fi

# Prompt the user to confirm if they are using an Ubuntu machine
# Author : @omegasolution
read -p "Are you using an Ubuntu machine? (y/n): " is_ubuntu

if [ "$is_ubuntu" == "y" ]; then
    echo "Step 1: Adding Docker's official GPG key"
    sudo apt-get update
    sudo apt-get install -y ca-certificates curl gnupg
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg

    echo "Step 2: Adding the Docker repository to Apt sources"
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    echo "Step 3: Updating Apt repositories"
    sudo apt-get update

    echo "Step 4: Installing Docker and related packages"
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    echo "Step 5: Starting Docker Compose"
    sudo docker compose up -d

    # Notify the user that Docker setup is complete
    echo "Docker and related packages have been installed, and Docker Compose is running."
    echo "Enjoy, Visit: https://solution.omega.ac for more"
else
    echo "This script is designed for Ubuntu machines. Please use an Ubuntu-based distribution."
    echo "If you are using other distribution, please visit: https://docs.docker.com/engine/install/ "
fi

