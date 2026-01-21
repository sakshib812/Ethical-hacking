from PIL import Image, ImageDraw, ImageFont
import os

def create_image(filename, size, color, text):
    img = Image.new('RGB', size, color=color)
    d = ImageDraw.Draw(img)
    try:
        # Use default font
        # d.text((10,10), text, fill=(255,255,255))
        pass
    except:
        pass
    img.save(filename)
    print(f"Created {filename}")

def main():
    if not os.path.exists('assets'):
        os.makedirs('assets')
    
    # Standard Expo Assets
    create_image('assets/icon.png', (1024, 1024), '#2196f3', 'ICON')
    create_image('assets/splash.png', (1242, 2436), '#ffffff', 'SPLASH')
    create_image('assets/adaptive-icon.png', (1024, 1024), '#2196f3', 'ADAPTIVE')
    create_image('assets/favicon.png', (48, 48), '#2196f3', 'FAVICON')

if __name__ == "__main__":
    main()
