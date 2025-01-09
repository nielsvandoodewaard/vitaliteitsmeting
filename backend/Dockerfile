# Gebruik een Node.js image als basis
FROM strapi/strapi

# Stel de werkmap in
WORKDIR /app

# Kopieer package.json en package-lock.json (of yarn.lock) naar de container
COPY package*.json ./

# Installeer de afhankelijkheden
RUN npm install

# Kopieer de rest van de applicatie naar de container
COPY . .

# Stel de poort die Strapi gebruikt in
EXPOSE 1337

# Start Strapi
CMD ["npm", "start"]
