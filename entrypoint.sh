#!/bin/sh

echo "Starting ... 🖥️ 🔎🔎"

cd /var/www

echo '
'
echo '🧩🧩🧩🧩🧩 Begin install 🧩🧩🧩🧩🧩'
yarn

echo '
'

chown node:node -Rf /var/www/.logs
chown node:node -Rf /var/www/node_modules

yarn prisma migrate dev --name init

echo '
'
echo "💪 💪 💪 Ready server  - run dev ... "
yarn dev

exec "$@"
