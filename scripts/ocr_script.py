import sys
import cv2
import easyocr
import json
import numpy as np
from transformers import pipeline
from spellchecker import SpellChecker


def preprocess_image(image_path):
    """
    Preprocess the image by converting it to grayscale and applying thresholding.
    """
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError("Image not found or unable to open.")

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
    return thresh


def extract_text(image_path):
    """
    Extract text from the image using EasyOCR.
    """
    processed_image = preprocess_image(image_path)
    reader = easyocr.Reader(['en'], gpu=False, verbose=False)
    result = reader.readtext(processed_image)

    extracted_text = []
    for bbox, text, _ in result:
        if text:  # Ensure that text is not empty or None
            converted_bbox = [[float(coord) for coord in point] for point in bbox]
            extracted_text.append({"text": text, "bbox": converted_bbox})

    return extracted_text


def clean_text(extracted_text):
    """
    Clean the extracted text by correcting spelling errors.
    """
    spell = SpellChecker()
    cleaned_data = []
    for item in extracted_text:
        if item["text"]:  # Check if the text is not empty
            print(f"Original Text: {item['text']}")
            corrected_text = " ".join(
                word if spell.correction(word) is None else spell.correction(word)
                for word in item["text"].split()
                if isinstance(word, str)
            )
            print(f"Corrected Text: {corrected_text}")
            item["text"] = corrected_text
            cleaned_data.append(item)

    return cleaned_data


def avg_y(bbox):
    """
    Calculate the average y-coordinate for a bounding box to help in sorting text.
    """
    return sum(point[1] for point in bbox) / len(bbox)


def post_process_to_string(ocr_output):
    """
    Process OCR output to create a human-readable string.
    """
    if isinstance(ocr_output, str):
        ocr_output = json.loads(ocr_output)

    sorted_ocr = sorted(ocr_output, key=lambda item: avg_y(item['bbox']))

    lines = []
    line_threshold = 50  # Proximity threshold for grouping lines
    current_line = []

    for item in sorted_ocr:
        if not current_line:
            current_line.append(item)
        else:
            if abs(avg_y(item['bbox']) - avg_y(current_line[-1]['bbox'])) < line_threshold:
                current_line.append(item)
            else:
                lines.append(current_line)
                current_line = [item]

    if current_line:
        lines.append(current_line)

    multiline_string = ""
    for line in lines:
        sorted_line = sorted(line, key=lambda item: item['bbox'][0][0])
        line_text = " ".join(
            item['text'] for item in sorted_line if isinstance(item['text'], str) and item['text']
        )
        multiline_string += line_text + "\n"

    return multiline_string.strip()

def generate_title(text):
    """Generate a concise title for the note using text summarization."""
    summarizer = pipeline("summarization", model="t5-small", tokenizer="t5-small")
    summary = summarizer(text, max_length=10, min_length=5, do_sample=False)
    return summary


if __name__ == "__main__":
    try:
        image_path = sys.argv[1]
        text_data = extract_text(image_path)
        text_data = [item for item in text_data if isinstance(item['text'], str) and item['text']]
        
        print("\n\nExtracted Text Data:\n\n")
        print(text_data)

        cleaned_data = clean_text(text_data)
        ocr_output = json.dumps(cleaned_data, ensure_ascii=False)
        
        print("\n\nCleaned OCR Output:\n\n")
        print(ocr_output)

        processed_text = post_process_to_string(ocr_output)
        
        print("\n\nProcessed OCR Output:\n\n")
        print(processed_text)

        print(generate_title(processed_text))
    except Exception as e:
        print(f"Error occurred: {str(e)}")
