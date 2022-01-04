const http = require("http");
function sniffPort(min, max) {
  for (let i = min; i < max; i++)
    http
      .get("http:/localhost:" + i + "/ping", (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          console.log("PORT OPEN FOUND: ",i,"Data result: ",JSON.parse(data));
          return;
        });
      })
      .on("error", (err) => {
    
      });
}
sniffPort(3000,4000);
