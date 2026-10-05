#!/usr/bin/env node
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HTML = path.join(__dirname, "prueba-tecnica.html");
const PDF = path.join(__dirname, "Prueba-Tecnica-Linea-Estetica-Paola-Hoyos.pdf");

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.goto(`file://${HTML}`, { waitUntil: "networkidle0" });

await page.pdf({
  path: PDF,
  format: "Letter",
  printBackground: true,
  margin: { top: "9mm", right: "11mm", bottom: "10mm", left: "11mm" },
  preferCSSPageSize: true,
});

await browser.close();
console.log(`PDF generado: ${PDF}`);
