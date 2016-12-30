# fast-track
Setup an express app fast

### install
```bash
npm install fast-track express xtconf --save
```
This installs fast-track and it's peer dependencies

### Usage
```javascript
const app = require('fast-track');
// load any routes or middleware you want
var http = require('http');
var port = 3232;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
```

### Info
fast-track uses [xtconf](https://npmjs.com/package/xtconf) to read config files when installed generates the initial config. The template system used is [ejs](https://npmjs.com/package/ejs) 