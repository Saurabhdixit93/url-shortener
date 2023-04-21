## Prerequisites:

Node.js installed on your machine
MongoDB Atlas account or a locally running MongoDB server

1. Clone the project from the GitHub repository

git clone https://github.com/saurabhdixit93/url-shortener

2. Navigate to the project directory

`cd url-shortener`

3. Install dependencies using npm

`npm install`

4. Create a .env file in the root directory of the project and add the following variables:

`MONGO_URL=<your-mongo-db-url>`
`PORT=<your-preferred-port>`

5. Start the server using npm

`npm start`

6. The server will start running on the specified port. You can now use the API endpoints by sending requests using tools like Postman.

# API ENDPOINT DOCUMENTATION 

# Introduction:
<br>
This is a RESTful API developed using Node.js, Express.js and MongoDB. It helps to shorten a long URL and generate a short URL for easy sharing.

> Base URL:
The base URL for all API endpoints is `http://localhost:5000/`

# Endpoints:


1. Shorten URL
<br>

URL: `Url Should Be ${http://localhost:5000/api/shorten}`
Method: POST
Headers:
Content-Type: application/json
Request Body:
<br> 


`{
  "longUrl": "URL to be shortened"
}`

<br>

> Response:

* Status: 200 OK if successful 
Body:

`{
  "message": "Here is Your Generated Short Url:",
  "url": {
    "_id": "shortened URL ID",
    "longUrl": "original URL",
    "shortUrl": "shortened URL",
    "clicks": number of times shortened URL was clicked,
    "createdAt": date and time when shortened URL was created
  }
}`


<br>

> Errors:
* Status: 400 Bad Request if URL is invalid or not starting with https
Body:

`{
  "message": "Invalid URL, Please Enter Valid URL",
  "longUrl": "original URL"
}`

> Status: 201 Created if URL already exists in the database
Body:

`{
  "message": "URL Already exists",
  "url": {
    "_id": "shortened URL ID",
    "longUrl": "original URL",
    "shortUrl": "shortened URL",
    "clicks": number of times shortened URL was clicked,
    "createdAt": date and time when shortened URL was created
  }
}
`
<br>

* Status: 500 Internal Server Error if an error occurred while processing the request
Body:

`{
  "message": "INTERNAL SERVER ERROR: error message"
}`

<br>

2.  Retrieve long URL from short URL

URL: `Url Should Be ${http://localhost:5000/api/:shortUrl}`
Method: GET
Response:
Status: 200 OK if successful
* Redirects to the original URL

<br>


> Errors:
Status: 404 Not Found if short URL is not found in the database
Body:

`{
  "message": "URL Not Found"
}`


* Status: 500 Internal Server Error if an error occurred while processing the request
Body:

`{
  "message": "INTERNAL SERVER ERROR: error message"
}`


# Using Postman:

1. Shorten URL:
Open Postman and select POST method.
Enter the URL `http://localhost:5000/api/shorten.`
In the Headers tab, add a new header with Content-Type as key and application/json as value.
In the Body tab, select raw and enter the request body as JSON:



 `{ "longUrl": "URL to be shortened" }`
<br>
* Click on the Send button to send the request and get the response.

2. Retrieve long URL:
Open Postman and select GET method.
Enter the URL `http://localhost:5000/api/:shortUrl`, replace :shortUrl with the actual short URL generated in the first step.

* Click on the Send button to send the request and get the response.
