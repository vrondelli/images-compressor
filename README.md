## Description

An API that download and compress images.

## Endpoint

| Method | Endpoint  | Usage                        | Returns | Body                 |
| ------ | --------- | ---------------------------- | ------- | -------------------- |
| Post   | /download | get all images in zip format | zip     | `{images: string[]}` |

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
