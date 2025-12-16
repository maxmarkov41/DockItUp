## **Assignment 1 — Build & Run a Personalized Web Server Container**

**Goal:** Create your own Dockerized static website and run it using custom ports.
```
assignment1
├── cmds.txt
├── Dockerfile
├── images
│   ├── created.png
│   ├── curl.png
│   └── web.png
├── index.html
└── README.md
```
Approach: We are asked to use Apache or Nginx, this is a step up from using python's http.server, so I had to refer to documentation / tutorial on using Nginx with Docker. This is the [article](https://dev.to/arif_hossain/running-an-nginx-web-server-in-a-docker-container-4cie) I used to learn about using nginx with docker.

### 1.Pull the lastest nginx image from DockerHub
```
docker pull nginx
```

### 2 .Write a Dockerfile and build the Image
Copy your static html page from the current working directory to `/usr/share/nginx/html`
,the docker file should look like this
```
FROM nginx
COPY index.html /usr/share/nginx/html
EXPOSE 80
```
port 80 has been exposed since it is the default port that nginx uses for http connections, a different port number could be used, however nginx conf that is located at `/etc/nginx/conf.d/default.conf` must be edited.

```
docker build -t yourname-site .
```

### 3. Running an instance of the image

since port `7070` has to be exposed on the host, we have to use the -p flag in the docker run command
```
docker run -d --name site1 -p 7070:80 yourname-site
```
![Running - yourname-site](https://github.com/maxmarkov41/DockItUp/blob/main/iAssgn1/assignment1/images/created.png)

### 4. Test if the website is online using curl

```
curl http://localhost:7070
```
![Curl Output](https://github.com/maxmarkov41/DockItUp/blob/main/iAssgn1/assignment1/images/curl.png)

### 5. Test if the website is online using browser

![Browser Output](https://github.com/maxmarkov41/DockItUp/blob/main/iAssgn1/assignment1/images/web.png)

### 6. Stop and Remove the container, and delete the image

```
docker stop site1
docker rm site1
docker rmi yourname-site
```


