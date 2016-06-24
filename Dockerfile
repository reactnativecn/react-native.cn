FROM registry.aliyuncs.com/docker/ubuntu14.04:latest

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash

RUN apt-get update && apt-get -y install make gcc g++ python git

RUN bash -c "source ~/.nvm/nvm.sh && nvm install 6.2"

WORKDIR /var/work

COPY . ./

RUN bash -c "source ~/.nvm/nvm.sh && nvm use 6.2 && npm cache clean && npm install --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist --production"

RUN bash -c "source ~/.nvm/nvm.sh && nvm use 6.2 && node bin/cli build-client"

CMD bash -c "source ~/.nvm/nvm.sh && nvm use 6.2 && node bin/cli production"

