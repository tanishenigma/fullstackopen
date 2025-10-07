from PIL import Image
import os

# Load image
image = Image.open("sample.png")

# Always convert to RGB (JPEG does not support RGBA or P mode)
image = image.convert("RGB")

# Compression qualities
qualities = [100, 80, 50, 20]

for q in qualities:
    filename = f"compressed_{q}.jpg"
    image.convert("RGB").save(filename, "JPEG", quality=q)
    print(f"Saved {filename} - Size: {os.path.getsize(filename)/1024:.2f} KB")
