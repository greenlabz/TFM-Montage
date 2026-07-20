from PIL import Image, ImageEnhance
import os

path = r"C:\Users\James\Desktop\Tom Website stuff\web\public\hero-bg-2.jpg"
if not os.path.exists(path):
    print("not found")
    exit()

img = Image.open(path).convert("RGB")
enhancer = ImageEnhance.Brightness(img)
img = enhancer.enhance(1.8)
contrast = ImageEnhance.Contrast(img)
img = contrast.enhance(0.75)
img.save(path, quality=90)
print("saved")
