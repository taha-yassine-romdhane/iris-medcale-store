"""
PDF to Images Converter Script (Alternative version using PyMuPDF)
This script converts a PDF file to individual image files without requiring external dependencies.

Installation requirements:
pip install PyMuPDF Pillow
"""

import os
import sys
import fitz  # PyMuPDF
from PIL import Image
import io
import argparse

def convert_pdf_to_images(pdf_path, output_dir, zoom=3, format='webp', quality=90):
    """
    Convert a PDF file to individual images using PyMuPDF.
    
    Args:
        pdf_path (str): Path to the PDF file
        output_dir (str): Directory to save the images
        zoom (int): Zoom factor for rendering (higher = better quality)
        format (str): Image format (jpg, png, webp)
        quality (int): Image quality (1-100, higher = better quality)
    """
    try:
        # Create output directory if it doesn't exist
        os.makedirs(output_dir, exist_ok=True)
        
        print(f"Converting PDF: {pdf_path}")
        print(f"Output directory: {output_dir}")
        
        # Open the PDF file
        pdf_document = fitz.open(pdf_path)
        total_pages = len(pdf_document)
        
        # Define a higher DPI matrix for better quality
        mat = fitz.Matrix(zoom, zoom)
        
        # Convert each page to an image
        for page_num in range(total_pages):
            page = pdf_document.load_page(page_num)
            pix = page.get_pixmap(matrix=mat)
            
            # Convert pixmap to PIL Image
            img_data = io.BytesIO(pix.tobytes("png"))
            img = Image.open(img_data)
            
            # Convert to RGB mode if needed (for JPEG, WEBP)
            if format in ['jpg', 'webp'] and img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Save the image
            output_file = os.path.join(output_dir, f"page-{page_num + 1}.{format}")
            img.save(output_file, format=format.upper(), quality=quality)
            print(f"Saved: {output_file}")
        
        # Create a cover image from the first page with a special design
        if total_pages > 0:
            # Get first page as cover
            page = pdf_document.load_page(0)
            pix = page.get_pixmap(matrix=mat)
            img_data = io.BytesIO(pix.tobytes("png"))
            cover = Image.open(img_data)
            if cover.mode != 'RGB':
                cover = cover.convert('RGB')
            
            cover_file = os.path.join(output_dir, "catalogue-cover.webp")
            cover.save(cover_file, format='WEBP', quality=quality)
            print(f"Saved cover: {cover_file}")
            
            # Create a back cover from the last page
            page = pdf_document.load_page(total_pages - 1)
            pix = page.get_pixmap(matrix=mat)
            img_data = io.BytesIO(pix.tobytes("png"))
            back_cover = Image.open(img_data)
            if back_cover.mode != 'RGB':
                back_cover = back_cover.convert('RGB')
            
            back_cover_file = os.path.join(output_dir, "catalogue-back.webp")
            back_cover.save(back_cover_file, format='WEBP', quality=quality)
            print(f"Saved back cover: {back_cover_file}")
        
        pdf_document.close()
        print(f"Conversion complete! {total_pages} pages converted.")
        return True
    
    except Exception as e:
        print(f"Error converting PDF: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description='Convert PDF to images')
    parser.add_argument('--pdf', default='catalogue.pdf', help='Path to the PDF file')
    parser.add_argument('--output', default='catalogue-pages', help='Output directory for images')
    parser.add_argument('--zoom', type=int, default=3, help='Zoom factor for image quality')
    parser.add_argument('--format', default='webp', choices=['jpg', 'png', 'webp'], help='Image format')
    parser.add_argument('--quality', type=int, default=90, help='Image quality (1-100)')
    
    args = parser.parse_args()
    
    # Get absolute paths
    current_dir = os.path.dirname(os.path.abspath(__file__))
    pdf_path = args.pdf if os.path.isabs(args.pdf) else os.path.join(current_dir, args.pdf)
    output_dir = args.output if os.path.isabs(args.output) else os.path.join(current_dir, args.output)
    
    # Run the conversion
    success = convert_pdf_to_images(
        pdf_path=pdf_path,
        output_dir=output_dir,
        zoom=args.zoom,
        format=args.format,
        quality=args.quality
    )
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
