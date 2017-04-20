# API Docs

## Pre-Install (databse setup)
- fill out [conf.js](/conf.js) with your mongo credentials and URI, we recommend [mlab](https://mlab.com) if you don't have your own mongodb instance, since its quick & easy & they offer 500mb free storage. (just register and setup an aws instance).
	- we use environment variables so things dont get overwritten on pulls & pushes but aslong as the monguri is a valid mongo uri you should be OK.

## Installation
- install Node.js on your system & cd to the app dir
- `npm install`
- `node app.js` or `nodemon app.js`
- go to localhost:7070

## Quick Installation (Docker)
if you want to install in a docker container just do: (assuming you have docker setup on your system)
- `chmod +x bootstrap.sh`
- `./boostrap.sh`
- go to localhost:7070

## Manual Installation (Docker)
assuming docker is installed correctly on your system do:
- `cd path_to_app_dir`
- `docker build -t url-shortener .`
- `docker run -d -p <external_port>:7070 --name <your_container_name> url-shortener`
	- where `<external port>` is the port on your machine you want to access the app at
	- the `--name <your_container_name>` part is optional, if you exclude this docker will randomly name your container
If you would like a sample script just look at [bootstrap.js](/bootstrap.js)

## Using a Custom Domain
- point a domain to this server and it should work as normal (depends on your setup - create and issue if you're unsure)
	- e.x. nginx redirect from port 443 -> localhost:7070 (using proxy-pass to fwd all data)

## Hosting the Front-End on a Seperate Server
- this should work normally as long as the server variable in front-end is set to the location of your server.

## CORS Requests
- by default CORs are allowed by the node server (for dev. reasons) , we suggest you disable it for production and allow only domains you trust.
	- (i.e. edit the 'Access-Control-Allow-Origin' line [here](/app.js#L40-L57)).

## URL API
### Shorten A URL
- description: shortens a url
- request: `POST /api/shorten/`
  - content-type: `application/json`
  - body: object
    - url: (string) the url to shorten (must be a valid url of form http(s)://\*.\*)
- response: 2xx | 5xx if server error | 4xx if bad request
  - content-type: `application/json`
  - body: object
    - short_url: the shortened url suffix, the prefix is domain + path (e.x. url.sanic.ca/u/ + suffix || localhost:7070/u/ + suffix)

```
$ curl -X POST \
  https://api2.sanic.ca/api/shorten \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"url": "tinyurl.com"
}'

>> {"short_url":"\"rybCk2xAl\""}
```

### Getting A Short URL Redirect
- description: redirects from short url to long url
- request `GET /u/:id/`
  - id: the suffix as generated in the POST request above
- response: 302 | 5xx if server error | 4xx if bad request
  - redirects to shortened page

```
curl -X GET \
  https://api2.sanic.ca/u/SJxlM2g0g \
  -H 'cache-control: no-cache'
```
