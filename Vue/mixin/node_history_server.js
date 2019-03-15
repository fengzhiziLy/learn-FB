const http = require('http')
const fs = require('fs')
const httpPort = 81

http.createServer((req, res) => {
  if (req.url.startsWith('/js') || req.url.startsWith('/css')) {
    fs.readFile('.' + req.url, (err, data) => {
      res.end(data)
    })
    return
  }
  fs.readFile('route_skelecton.html', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.htm" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})