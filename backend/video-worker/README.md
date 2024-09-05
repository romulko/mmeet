Cases:

- Connection failed to RabbitMQ
- Connection failed to Redis
- Exception in ffmpeg, bad video format

Success flow:
Connect to RabbitMQ and Redis, accept one 'start' message. Download videos, merge it, upload output.mp4, clean, ack message.

Cancel flow:
Connect to RabbitMQ and Redis, accept one 'start' message. Download videos, accept 'cancel' message', clean, ack message.

Failed flow:
- error from ffmpeg
- could not connect to RabbitMQ
- could not connect to Redis

Де від мене треба вмішательство?
FFmpeg failed flow. Якщо ffmpeg не справляється, мені треба про це знати і поправити щось.
