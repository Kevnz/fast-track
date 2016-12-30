const fs = require('fs-extra');
const path = require('path');
const configDir = path.join(process.cwd(), 'config');
const viewsDir = path.join(process.cwd(), 'views');
const publicDir = path.join(process.cwd(), 'public')
fs.ensureDirSync(configDir);
fs.ensureDirSync(publicDir);
fs.ensureDirSync(viewsDir);

const layout = `
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8" />
  <title><%-defineContent('pageTitle')%></title>
  <meta name="description" content="" />
  <meta name="author" content="" />
</head>

<body>
  <%- body %>
  <%-defineContent('footer')%>
</body>
</html>
`;

const index = `
<h1></h1>
<div>

</div>
<%- contentFor('pageTitle') %>
<%= title %>
`;

const config = {
  "session": {
    "secret": "secret session key",
    "resave": true,
    "saveUninitialized": true,
    "cookie": {
      "secure": true
    }
  }
}
fs.writeFileSync(path.join(viewsDir, 'layout.ejs' ), layout, 'utf8');
fs.writeFileSync(path.join(viewsDir, 'index.ejs'), index, 'utf8');
  
fs.writeJsonSync('./package.json', config);
fs.copy(path.join(__dirname, 'favicon.ico'), path.join(publicDir, 'favicon.ico'));
console.log('directories and files created');