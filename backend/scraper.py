import requests
from bs4 import BeautifulSoup
import logging
from typing import List, Dict
import time
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Category mapping from Nepali to English
CATEGORY_MAP = {
    'समाचार': 'News',
    'बिजनेस': 'Business',
    'खेलकुद': 'Sports',
    'सूचना-प्रविधि': 'Technology',
    'जीवनशैली': 'Lifestyle',
    'स्वास्थ्य': 'Health',
    'मनोरञ्जन': 'Entertainment',
    'अन्तर्राष्ट्रिय': 'International',
}

def fetch_articles(max_articles=20) -> List[Dict]:
    """
    Scrape articles from OnlineKhabar homepage.
    
    Args:
        max_articles: Maximum number of articles to scrape
        
    Returns:
        List of article dictionaries with id, title, category, content, url
    """
    try:
        # Fetch homepage
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        logger.info("Fetching OnlineKhabar homepage...")
        response = requests.get('https://www.onlinekhabar.com/', headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'lxml')
        
        # Find article links
        articles = []
        article_id = 1
        
        # Look for article links in different sections
        # OnlineKhabar uses various article link patterns
        article_links = []
        
        # Find all links that look like article URLs
        for link in soup.find_all('a', href=True):
            href = link.get('href', '')
            # OnlineKhabar article URLs typically contain /2025/ and a number
            if '/2025/11/' in href or '/2024/' in href:
                if 'onlinekhabar.com' in href:
                    article_links.append(href)
                elif href.startswith('/'):
                    article_links.append(f"https://www.onlinekhabar.com{href}")
        
        # Remove duplicates while preserving order
        seen = set()
        unique_links = []
        for link in article_links:
            if link not in seen:
                seen.add(link)
                unique_links.append(link)
        
        logger.info(f"Found {len(unique_links)} unique article links")
        
        # Scrape each article (up to max_articles)
        for idx, url in enumerate(unique_links[:max_articles]):
            if idx >= max_articles:
                break
                
            try:
                article_data = scrape_article_detail(url, article_id, headers)
                if article_data:
                    articles.append(article_data)
                    article_id += 1
                    logger.info(f"Scraped article {article_id-1}: {article_data['title'][:50]}...")
                    
                    # Be respectful - add small delay between requests
                    time.sleep(0.5)
                    
            except Exception as e:
                logger.warning(f"Failed to scrape article {url}: {str(e)}")
                continue
        
        logger.info(f"Successfully scraped {len(articles)} articles")
        return articles
        
    except Exception as e:
        logger.error(f"Error fetching articles from OnlineKhabar: {str(e)}")
        # Return empty list on error - main.py will use fallback data
        return []


def scrape_article_detail(url: str, article_id: int, headers: dict) -> Dict:
    """
    Scrape details from a single article page.
    
    Args:
        url: Article URL
        article_id: Unique ID for the article
        headers: HTTP headers for the request
        
    Returns:
        Dictionary with article data
    """
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'lxml')
        
        # Extract title
        title = ''
        title_tag = soup.find('h1', class_='ok-single-title')
        if title_tag:
            title = title_tag.get_text(strip=True)
        else:
            # Fallback to meta title
            meta_title = soup.find('meta', property='og:title')
            if meta_title:
                title = meta_title.get('content', '')
        
        if not title:
            return None
        
        # Extract category
        category = 'News'  # Default category
        category_tag = soup.find('a', class_='ok-post-category')
        if category_tag:
            nepali_category = category_tag.get_text(strip=True)
            category = CATEGORY_MAP.get(nepali_category, 'News')
        
        # Extract content
        content = ''
        # OnlineKhabar article content is usually in div with class 'ok-post-content'
        content_div = soup.find('div', class_='ok-post-content')
        if content_div:
            # Get all paragraphs
            paragraphs = content_div.find_all('p')
            content = ' '.join([p.get_text(strip=True) for p in paragraphs])
        
        # If no content found, try to get from meta description
        if not content:
            meta_desc = soup.find('meta', property='og:description')
            if meta_desc:
                content = meta_desc.get('content', '')
        
        # Extract image (optional)
        image_url = ''
        meta_image = soup.find('meta', property='og:image')
        if meta_image:
            image_url = meta_image.get('content', '')
        
        # Only return if we have at least title and some content
        if title and content:
            return {
                'id': article_id,
                'title': title,
                'category': category,
                'content': content[:500],  # Limit content length for better performance
                'url': url,
                'image': image_url,
                'published_date': datetime.now().isoformat()
            }
        
        return None
        
    except Exception as e:
        logger.error(f"Error scraping article detail from {url}: {str(e)}")
        return None


if __name__ == "__main__":
    # Test the scraper
    print("Testing OnlineKhabar scraper...")
    articles = fetch_articles(max_articles=5)
    print(f"\nScraped {len(articles)} articles:")
    for article in articles:
        print(f"\nID: {article['id']}")
        print(f"Title: {article['title']}")
        print(f"Category: {article['category']}")
        print(f"Content: {article['content'][:100]}...")
        print(f"URL: {article['url']}")
