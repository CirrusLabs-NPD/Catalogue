# Build image from Catalogue directory:
# docker build -f apps/catalogue-backend/Dockerfile -t catalogue-backend .

FROM node

WORKDIR /apps

COPY package*.json .
COPY nx.json .
COPY tsconfig.base.json .
COPY jest.config.ts .
COPY jest.preset.js .
COPY .eslintrc.json .
# COPY .eslintignore .

RUN npm install

EXPOSE 3000

COPY apps/catalogue-backend/ ./apps/catalogue-backend/

CMD ["npm", "run", "start:backend"]