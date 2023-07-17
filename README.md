# FlyBase Reports Component Library

Welcome to the FlyBase Reports Component Library! This repo was started to consolidate react code for FB reports.
It was started in 2023 by Seth Campbell, and utilizes modern react code and principles. 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app),
but was ejected to support multiple entry points, so that build files can be split into page-specific chunks.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.
We do not currently have any tests, but jest is installed if we decide to create some tests in the future. 

### `yarn build`

Creates multiple builds for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes. 
In the `build` folder, you will find a main build, and several named builds.
The main build is a built version of the local development version, and is not used directly in production.
The local version, created from `App.tsx`, is intended for local development only.
Production code should be built separately (see below for more info).

## Directory Structure

**reports-component-library**\
|-- .storybook `storybook allows for testing of components with many different options/props`\
|-- build `all build files end up here`\
|-- config `webpack config files`\
|-- node_modules `libraries imported with yarn`\
|-- public `files accessible directly from react when running a local version`\
|-- scripts `yarn script files`\
|\
|-- src `all the code stuff`\
|&emsp;&emsp;&emsp;&emsp; |-- api `code for connecting to API's`\
|&emsp;&emsp;&emsp;&emsp; |-- components `individual components that aren't whole sections, or pages`\
|&emsp;&emsp;&emsp;&emsp; |-- helpers `helper functions`\
|&emsp;&emsp;&emsp;&emsp; |-- hooks `custom hooks`\
|&emsp;&emsp;&emsp;&emsp; |-- injectors `code that auto dumps react code into a conatianer on the page, used to inject react into a FlyBase page`\
|&emsp;&emsp;&emsp;&emsp; |-- libs `manually imported library files`\
|&emsp;&emsp;&emsp;&emsp; |-- sections `components that make up a unique section of a report`\
|&emsp;&emsp;&emsp;&emsp; |-- stories `files used to creat storybook stories`\
|&emsp;&emsp;&emsp;&emsp; |-- styles `scss files`\
|&emsp;&emsp;&emsp;&emsp; |-- App.tsx `top-level component for local development`\
|&emsp;&emsp;&emsp;&emsp; |-- decs.d.ts `type definitions for libraries without types`\
|&emsp;&emsp;&emsp;&emsp; |-- index.tsx `top-level file for local development`\
|&emsp;&emsp;&emsp;&emsp; |-- react-app-env.d.ts `auto-generated types used by react/libraries`\
|&emsp;&emsp;&emsp;&emsp; |-- setupTests.ts `sets up jest`\
|\
|-- .env.development `ENV variables for use localy`\
|-- .env.production `ENV variable for use on a server`\
|-- .gitignore `a list of files/directories for git to exclude`\
|-- package.json `yarn configuration`\
|-- README.md `<== YOU ARE HERE`\
|-- tsconfig.json `TypeScript config`\
|-- yarn.lock `auto-generated file used by yarn to know exactly what versions of your libraries are installed`

## Installation
- You will need `git`, `node` and `yarn` installed before setting up the project.
  - I recommend using `nvm` to update your node version(s). currently version 16 works well (as of 07/17/23)
- `git clone username@https://github.com/FlyBase/reports-component-library.git`
  - If you don't have one already, create a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) 
    for GitHub. When prompted for a password, use the token instead of your GitHub password.
- `cd reports-component-library`
- `yarn install`
- Change variables in `env.development`
- `yarn start` to run local development version

## Local Development
For local development, there are a couple of things to keep in mind:

- Many of FlyBase's features rely on embedding content/scripts onto the page. Since this library is self-contained,
you may need to add scripts for local development to work properly. You can add scripts with a URL
to the `public/index.html` file, which is preferable when you don't want the scripts to be loaded by the reports library
in production, but rather you want the reports library to use something that already exists on a FlyBase page the
react code will live on.
- FlyBase reports use globals for a few items. You can add values for these in `index.html`.
- Many of FlyBase's dependencies do not use TypeScript. You can add type definitions for these dependencies in `decs.d.ts`.
- Make sure to set the ENV variables in `.evn.development` to successfully connect to your dev server.

## Building
Running `yarn build` will create a production build of the local development version, as well as any other builds
we set up. Typically, there will be a build for the main version, and any injector scripts.

To get the build files to their final destination, you have a few options:
1) Clone the repo into your dev server, build, and move the files directly to their location. Rename the files if necessary.
2) Use `scp` to upload the build files onto your dev server
3) (WIP, will be added eventually) use a yarn script

## Creating and Using New Injectors
FlyBase is unique in that it has a variety of technologies combining to build out the site. As of 07/17/23, we are using
a relatively old version of linux for out servers (RHEL 6). Injectors provide a good way to use new technologies without
worrying about version problems with the server.

When you run `yarn build`, the files generated use vanilla javascript in the end (stripping out all of that fancy new
react code and typescript). This means out servers have no problem running the build versions since they only use plain
old JS.

To make things even easier, we can make a build for a specific script, named here as "injectors". These scripts will 
load custom components into a page based on a container's id. For example, the `geneInjector.tsx` file loops through
all react code used on the gene reports page (or at least all the react code that is in this library), and renders it
to the appropriate container. In production, the build file will run the script automattically, so as long as the build
file is included in the page (and after the containers being loaded into), everything react will be handled automatically.

### To make a new injector:
- Create a script in the `injectors` directory.
  - **Make sure the script only runs in production! (if(process.env.NODE_ENV === "production")). (See `geneInjector.tsx` for example)**
- Under `config/paths.js`, add a new line to `module.exports = {`. It should look like this: `injectorGenePage: resolveModule(resolveApp, 'src/injectors/injectGeneReport'),`
- In `config/webpack.config.js`, near line ~200, add a new line to `entry: {`. It should look like this: `geneReportInjector: paths.injectorGenePage`
- If `yarn start` is running, restart it with ^C
- Now running `yarn build` should produce the new injector build and place it in the `build` directory

### Specific Injector Info

- Gene Report:
  - build file name: `geneReportInjector.[hash-here].js` and `geneReportInjector.[hash-here].css`
  - location on server: `~/flybase-server/htdocs/reactbundles/geneReportInjector.js` and `~/flybase-server/htdocs/reactbundles/geneReportInjector.css`
  - creates:
    - All ribbon sections
