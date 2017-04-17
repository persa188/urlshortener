# API Docs

## Quick Installation
- install Node.js on your system & cd to the app dir
- `npm install`
- `node app.js` or `nodemon app.js`
- go to localhost:7070

## Using a Custom Domain
- point a domain to this server and it should work as normal
	- e.x. nginx redirect from port 443 -> localhost:7070 (using proxy-pass to fwd all data)

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
