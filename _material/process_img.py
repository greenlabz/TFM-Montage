import cv2
import numpy as np

# Load image
img = cv2.imread('WhatsApp Image 2026-039.55.jpeg')
orig = img.copy()

# Resize for processing
ratio = img.shape[0] / 500.0
proc = cv2.resize(img, (int(img.shape[1] / ratio), 500))

# Convert to grayscale and blur
gray = cv2.cvtColor(proc, cv2.COLOR_BGR2GRAY)
gray = cv2.GaussianBlur(gray, (5, 5), 0)
edged = cv2.Canny(gray, 50, 150)

# Find contours
cnts, _ = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
cnts = sorted(cnts, key=cv2.contourArea, reverse=True)[:5]

screenCnt = None
for c in cnts:
    peri = cv2.arcLength(c, True)
    approx = cv2.approxPolyDP(c, 0.02 * peri, True)
    if len(approx) == 4:
        screenCnt = approx
        break

# If we found a contour, do a perspective transform
def order_points(pts):
    rect = np.zeros((4, 2), dtype="float32")
    s = pts.sum(axis=1)
    rect[0] = pts[np.argmin(s)]
    rect[2] = pts[np.argmax(s)]
    diff = np.diff(pts, axis=1)
    rect[1] = pts[np.argmin(diff)]
    rect[3] = pts[np.argmax(diff)]
    return rect

def four_point_transform(image, pts):
    rect = order_points(pts)
    (tl, tr, br, bl) = rect
    widthA = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
    widthB = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
    maxWidth = max(int(widthA), int(widthB))
    heightA = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
    heightB = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
    maxHeight = max(int(heightA), int(heightB))
    dst = np.array([
        [0, 0],
        [maxWidth - 1, 0],
        [maxWidth - 1, maxHeight - 1],
        [0, maxHeight - 1]], dtype="float32")
    M = cv2.getPerspectiveTransform(rect, dst)
    warped = cv2.warpPerspective(image, M, (maxWidth, maxHeight))
    return warped

if screenCnt is not None and cv2.contourArea(screenCnt) > 5000:
    warped = four_point_transform(orig, screenCnt.reshape(4, 2) * ratio)
    print("Used perspective transform crop")
else:
    # Fallback manual crop: The photo takes up the middle of the paper
    print("Used fallback crop")
    h, w = orig.shape[:2]
    # It's an a4 paper photo, the image is rotated.
    # roughly from h=0.1 to 0.9, w=0.1 to 0.9
    warped = orig[int(h*0.08):int(h*0.92), int(w*0.05):int(w*0.95)]

# Now we need to rotate it back to landscape if it was captured sideways
h_w, w_w = warped.shape[:2]
if h_w > w_w: # if portrait, the landscape photo inside was rotated
    warped = cv2.rotate(warped, cv2.ROTATE_90_COUNTERCLOCKWISE)

# Convert to grayscale
gray = cv2.cvtColor(warped, cv2.COLOR_BGR2GRAY)

# Enhance contrast using CLAHE (Contrast Limited Adaptive Histogram Equalization)
clahe = cv2.createCLAHE(clipLimit=2.5, tileGridSize=(8,8))
enhanced = clahe.apply(gray)

# Gentle Sharpen
kernel = np.array([[0,-1,0], [-1,5,-1], [0,-1,0]])
sharpened = cv2.filter2D(enhanced, -1, kernel)

# Upscale by 2x using Lanczos
upscaled = cv2.resize(sharpened, (0, 0), fx=2.0, fy=2.0, interpolation=cv2.INTER_LANCZOS4)

cv2.imwrite('web/public/hero-bg.jpg', upscaled)
print("Saved web/public/hero-bg.jpg")
