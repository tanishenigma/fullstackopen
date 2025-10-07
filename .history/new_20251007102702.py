from PIL import Image
import os

# Load the image
image = Image.open("sample.png")

# Define compression levels
qualities = [100, 80, 50, 20]

for q in qualities:
    # Convert to RGB (JPEG does not support RGBA)
    rgb_image = image.convert("RGB")

    # Save using the converted image
    filename = f"compressed_{q}.jpg"
    rgb_image.save(filename, "JPEG", quality=q)

    print(f"Saved {filename} - Size: {os.path.getsize(filename)/1024:.2f} KB")
