# Use official node image as base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy the rest of the code
COPY . .

# Set the NODE_OPTIONS environment variable with max-old-space-size
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build the app
RUN yarn build

# Serve the app using serve
RUN yarn global add serve


CMD ["serve", "-s", "build", "-l", "3000"]
