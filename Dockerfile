# 1. use an offcial Node runtime  as a parent image
FROM node:18-alpine

# 2. Create a workdir inside the container
WORKDIR /usr/src/app

# 3. Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# 4. install dependencies
RUN npm install

# 5. Copy the rest of the app files
COPY .  .

# 6. Expose port 3000 to the outside world
EXPOSE 3000

# 7. Run the app
CMD npm start
