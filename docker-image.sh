wait
docker build --platform linux/amd64 -t glx-web:dev .
wait
docker tag glx-web:dev batzorig825/glx-web:dev
wait
docker push batzorig825/glx-web:dev