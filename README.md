# Image processing API (Udacity Nano Degree)

<img src="https://raw.githubusercontent.com/Eyongkevin/Udacity-Image-Processing-API/main/docs/images/resize_200_200.png" />

## 1- API Manual:

### a) You Access Manual By visiting the Following URL after you initiate the server

```http
 http://localhost:PORT/api/manual
```

##### You Can See Your Images in img folder there!

### b) Create thumb version of image by visitng the following URL and change the parameters and IMG name as you wants

```http
  http://localhost:3000/api/images/?filename="filename"&height="heigh"&width="width"
```

### c) Usage and Notes:

#### 1- choose the filename and desired width and height.

#### 2- Don't add extention .jpg in the filename.

## 2- API Functionality:

-   it resize images to new width and height.
-   if the image is already resized it will not resize it again and will fetch the existing thumbnail

## 3- How to run the project (npm Scripts):

Install dependencies

```bash
  npm install
```

For Running the Project with auto refresh

```bash
  npm dev
```

For building and Running Tests (don't forget to close running server)

```bash
  npm test
```

For Build the project only

```bash
  npm build
```

For Fixing problem with eslint

```bash
  npm lint:fix
```
