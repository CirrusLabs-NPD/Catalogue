# Build image:
# docker build -f apps/catalogue-backend/Dockerfile -t catalogue-backend .

FROM node

WORKDIR /app

COPY package*.json .

RUN npm install --omit=dev

EXPOSE 3000

COPY dist/apps/catalogue-backend/main.js ./

CMD ["node", "main.js"]