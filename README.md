# Backend Shop

## Built With
This project have been built using [Express](https://expressjs.com/es/) with the library [Inversify](https://github.com/inversify/inversify-express-utils)
to dependencies injection.

## 🚀 Getting started
The project has a `Makefile` to configure and execute it.

### 🗒️ Prerequisites
It is necessary to install the following versions to work it the project:   
- `node 14.16.1`
- `npm 6.14.12`

### 🔧 Installation
Run `make init` if you need to configure the project for the first time.

## 🏃‍♀️ Running
- To transpile the project: 
```shell
make build
```

- To execute the project:
```shell
make up
```

- To run the test:
```shell
make test
```

## 🧹 Cleaning

- If you need to remove the `package-lock`:
```shell
make clean
```

- If you need to remove the `package-lock`, `node_modules` and `dist` folder:
```shell
make clean_all
```
