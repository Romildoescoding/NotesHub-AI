import cv2
import numpy as np
import os

def detect_diagrams(image_path, output_folder):
    # Load the image
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError("Could not load image.")
    
    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Apply Gaussian Blur to reduce noise
    gray = cv2.GaussianBlur(gray, (5, 5), 0)
    
    # Apply edge detection
    edges = cv2.Canny(gray, 50, 150)
    
    # Dilate edges to connect fragmented parts
    edges = cv2.dilate(edges, None, iterations=1)
    
    # Find contours
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Sort contours by area (to focus on large diagrams)
    contours = sorted(contours, key=cv2.contourArea, reverse=True)

    # Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    cropped_images = []
    for i, contour in enumerate(contours):
        # Get the bounding rectangle of the contour
        x, y, w, h = cv2.boundingRect(contour)
        
        # Filter by size (width, height, and area)
        area = w * h
        aspect_ratio = w / h
        if  w < 100 or h < 100 or aspect_ratio < 0.5 or aspect_ratio > 2.0:
            continue  # Skip small or irrelevant objects
        
        # Crop and save the image
        cropped = image[y:y+h, x:x+w]
        cropped_images.append(cropped)
        
        output_path = os.path.join(output_folder, f"diagram_{i+1}.png")
        cv2.imwrite(output_path, cropped)
    
    return cropped_images

# Example Usage
if __name__ == "__main__":
    input_image = "uploads/file_3.jpg"
    output_dir = "cropped_diagrams"
    cropped_diagrams = detect_diagrams(input_image, output_dir)
    print(f"Saved {len(cropped_diagrams)} diagrams to {output_dir}.")
