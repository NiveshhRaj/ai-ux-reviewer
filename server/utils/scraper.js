import axios from "axios";
import * as cheerio from "cheerio";

export const scrapeWebsite = async (url) => {
  try {
    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      timeout: 10000,
    });

    const $ = cheerio.load(data);

    return {
      title: $("title").text(),
      headings: $("h1, h2, h3")
        .map((i, el) => $(el).text())
        .get(),
      buttons: $("button")
        .map((i, el) => $(el).text())
        .get(),
      forms: $("form").length,
      paragraphs: $("p")
        .map((i, el) => $(el).text())
        .get()
        .slice(0, 20),
    };
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error("Website blocks automated scraping (403 Forbidden)");
    }

    throw new Error("Failed to scrape website");
  }
};
