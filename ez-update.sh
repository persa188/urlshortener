docker stop url-shortener
docker rm url-shortener
git pull
docker build -t url-shortener .
docker run -d -p 7070:7070 --name url-shortener url-shortener
