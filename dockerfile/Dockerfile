ARG BASE_PRIVATE_REGISTRY=""
FROM ${BASE_PRIVATE_REGISTRY}node:14.5.0 as install
ADD ./package-lock.json ./package.json /hkube/pipeline-cleaner/
WORKDIR /hkube/pipeline-cleaner
RUN npm ci --production

ARG BASE_PRIVATE_REGISTRY=""
FROM ${BASE_PRIVATE_REGISTRY}hkube/base-node:v1.2.0
LABEL maintainer="yehiyam@gmail.com"
RUN mkdir /hkube
COPY . /hkube/pipeline-cleaner
COPY --from=install /hkube/pipeline-cleaner/node_modules /hkube/pipeline-cleaner/node_modules

WORKDIR /hkube/pipeline-cleaner
CMD ["node", "app.js"]
