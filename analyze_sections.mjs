import fs from "fs";

const content = fs.readFileSync("chunk_0~vkdd-perhi3.js", "utf8");

// Let us find Menu contents
const menuIdx = content.indexOf("menu-");
console.log("Menu match around:", menuIdx);
if (menuIdx !== -1) {
  console.log(content.slice(menuIdx - 100, menuIdx + 1500));
}

// Let us search for sections: HomeHero, WorkedAt, SelectedWork, About, Contact
const sections = ["hero", "work", "worked", "about", "contact", "footer", "stats", "tools"];
sections.forEach(s => {
  const matches = [...content.matchAll(new RegExp(`[a-zA-Z0-9_-]*${s}[a-zA-Z0-9_-]*`, "gi"))].map(m => m[0]);
  console.log(`Classes for ${s}:`, [...new Set(matches)].slice(0, 15));
});
