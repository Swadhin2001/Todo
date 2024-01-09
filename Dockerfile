FROM node:20

# Copy package.json files into app directory
COPY /package.json /app/package.json
COPY /package-lock.json /app/package-lock.json

# Copy backend package.json files into app directory
COPY /backend/package.json /app/backend/package.json
COPY /backend/package-lock.json /app/backend/package-lock.json

# Inside app directory
WORKDIR /app/

# Install NextJs 
RUN npm install

# Go to backend directory 
WORKDIR /app/backend/

# Install all backend dependencies
RUN npm install

# Copy all files into app directory
COPY . /app/


#Switch back to main directory
WORKDIR /app

# Define the commands to run application
CMD [ "sh", "-c", "npm run dev & cd backend  && npm start" ]

