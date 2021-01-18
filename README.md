## How to use?

Start a local MYSQL instance using docker:

`docker run -it -d -e MYSQL_ROOT_PASSWORD=root-pw -e MYSQL_DATABASE=bisu -e MYSQL_USER=bisu-user -e MYSQL_PASSWORD=bisu-pass --name mysql_test mysql:8.0 --default-authentication-plugin=mysql_native_password`

Install dependencies:

`npm run install`

Start:

`npm run start`