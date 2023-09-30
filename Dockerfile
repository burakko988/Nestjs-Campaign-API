FROM node:16 As builder

# Create app directory
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY  package*.json ./


# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm install 

# Bundle app source
COPY  . .

# Those Dockerfile , docker-compose.yml will work on local machine