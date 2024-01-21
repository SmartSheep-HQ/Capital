#!/bin/sh

cd /app;
npm install;
npx prisma db push;
npm run start;