# Base Project

## Getting started

- Currently tested with LTS Node v10.16.3
- Spin up your server, connect to it and checkout the MLPipe-Manager repository
- If you have not yet, install MongoDB. Docu [here](https://github.com/j-o-d-o/MLPipe-Manager/docs/install_mongodb.md)
- Make a copy of the .env.template file, rename it to .env and adjust the fields: `MONGODB_URI, MONGODB_URI_TEST, USER_TOKEN`

### Install packages and start server
```bash
# Install packages
>> npm install
# Build the typescript project (typescript needs to be installed: >> npm install typescript -g)
>> tsc
# Start with NODE_ENV=prod and node
>> npm start
```
To run it with [pm2](http://pm2.keymetrics.io/), run `>> pm2 --name MLPipe-Manager start npm -- start`</br>
Note, in case you are not using any webserver and want to access the api through http://ip:port, dont forget to open the port in case you use any firewall. Alternatively, server the API via a webserver and domain.

### Create admin user
Currently the creation of new users is only possible by admins. As there is no MLPipe user in the beginning, there is a script to create a first admin user:
```bash
>> cd scripts
# positional arguments: [0]: user name, [1]: user email, [2]: password
>> node create_admin_user.js UserName my@email.com my_password
```
