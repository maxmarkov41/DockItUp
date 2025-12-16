## **Assignment 2 — Create & Run Two Containers That Communicate**

**Goal:** Deploy two containers — one static web server and one simple API — and connect them using Docker networking.
```
assignment2
├── cmds.txt
├── custom-nginx.conf
├── Dockerfile
├── images
│   ├── api.png
│   ├── build.png
│   ├── curl.png
│   ├── network.png
│   ├── ps.png
│   ├── website.png
│   └── website2.png
├── index.html
├── main.js
└── README.md
```

### 1. Creating a custom Docker network
```
docker network create webnet
```
![Network](https://github.com/maxmarkov41/DockItUp/blob/main/iAssgn1/assignment2/images/network.png)
### 2. Creating a Simple API container
```
docker pull hashicorp/http-echo
docker run -d --name api --network webnet hashicorp/http-echo -text="Hello from API"
```
![api](https://github.com/maxmarkov41/DockItUp/blob/main/iAssgn1/assignment2/images/api.png)


### 3. Building a Custom Nginx Image using Dockerfile
This is done because we will need to implement a reverse proxy to be able to use the api in the website, for which we will need to edit nginx config files located at `/etc/nginx/conf.d/default.conf`.
Learnt this from prompting AI and from [here](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Docker-Nginx-reverse-proxy-setup-example)
The docker file is as follows
```
FROM nginx

COPY index.html /usr/share/nginx/html
COPY main.js /usr/share/nginx/html/main.js
COPY custom-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
```
To build the image, we use the following command
```
docker build -t custom-nginx .
```
![Build](https://github.com/maxmarkov41/DockItUp/blob/main/iAssgn1/assignment2/images/build.png)
### 4. Running the nginx instance with a port exposed to the host
```
docker run -d --name web --network webnet -p 7070:80 custom-nginx 
```
![ps](https://github.com/maxmarkov41/DockItUp/blob/main/iAssgn1/assignment2/images/ps.png)

###5. Testing their interconnectivity using curl
```
docker exec -it web curl http://api:5678
```
![Curl](https://github.com/maxmarkov41/DockItUp/blob/main/iAssgn1/assignment2/images/curl.png)

###6. Testing Api calls from the browser
![web1](https://github.com/maxmarkov41/DockItUp/blob/main/iAssgn1/assignment2/images/website.png)
After the button is pressed, a text node is created and added to the span.
![web2](https://github.com/maxmarkov41/DockItUp/blob/main/iAssgn1/assignment2/images/website2.png)

###7. Stopping and removing the web container and other objects
```
docker stop web
docker rm web
docker stop api
docker rm api
docker network rm webnet
docker rmi custom-nginx
```
### Note
Running the web container before api container does not work, the web container simply exits immediately, because the api container is not setup, this is because of the way we've written the nginx configuration.
![Note](https://github.com/maxmarkov41/DockItUp/blob/main/iAssgn1/assignment2/images/note.png)
