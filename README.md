# NodeDealerApp

# node_module installation : server side

cd NodeDealerApp
npm install
node -v
npm -v
node app.js

# Database service

mongod &

# Angular instalation : client side

cd Client-Module
sudo npm --save-dev install @angular/cli
sudo npm install ng-common
ng serve &  #webpack compilation


# API call Server URL : " http://localhost:3000/cards "
# Client URL          : " http://localhost:4200/ "
