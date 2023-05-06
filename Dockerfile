FROM node:lts

WORKDIR /var/www

COPY . .

CMD ["yarn","build"]

