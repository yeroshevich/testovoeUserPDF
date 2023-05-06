#!/bin/sh

echo "Starting ... 🖥️ 🔎🔎"

cd /var/www

if ([ ! -f "/ssl_cert/key.pem" ] && [ ! -f "/ssl_cert/cert.pem" ]); then
     echo '
'
     echo '🧩🧩🧩🧩🧩 Begin Generate Key Certificate 🧩🧩🧩🧩🧩'
     mkdir "/ssl_cert"
     openssl genrsa 2048 > /ssl_cert/key.pem \
         && chmod 400 /ssl_cert/key.pem \
         && openssl req -new -x509 -nodes -sha256 -days 9999 \
             -key /ssl_cert/key.pem -out /ssl_cert/cert.pem \
             -subj '/CN=localhost'

fi

mkdir /root/.ssh
cp Docker/keys/* /root/.ssh/
chmod 600 /root/.ssh/*

echo '
'
echo '🧩🧩🧩🧩🧩 Begin install 🧩🧩🧩🧩🧩'
yarn install

echo '
'

yarn prisma migrate dev --name init


chown node:node -Rf /var/www/.logs
chown node:node -Rf /var/www/node_modules

echo '
'
echo "💪 💪 💪 Ready server  - run dev ... "
yarn dev

exec "$@"
