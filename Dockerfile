# Kies een geschikte Node.js versie
FROM node:18-alpine

# Maak en stel de werkdirectory in
WORKDIR /app

# Kopieer de package.json en package-lock.json naar de container
COPY frontend/package.json frontend/package-lock.json* /app/

# Installeer de afhankelijkheden
RUN npm install

# Kopieer de rest van de applicatie naar de container
COPY frontend/ /app/

# Exposeer poort 3000
EXPOSE 3000

# Start de app
CMD ["npm", "start"]
