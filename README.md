# Nyblecraft Test Task

## Database Structure
``` sql
CREATE TABLE user(
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(512) UNIQUE NOT NULL,
    lastName VARCHAR(512) NOT NULL,
    image MEDIUMBLOB NOT NULL,
    pdf MEDIUMBLOB
);
```
## Usage
### DB Config
App uses node-mysql2 for connection. Parameters are in `mysqlconfig.ts`:
``` ts
export default {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nstesttask'
}

```
### Launch
``` sh
$ npx tsc
...
$ node src/index.js
```
### Request
#### Powershell:
```ps
Invoke-WebRequest "http://localhost:4000/user/generate_pdf" -Body '{"firstName": "Carmen"}' -ContentType "application/json" -Method Post
```
#### Curl:
``` sh
curl 'http://localhost:4000/user/generate_pdf' -H 'Content-Type: application/json' --data-raw '{"firstName": "Carmen"}'
```

### Response
If `firstName` exists: 
``` json
{
    "result": true,
    "pdfBuff":{"type":"Buffer","data":[...]}
}
```
`pdfBuff` contains the resulting pdf file.

If `firstName` doesn't exists in DB:
``` json
{
    "result": false,
}
```
### Result
![screenshot of pdf file](https://raw.githubusercontent.com/scarzdz/nyblecraft-testtask/master/screenshots/1.png)
