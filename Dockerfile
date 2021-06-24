FROM node:14.16.1 as trasnpiledApi
WORKDIR /usr/src

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:14.16.1
WORKDIR /usr/src

COPY package*.json ./
RUN npm install --production

COPY --from=trasnpiledApi /usr/src/dist .

EXPOSE 3000
CMD ["node", "app.js"]
