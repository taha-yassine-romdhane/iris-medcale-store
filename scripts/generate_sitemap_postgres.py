import os
import re
import sys
import json
import datetime
from pathlib import Path
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Function to slugify product names (similar to your TypeScript implementation)
def slugify(text):
    # Convert to lowercase
    text = text.lower()
    # Replace spaces with hyphens
    text = re.sub(r'\s+', '-', text)
    # Remove special characters
    text = re.sub(r'[^\w\-]', '', text)
    # Remove duplicate hyphens
    text = re.sub(r'\-+', '-', text)
    # Remove leading and trailing hyphens
    text = text.strip('-')
    return text

def get_products_from_db():
    """
    Get products directly from the PostgreSQL database using the connection string from .env
    """
    # Get database connection string from .env file
    database_url = os.getenv('DATABASE_URL')
    
    if not database_url:
        print("Error: DATABASE_URL not found in environment variables")
        return []
    
    try:
        # Connect to the database
        conn = psycopg2.connect(database_url)
        
        # Create a cursor that returns dictionaries
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        # Execute query to get products with their media and additional details
        cursor.execute("""
            SELECT p.id, p.name, p."updatedAt", p.brand, p.category, p.type, p.stock,
                   p.description, p.features,
                   json_agg(json_build_object('url', m.url, 'alt', m.alt, 'type', m.type)) as media,
                   (SELECT AVG(r.rating) FROM "Review" r WHERE r."productId" = p.id) as average_rating,
                   (SELECT COUNT(r.id) FROM "Review" r WHERE r."productId" = p.id) as review_count
            FROM "Product" p
            LEFT JOIN "Media" m ON m."productId" = p.id
            GROUP BY p.id, p.name, p."updatedAt", p.brand, p.category, p.type, p.stock, p.description, p.features
        """)
        
        # Fetch all products
        products = cursor.fetchall()
        
        # Close cursor and connection
        cursor.close()
        conn.close()
        
        print(f"Found {len(products)} products in the database.")
        return products
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return []

