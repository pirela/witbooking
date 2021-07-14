const http = require("http");

const hostname = "127.0.0.1";
const port = 4000;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Allow", "GET, ");

  const fs = require("fs");
  const axios = require("axios");

  const pathAuth = "https://witbooking.free.beeceptor.com/";

  const pathFile = "./allData.json";

  async function getAllData() {
    const { data } = await axios.get(`${pathAuth}apps`);
    
    const datastring = JSON.stringify({
      data,
    });

    fs.writeFile(
      pathFile,
      JSON.stringify({
        data: datastring,
      }),
      function (err, data) {
        if (err) {
          return console.log(err);
        }
        //console.log(data);
      }
    );
    res.end(
      JSON.stringify({
        datastring,
      })
    );
  }

  let rawdata = fs.readFileSync(pathFile);
  let allData = JSON.parse(rawdata);

  if (!allData.data) {
    getAllData();
  } else {
    res.statusCode = 200;
    res.end(rawdata);
  }
});

server.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});
