# Use the official Node.js image
FROM node:18

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy local code
COPY . .

# Copy service account JSON file
COPY credentials/keyfile.json /usr/src/app/credentials/keyfile.json

# Set environment variable for service account JSON file
ENV GOOGLE_APPLICATION_CREDENTIALS=/usr/src/app/credentials/keyfile.json

# Run the server
CMD [ "npm", "start" ]
