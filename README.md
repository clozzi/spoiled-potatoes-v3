# Spoiled Potatoes 
#### A completely, totally, definitely unique media review platform!

- Find out what people think of your favorite movies or series
- Users can add a movie or series to the potatobase
- Users can create customized reviews for all media on our platform

## Built With

- React/Javascript
- Flask/Python

## Installation

Start by cloning the repo.

To install the python dependencies and run the server, ensure you change into the server directory:

```bash
cd server
pipenv install
pipenv shell
python seed.py --optional reseed of database
python app.py
```

To install React dependencies and execute the frontend script, change into the client directory first:

```bash
cd client
npm install
npm start
```

## Usage

![GIF of usage starting with signup, and including creating a review and a media](client/src/SpoiledPotatoesGIF.gif)

## Acknowledgments

- [Flatiron!](https://flatironschool.com/courses/coding-bootcamp/)
- [mdn](https://developer.mozilla.org/en-US/)
- [w3](https://www.w3schools.com/)