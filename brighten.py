from PIL import Image, ImageEnhance
import sys

def brighten_image(input_path, output_path, factor):
    try:
        img = Image.open(input_path)
        enhancer = ImageEnhance.Brightness(img)
        # Factor 1.0 always returns a copy of the original image
        # Factor < 1.0 darkens the image, factor > 1.0 brightens it
        brightened_img = enhancer.enhance(factor)
        brightened_img.save(output_path)
        print(f"Successfully brightened image by factor {factor} and saved to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python brighten.py <input> <output> <factor>")
        sys.exit(1)
    brighten_image(sys.argv[1], sys.argv[2], float(sys.argv[3]))
