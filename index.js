const fs = require('fs');
const http = require('http');
const url = require('url');

/////////////////////////
//FILES =>fs
//blocing code execution
// const textIn = fs.readFileSync('./txt/read-this.txt', 'utf-8');
// console.log(textIn);

// const textOut = fs.writeFileSync(
//   './txt/output-penjelasan.txt',
//   `ini tuh penjelasan tentang alpukat di bahasa inggris: ${textIn}`
// );
// console.log('sukses membuat surat');

//non blocking synchronous
// const test = fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//   fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.writeFile(`./txt/gabungan.txt`, `${data}\n${data2}`, (err) => {
//       console.log('sukses menggabungkan data');
//     });
//   });
// });
// console.log('hai FSW 2 nunggu read file yah');

// const test = fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//   fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
//     fs.readFile(`./txt/final.txt`, 'utf-8', (err, data3) => {
//       fs.writeFile(`./txt/gabungan2.txt`, `${data2}\n${data3}`, (err) => {
//         console.log('sukses menggabungkan data');
//       });
//     });
//   });
// });
// console.log('hai FSW 2 nunggu read file yah');

//////////////////
// SERVER dengan HTTP
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === '/hello') {
    res.end('ini hello ke fsw2');
  } else if (pathName === '/product') {
    res.end(
      JSON.stringify({
        data: 'Ini product',
      })
    );
  } else if (pathName === '/api') {
    const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(data);
  } else if (pathName === '/overview') {
    const overViewPage = fs.readFileSync(
      `${__dirname}/templates/overview.html`
    );
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end(overViewPage);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
    });
    res.end(`<h1>url ini tidak ada apa apa</h1>`);
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Hello servernya udah jalan');
});
