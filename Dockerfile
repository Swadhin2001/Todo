FROM node:20

# Copy all files into container
COPY . .

# Install NextJs 
RUN npm install

# Go to backend directory 
WORKDIR /backend/
# Install all backend dependencies
RUN npm install

#Switch back to main directory
WORKDIR /

# Define the commands to run application
CMD [ "sh", "-c", "cd .. && npm run dev & cd backend  && npm start" ]