def generate_sitemap():
    """
    Generate a sitemap.xml file with all products and static pages
    """
    # Base URL for the site
    base_url = 'https://www.elitemedicaleservices.tn'
    
    # Current date in YYYY-MM-DD format for lastmod
    current_date = datetime.datetime.now().strftime('%Y-%m-%d')
    
    # Get products from database
    products = get_products_from_db()
    
    # Start building the sitemap XML with additional namespaces for structured data
    sitemap = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <!-- Homepage (Highest Priority) -->
  <url>
    <loc>{base_url}/</loc>
    <lastmod>{current_date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Informational Pages -->
  <url>
    <loc>{base_url}/apnee-du-sommeil</loc>
    <lastmod>{current_date}</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>{base_url}/a-propos</loc>
    <lastmod>{current_date}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>{base_url}/contact</loc>
    <lastmod>{current_date}</lastmod>
    <priority>0.8</priority>
  </url>
  
  <!-- Appointment & Professional Pages -->
  <url>
    <loc>{base_url}/appointment</loc>
    <lastmod>{current_date}</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>{base_url}/space-pro</loc>
    <lastmod>{current_date}</lastmod>
    <priority>0.7</priority>
  </url>
  
  <!-- Authentication Pages (Lower Priority) -->
  <url>
    <loc>{base_url}/login</loc>
    <lastmod>{current_date}</lastmod>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>{base_url}/signup</loc>
    <lastmod>{current_date}</lastmod>
    <priority>0.3</priority>
  </url>
  
  <!-- Product Categories (High SEO Value) -->
  <url>
    <loc>{base_url}/products?category=APPAREILS+CPAP%2FPPC</loc>
    <lastmod>{current_date}</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>{base_url}/products?category=ACCESSOIRES+CPAP%2FPPC</loc>
    <lastmod>{current_date}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>{base_url}/products?category=CONCENTRATEURS+D%27OXYGENE</loc>
    <lastmod>{current_date}</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>{base_url}/products?category=MASQUES</loc>
    <lastmod>{current_date}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>{base_url}/products?category=APPAREILS+NEBULISEUR</loc>
    <lastmod>{current_date}</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>{base_url}/products?category=APPAREILS+ASPIRATEUR</loc>
    <lastmod>{current_date}</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>{base_url}/products?category=ACCESSOIRES+AEROSOL</loc>
    <lastmod>{current_date}</lastmod>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>{base_url}/products?category=ACCESSOIRE+ASPIRATEUR</loc>
    <lastmod>{current_date}</lastmod>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>{base_url}/products?category=LIT+MEDICALISE</loc>
    <lastmod>{current_date}</lastmod>
    <priority>0.7</priority>
  </url>
  
  <!-- Individual Product Pages (High SEO Value) -->
"""
    
    # Add each product to the sitemap
    for product in products:
        product_slug = slugify(product.get('name', ''))
        # Format the lastmod date if available, otherwise use current date
        lastmod = product.get('updatedAt', current_date)
        if isinstance(lastmod, datetime.datetime):
            lastmod = lastmod.strftime('%Y-%m-%d')
        
        # Get stock status
        stock_status = product.get('stock', 'IN_STOCK')
        
        # Get product details
        product_name = product.get('name', '')
        product_brand = product.get('brand', '')
        product_category = product.get('category', '')
        product_type = product.get('type', '')
        product_description = product.get('description', '')
        
        # Get rating information
        average_rating = product.get('average_rating')
        review_count = product.get('review_count', 0)
        
        # Start the URL entry
        sitemap += f"""  <url>
    <loc>{base_url}/product/{product_slug}</loc>
    <lastmod>{lastmod}</lastmod>
    <priority>0.8</priority>
    
    <!-- Product metadata for search engines -->
    <xhtml:meta name="product:brand" content="{product_brand}"/>
    <xhtml:meta name="product:category" content="{product_category}"/>
    <xhtml:meta name="product:type" content="{product_type}"/>
    <xhtml:meta name="product:availability" content="{stock_status}"/>
"""
        
        # Add rating information if available
        if average_rating is not None and review_count > 0:
            sitemap += f"""
    <xhtml:meta name="product:rating" content="{average_rating:.1f}"/>
    <xhtml:meta name="product:review_count" content="{review_count}"/>
"""
        
        # Add image information if available
        media = product.get('media')
        if media and isinstance(media, list) and len(media) > 0:
            # Filter out any None values and only include images
            media_items = [item for item in media if item and isinstance(item, dict) 
                          and item.get('url') and item.get('type', 'image') == 'image']
            
            for media_item in media_items:
                image_url = media_item.get('url')
                if image_url:
                    # Ensure the URL is absolute
                    if not image_url.startswith('http'):
                        image_url = f"{base_url}{image_url if image_url.startswith('/') else '/' + image_url}"
                    
                    # Get the alt text or use the product name
                    image_alt = media_item.get('alt') or product.get('name', '')
                    image_title = f"{product_name} | {product_brand}"
                    
                    sitemap += f"""
    <image:image>
      <image:loc>{image_url}</image:loc>
      <image:title>{image_title}</image:title>
      <image:caption>{image_alt}</image:caption>
    </image:image>"""
        
        # Close the URL entry
        sitemap += """
  </url>
"""
    
    # Add search page and close the sitemap
    sitemap += """  
  <!-- Search Page (Low Priority) -->
  <url>
    <loc>https://www.elitemedicaleservices.tn/search?q=cpap</loc>
    <lastmod>""" + current_date + """</lastmod>
    <priority>0.2</priority>
  </url>
</urlset>"""
    
    # Write the sitemap to the public directory
    project_root = Path(__file__).parent.parent
    sitemap_path = project_root / 'public' / 'sitemap.xml'
    
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(sitemap)
    
    print(f"Sitemap generated successfully at {sitemap_path}")
    print(f"Added {len(products)} product URLs to the sitemap.")

if __name__ == "__main__":
    generate_sitemap()
