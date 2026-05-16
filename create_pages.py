import os

qualities = [
    "Your radiant smile",
    "The warmth of your embrace",
    "Your unshakeable kindness",
    "The grace in your presence",
    "Your infectious laughter",
    "The depth of your compassion",
    "Your brilliant mind",
    "The gentleness of your touch",
    "Your fierce loyalty",
    "The light in your eyes",
    "Your creative spirit",
    "The honesty in your words",
    "Your quiet strength",
    "The beauty of your soul",
    "Your boundless hope",
    "The music in your voice",
    "Your steadfast courage",
    "The warmth of your heart",
    "Your thoughtful nature",
    "The elegance you carry",
    "Your unwavering faith",
    "The joy you bring",
    "Your generous spirit",
    "The wisdom you share",
    "Your resilient heart",
    "The authenticity you radiate",
    "Your brilliant intuition",
    "The peace you inspire",
    "Your loving patience",
    "The sparkle in your laughter",
    "Your vibrant energy",
    "The strength of your convictions",
    "Your tender understanding",
    "The grace of your movements",
    "Your genuine interest in others",
    "The light you bring to darkness",
    "Your remarkable talent",
    "The sweetness of your spirit",
    "Your unwavering honesty",
    "The magic in your presence",
    "Your infectious enthusiasm",
    "The depth of your care",
    "Your beautiful vulnerability",
    "The courage in your heart",
    "Your inspiring determination",
    "The softness of your nature",
    "Your stellar character",
    "The brilliance of your mind",
    "Your genuine sincerity",
    "The warmth in your gaze",
    "Your remarkable sensitivity",
    "The strength of your love",
    "Your poetic soul",
    "The brightness you bring",
    "Your unwavering commitment",
    "The nobility of your spirit",
    "Your radiant presence",
    "The depth of your feelings",
    "Your inspiring resilience",
    "The gentleness in your heart",
    "Your brilliant compassion",
    "The authenticity you live",
    "Your generous heart",
    "The grace you embody",
    "Your thoughtful wisdom",
    "The warmth of your support",
    "Your remarkable strength",
    "The beauty in your kindness",
    "Your inspiring courage",
    "The light of your love",
    "Your genuine care",
    "The sweetness of your soul",
    "Your remarkable depth",
    "The strength in your vulnerability",
    "Your radiant kindness",
    "The magic you create",
    "Your inspiring presence",
    "The warmth of your friendship",
    "Your genuine brilliance",
    "The grace of your heart",
    "Your authentic beauty",
    "The depth of your understanding",
    "Your inspiring loyalty",
    "The light in your actions",
    "Your remarkable generosity",
    "The warmth of your concern",
    "Your beautiful spirit",
    "The strength of your values",
    "Your inspiring hope",
    "The gentleness you offer",
    "Your remarkable heart",
    "The authenticity of your love",
    "Your inspiring kindness",
    "The grace in your words",
    "Your radiant compassion",
    "The depth of your devotion",
    "Your inspiring faith",
    "The beauty of your being",
    "The eternal light you are"
]

def create_page(image_num, total_images, image_ext, quality):
    prev_page = "gallery.html" if image_num == 1 else f"page{image_num - 1}.html"
    next_page = f"page{image_num + 1}.html" if image_num < total_images else "request.html"

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Apology {image_num}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="particle-container"></div>
    <div class="scroller">
        <section class="section image-view fade-in">
            <div class="glass-container">
                <h2 style="text-align: center; margin-bottom: 1rem; font-family: 'Playfair Display', serif;">{quality}</h2>
                <p style="text-align: center; margin-bottom: 2rem; font-style: italic;">I'm so sorry for not cherishing this part of you every single day.</p>
                <img src="images/image_{image_num - 1}.{image_ext}" alt="Image {image_num}" style="max-width: 100%; height: auto; border-radius: 10px; margin-bottom: 2rem;">
                <div class="navigation" style="display: flex; justify-content: space-between; width: 100%;">
                    <a href='{prev_page}' class='nav-btn interactive-btn'>Previous</a>
                    <a href='{next_page}' class='nav-btn interactive-btn'>Next</a>
                </div>
            </div>
        </section>
    </div>
    <script src="script.js"></script>
</body>
</html>"""
    return html_content

if __name__ == "__main__":
    images_dir = "images"
    image_files = sorted([f for f in os.listdir(images_dir) if f.startswith("image_") and f.endswith((".jpeg", ".jpg", ".png"))])
    total_images = min(99, len(image_files))  # Limit to 99 as per user
    if total_images > 0:
        image_ext = image_files[0].split('.')[-1]
        for i in range(1, total_images + 1):
            quality = qualities[i - 1] if i - 1 < len(qualities) else f"Quality {i}"
            page_content = create_page(i, total_images, image_ext, quality)
            with open(f"page{i}.html", "w") as f:
                f.write(page_content)
        print(f"Created {total_images} web pages.")
    else:
        print("No images found.")