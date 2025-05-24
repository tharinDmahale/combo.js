# Use an official Node.js runtime as a parent image
FROM node:lts

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the application's port
EXPOSE 3000 3001

# Define the command to run the application
CMD ["npm", "run", "app"]