import axios from "axios";
import * as cheerio from "cheerio";
import { logger } from "./logger.js";

export const scrapeWebsite = async (url) => {
  if (!url.startsWith("http")) {
    url = "https://" + url;
  }

  logger.info("Scraping URL", { url });

  const { data } = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  const $ = cheerio.load(data);

  return {
    title: $("title").text(),
    headings: $("h1, h2, h3").map((i, el) => $(el).text()).get(),
    buttons: $("button").map((i, el) => $(el).text()).get(),
    forms: $("form").length,
    text: $("p").map((i, el) => $(el).text()).get().slice(0, 20)
  };
};