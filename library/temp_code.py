from picamera2 import Picamera2
import cv2

picam2 = Picamera2()
picam2.configure(picam2.create_preview_configuration())

picam2.start()

while True:
    frame = picam2.capture_array()
    cv2.imshow("Camera", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):  # Nhấn 'q' để thoát
        break

cv2.destroyAllWindows()
picam2.stop()
