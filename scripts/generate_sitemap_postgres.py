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
        
        # Execute query to get products
        cursor.execute("SELECT id, name, \"updatedAt\" FROM \"Product\"")
        
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
    
    # Start building the sitemap XML
    sitemap = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
            
        sitemap += f"""  <url>
    <loc>{base_url}/product/{product_slug}</loc>
    <lastmod>{lastmod}</lastmod>
    <priority>0.8</priority>
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
