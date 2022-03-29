# Frontend

## How to run? (development version)

### 1. Install yarn
If you do not have yarn installed yet, run install command in cmd:
```
npm install -g yarn
```
Add yarn path to environmental variables, for example:
```
C:\Users\<username>\AppData\Roaming\npm\node_modules\yarn\bin
```

### 2. Install modules
Run in Frontend directory:
```
...\Frontend>yarn install
```
### 3. Run selected app
Run in app directory, for example:
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