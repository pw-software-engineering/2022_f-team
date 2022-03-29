# Frontend

## How to run? (development version)

Frontend projects require Node.js installed. Project is developed and tested on Windows 10/11 operating systems. It is highly suggested to use powershell to run and develop the project (VS Code integrated terminal is perfect for that purpose).

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
...\Frontend\client-catering-app>yarn install
```

## How to add new component to common-components?

### 1. Create component
Create your component in common-components\src and remember about adding
```
export default <component name>
```

### 2. Add component to src\index.tsx
You need to mark your component as an export, example:
```
export { default as FormInputComponent } from './FormInputComponents'
```

### 3. Run 'yarn start' in common components

### 4. Usage
``` 
import { FormInputComponent } from "common-components";
```
You can style it in your page's css file.
=======
...\Frontend>yarn all
```
