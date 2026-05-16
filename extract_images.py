import fitz  # PyMuPDF
import os

def extract_images(pdf_path, output_dir):
    doc = fitz.open(pdf_path)
    image_count = 0

    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        images = page.get_images(full=True)

        for img_index, img in enumerate(images):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]

            image_filename = f"image_{image_count}.{image_ext}"
            image_path = os.path.join(output_dir, image_filename)

            with open(image_path, "wb") as img_file:
                img_file.write(image_bytes)

            print(f"Extracted {image_filename}")
            image_count += 1

    doc.close()
    return image_count

if __name__ == "__main__":
    pdf_path = "only-for-ashu.pdf"
    output_dir = "images"
    os.makedirs(output_dir, exist_ok=True)
    num_images = extract_images(pdf_path, output_dir)
    print(f"Total images extracted: {num_images}")