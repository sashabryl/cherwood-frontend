FROM node:16-alpine

EXPOSE 3000

WORKDIR /app/frontend/

COPY package.json .
COPY package-lock.json .

RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object --legacy-peer-deps

COPY . .

CMD ["npm", "start"]
