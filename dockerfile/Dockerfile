ARG BASE_PRIVATE_REGISTRY=""
FROM ${BASE_PRIVATE_REGISTRY}hkube/base-node:v1.1.1
LABEL maintainer="yehiyam@gmail.com"
RUN mkdir /hkube
COPY . /hkube/pipeline-cleaner
RUN cd /hkube/pipeline-cleaner
WORKDIR /hkube/pipeline-cleaner
CMD ["node", "app.js"]
