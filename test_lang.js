const { JSDOM } = require("jsdom");
const fs = require("fs");

const html = fs.readFileSync("/Users/taweechai/Documents/pvt/property-selling-website/asset/properties/land/land_hua-hin-1/index.html", "utf8");
const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;

// Mock translations
window.translations = {
    "en": { "nav_about": "About" },
    "th": { "nav_about": "เกี่ยวกับ" }
};
window.propertyContent = {
    "en": { "about_title": "Title EN" },
    "th": { "about_title": "Title TH" }
};

// Evaluate main.js
const mainJs = fs.readFileSync("/Users/taweechai/Documents/pvt/property-selling-website/js/main.js", "utf8");
try {
    window.eval(mainJs);
} catch (e) {
    console.log("Error evaluating main.js", e);
}

document.dispatchEvent(new window.Event("DOMContentLoaded"));

const langSelect = document.getElementById("lang-select");
console.log("Initial About text:", document.querySelector("[data-i18n='nav_about']").innerHTML);
console.log("Initial Title text:", document.querySelector("[data-i18n='about_title']").innerHTML);

// Simulate change event
langSelect.value = "en";
langSelect.dispatchEvent(new window.Event("change"));

console.log("After change About text:", document.querySelector("[data-i18n='nav_about']").innerHTML);
console.log("After change Title text:", document.querySelector("[data-i18n='about_title']").innerHTML);

