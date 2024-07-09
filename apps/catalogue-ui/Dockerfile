# Build image from Catalogue directory:
# docker build -f apps/catalogue-ui/Dockerfile -t catalogue-ui .

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

EXPOSE 4200

COPY apps/catalogue-ui/ ./apps/catalogue-ui/

CMD ["npm", "run", "start:frontend"]