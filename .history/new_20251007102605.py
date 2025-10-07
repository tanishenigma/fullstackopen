from PIL import Image
import os

# Load image
image = Image.open("sample.png")

# Convert RGBA → RGB (to remove transparency)
if image.mode == "RGBA":
    image = image.convert("RGB")

# Compression qualities
qualities = [100, 80, 50, 20]

for q in qualities:
    filename = f"compressed_{q}.jpg"
    image.save(filename, "JPEG", quality=q)
    print(f"Saved {filename} - Size: {os.path.getsize(filename)/1024:.2f} KB")
