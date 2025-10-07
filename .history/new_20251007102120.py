from PIL import Image
import os

image = Image.open("sample.png")

# Compression qualities
qualities = [100, 80, 50, 20]

for q in qualities:
    filename = f"compressed_{q}.jpg"
    image.save(filename, "JPEG", quality=q)
    print(f"Saved {filename} - Size: {os.path.getsize(filename)/1024:.2f} KB")
