@echo off
echo ========================================
echo   Suraksha - Video Compression Guide
echo ========================================
echo.
echo Your video file is 30MB (too large!)
echo Target size: 3-5MB
echo.
echo OPTION 1: Using HandBrake (Recommended)
echo -----------------------------------------
echo 1. Download HandBrake: https://handbrake.fr/
echo 2. Open HandBrake
echo 3. Drag 'public\demo.mp4' into HandBrake
echo 4. Use these settings:
echo    - Format: MP4
echo    - Video Codec: H.264
echo    - Quality: RF 25
echo    - Resolution: 1280x720
echo    - Audio: AAC 128kbps
echo 5. Click "Start Encode"
echo 6. Replace original file with compressed version
echo.
echo OPTION 2: Online Compressor (Easy)
echo -----------------------------------
echo 1. Go to: https://www.freeconvert.com/video-compressor
echo 2. Upload 'public\demo.mp4'
echo 3. Set target size: 5MB
echo 4. Download and replace original file
echo.
echo OPTION 3: Using FFmpeg (Advanced)
echo ----------------------------------
echo If you have FFmpeg installed, run:
echo.
echo ffmpeg -i public\demo.mp4 -vcodec libx264 -crf 28 -preset medium -acodec aac -b:a 128k -vf scale=1280:720 public\demo-optimized.mp4
echo.
echo ========================================
echo After compression, rebuild the project:
echo   npm run build
echo ========================================
echo.
pause
