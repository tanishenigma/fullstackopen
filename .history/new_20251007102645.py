from PIL import Image
import os

# Load image
image = Image.open("sample.png")

# Compression qualities
qualities = [100, 80, 50, 20]

for q in qualities:
    # Convert to RGB every time before saving (this fixes the RGBA issue)
    rgb_image = image.convert("RGB")
    
    filename = f"compressed_{q}.jpg"
    rgb_image.save(filename, "JPEG", quality=q)
    
    print(f"Saved {filename} - Size: {os.path.getsize(filename)/1024:.2f} KB")
