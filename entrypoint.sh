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
     #chown node:node /ssl_cert/key.pem
     #chown node:node /ssl_cert/cert.pem
fi

mkdir /root/.ssh
cp Docker/keys/* /root/.ssh/
chmod 600 /root/.ssh/*

echo '
'
echo '🧩🧩🧩🧩🧩 Begin install 🧩🧩🧩🧩🧩'
# npm install
yarn

echo '
'
# echo '🧩🧩🧩🧩🧩 Begin audit fix 🧩🧩🧩🧩🧩'
# npm audit fix


chown node:node -Rf /var/www/.logs
chown node:node -Rf /var/www/node_modules

yarn prisma migrate dev --name init

echo '
'
echo "💪 💪 💪 Ready server  - run dev ... "
yarn dev

exec "$@"
