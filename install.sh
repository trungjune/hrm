#!/bin/bash

# Check if the script is run with sudo
if [ "$EUID" -ne 0 ]; then
    echo "Please run the script as sudo."
    exit 1
fi

# 1. Ask if the user is using an Ubuntu machine
read -p "Are you using an Ubuntu machine? (y/n): " isUbuntu
if [ "$isUbuntu" != "y" ]; then
    echo "This script is designed for Ubuntu machines."
    exit 1
fi

# 2. Ask for frontend IP/URL
read -p "Enter the frontend URL or IP address with port: " frontendIP

# Append the frontend IP to allowedOrigins in backend/app.js
sed -i "/allowedOrigins = \[/a \"$frontendIP\"," backend/app.js

# 3. Modify the frontend/package.json file
sed -i "/\"homepage\":/c\    \"homepage\":\"$frontendIP\"," frontend/package.json
if ! grep -q "\"homepage\":\"$frontendIP\"" frontend/package.json; then
    echo "\"homepage\":\"$frontendIP\"," >> frontend/package.json
fi

# 4. Ask for backend IP/URL
read -p "Enter the backend URL or IP address with port: " backendIP

# Add or replace the backend IP/URL in the .env file
if grep -q "REACT_APP_API=" frontend/.env; then
    sed -i "/REACT_APP_API=/c\REACT_APP_API=\"$backendIP\"" frontend/.env
else
    echo "REACT_APP_API=\"$backendIP\"" >> frontend/.env
fi

# 5. Automatically give permissions and run docker.sh
chmod +x docker.sh
./docker.sh

echo "Running Migrate"

# Author: @omegasolution
# Pre-defined container name
#!/bin/bash

# Search for a container name containing "backend"
CONTAINER_NAME=$(sudo docker ps --format '{{.Names}}' | grep "backend")

# Check if a matching container was found
if [[ -z "$CONTAINER_NAME" ]]; then
    echo "No container with 'backend' in its name was found."
    exit 1
fi

# Check if there are multiple matches, and prompt the user to choose one
if [ $(echo "$CONTAINER_NAME" | wc -l) -gt 1 ]; then
    echo "Multiple containers with 'backend' in their names were found:"
    echo "$CONTAINER_NAME"
    echo -n "Please choose a container name from the list above: "
    read CHOSEN_CONTAINER_NAME
    
    # Check if the chosen name is empty or not in the list of found containers
    if [[ -z "$CHOSEN_CONTAINER_NAME" || ! $(echo "$CONTAINER_NAME" | grep -q "$CHOSEN_CONTAINER_NAME") ]]; then
        echo "Invalid container name selected."
        exit 1
    fi
    
    CONTAINER_NAME="$CHOSEN_CONTAINER_NAME"
fi

# Run the commands inside the selected container using sudo
sudo docker exec -it "$CONTAINER_NAME" bash -c "yarn prisma migrate dev --name init"
sudo docker exec -it "$CONTAINER_NAME" bash -c "yarn prisma db seed"

echo "Commands executed successfully!"



# 6. Print success message
echo "Setup completed! Enjoy " && exit 0
