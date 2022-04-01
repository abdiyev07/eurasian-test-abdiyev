#!/bin/sh

npm ci &&
npm run migration &&
npm run start:dev