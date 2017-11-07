# Gulp Webpack TypeScript React Sass Boilerplate

## Getting started
Clone or download this repository. Run `"npm install"` to install all dependencies

## Available scripts
`"npm run dev"` Runs the internal development server on port 3000 with browser-sync

`"npm run release"` Compiles all files and stores them in the "dist" directory (without sourcemaps)

## Technology stack
* [gulp](http://gulpjs.com/)
* [webpack](https://webpack.js.org/)
* [TypeScript (2.2.2)](http://www.typescriptlang.org/)
* [react.js](https://facebook.github.io/react/)
* [Sass](https://sass-lang.com/) + [autoprefixer](https://github.com/postcss/autoprefixer)
* [browser-sync](https://www.browsersync.io/)
* [redux](http://redux.js.org/) + [react.js bindings](https://github.com/reactjs/redux)
* [react router dom](https://www.npmjs.com/package/react-router-dom)

## Other useful informations
* Integrated TypeScript definition files for react.js + redux + react-redux + node
* Integrated sourcemaps (for a better development experience)
* Uglify CSS and JS when you want to release
* Automatic reload when you made changes to an existing or new file!
* Integration of redux-dev-tools [Firefox Plugin](https://addons.mozilla.org/en-US/firefox/addon/remotedev/) [Chrome Plugin](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

## Why should I use this boilerplate?
Most of the boilerplates are blown up. This one is slim and contains only **some** things you need. I don't want to prescribe which software you should use and which not. Amongst other things this boilerplate offers the whole strength of TypeScript. It was never better to develop a frontend application with a "typed" language. It's much more less error prone! Togeather with Sass and autoprefixer you have the ultimate tools to speed up the css development process.

## Where to start?
Your code and images lives in the "src" directory. From there everything gets compiled and copied to the "public" directory when you run `"npm run dev"`.

### Editing sass
Edit "src/sass/index.scss" (there is also some example code to show you how sass works).

### Creating a new reducer
Create a new interface in the "src/ts/StoreTypes.ts" file that matches your needs. That interface will be used in every component that depends on that piece of state.
Create a new file in the "src/ts/reducers/" directory. Take a look on the existing "appReducer" to see, how it should be done. In the switch block you define with every case a new action that the reducer can handle.

### Creating a new action
Create a new file in the "src/ts/actions" directory. The filename should start with the name of the reducer, to which the actions belong. You should consider to take a look on the existing "AppStoreActions.ts" to see, how you can get started.

### Creating a new component
Finally you want to create a react component. Fine! The boilerplate provides two examples
* Normal react component (src/ts/components/NotFound.tsx)
* redux connected component (src/ts/App.tsx)

### Creating a new route
Open the file "src/ts/index.tsx". There can you find two example routes.
`<Route exact path="/" component={App} />` this routes matches, when we are at the entry point of the application.
`<Route component={NotFound}/>` this routes matches, when no other match (in other words 404).
The switch helps us, that only one route matches.

### Working with parameters
Lets assume you have the following route `<Route path="/my/path/:parameter" component={App} />`, then you can get the parameter from your component with `this.props.match.params.parameter`.

## Post scriptum
Make TypeScript great (again) and happy hacking!
