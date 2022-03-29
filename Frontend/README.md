# Frontend

## How to run? (development version)

### 1. Install yarn
If you do not have yarn installed yet, run install command in cmd:
```
npm install -g yarn
```
If yarn is not recognised in your terminal add yarn path to environmental variables manually, for example:
```
C:\Users\<username>\AppData\Roaming\npm\node_modules\yarn\bin
```

### 2. Install modules
Run in Frontend directory:
```
...\Frontend>yarn install
```
### 3. Run apps
There are several ways to run desired frontend apps. 

---

The easiest way is to execute corresponding `yarn` script inside of `./Frontend` directory:
```
yarn [client | deliverer | producer]
```
For example to run the client app you just have to execute:
```
...\Frontend>yarn client
```
---
Another way is to execute `yarn start` inside selected app directory. Here is an example of running the client app this away:
```
...\Frontend\apps\client-catering-app>yarn start
```
---
There is also an option to run all of three frontend apps parallelly. To do this you have to execute this command inside of `./Frontend` directory:
```
...\Frontend>yarn all
```