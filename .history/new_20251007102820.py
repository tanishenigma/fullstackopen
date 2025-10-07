from PIL import Image
import os

try:
    # Load the source image (must be in the same folder as the script)
    # The image can be any format, including PNGs with transparency.
    image = Image.open("sample.png")

    # Define the desired JPEG quality levels for compression
    qualities = [100, 80, 50, 20]

    print("Starting compression...")

    # Loop through each quality level
    for q in qualities:
        # --- This is the crucial fix ---
        # Convert the image to RGB mode because JPEG doesn't support transparency (RGBA)
        rgb_image = image.convert("RGB")

        # Define the output filename
        filename = f"compressed_quality_{q}.jpg"

        # Save the CONVERTED image as a JPEG with the specified quality
        rgb_image.save(filename, "JPEG", quality=q)

        # Get the file size and print a confirmation message
        file_size_kb = os.path.getsize(filename) / 1024
        print(f"✅ Saved {filename} - Size: {file_size_kb:.2f} KB")

    print("\nCompression complete!")

except FileNotFoundError:
    print("Error: 'sample.png' not found. Please make sure the image file is in the same directory as the script.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")