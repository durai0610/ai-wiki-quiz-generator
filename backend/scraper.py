import requests
from bs4 import BeautifulSoup

def scrape_wikipedia(url: str):
    """
    Reliable Wikipedia scraper.
    Extracts clean text from paragraphs only.
    """

    try:
        response = requests.get(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
            }
        )

        if response.status_code != 200:
            return "Unknown Title", ""

        soup = BeautifulSoup(response.text, "html.parser")

        # Extract title
        title_tag = soup.find("h1", id="firstHeading")
        title = title_tag.get_text(strip=True) if title_tag else "Untitled"

        # The REAL text is inside #mw-content-text
        content = soup.find("div", id="mw-content-text")
        if not content:
            return title, ""

        extracted_text = []

        # Extract text only from paragraphs
        for p in content.find_all("p"):
            text = p.get_text(" ", strip=True)

            if len(text) > 50:
                extracted_text.append(text)

        article_text = "\n".join(extracted_text).strip()

        return title, article_text

    except Exception as e:
        print("Scraper Error:", e)
        return "Error", ""
