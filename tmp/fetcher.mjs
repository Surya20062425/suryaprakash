import https from "https";
import fs from "fs";

function fetch(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (c) => data += c);
      res.on("end", () => resolve(data));
    });
  });
}

async function run() {
  const html = await fetch("https://curtisdesignr.me/");
  fs.writeFileSync("/tmp/index_fetched.html", html);
  
  // Extract all chunk scripts
  const scripts = [...html.matchAll(/src="(\/_next\/static\/chunks\/[^"]+\.js)"/g)].map(m => m[1]);
  console.log("Total scripts:", scripts.length);

  for (const s of scripts) {
    const code = await fetch("https://curtisdesignr.me" + s);
    fs.writeFileSync("/tmp/" + s.split("/").pop(), code);
  }
  console.log("All chunks saved to /tmp");
}

run();
