# Step 1: Set up the base image
FROM node:18-slim as build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the app
RUN npm run build

# Step 7: Set up the production environment
FROM nginx:alpine

# Step 8: Copy the build output from the previous image to the nginx folder
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80 to allow traffic to the app
EXPOSE 80

# Step 10: Start nginx
CMD ["nginx", "-g", "daemon off;"]
