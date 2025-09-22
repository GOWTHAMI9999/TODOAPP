# Use Node.js
FROM node:20.19
<<<<<<< HEAD

=======
>>>>>>> ad135ecfc5bda90529c031fdc1a38b33e28658b1

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy everything else
COPY . .

# Expose Vite dev port
EXPOSE 5173

# Start dev server
CMD ["npm", "run", "dev", "--", "--host"]



