FROM node:0.10


RUN npm install -g gulp

RUN wget --no-check-certificate https://github.com/darcys22/guana-cobra/archive/master.zip
ADD master.zip /app/

RUN cd /app

RUN npm install 
RUN gulp

ENV PORT 3000  
EXPOSE 3000

CMD [ "npm", "start" ]
