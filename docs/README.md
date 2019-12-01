# Introduction

Musora.js is a collaborative initiative to create a cross-platform collection of javascript packages.
The purpose of this project is to encourage collaboration between different front-end departments within the development
team. Since both our Web applications and React Native Mobile applications are developed primarily from a javascript
layer, we can mutually benefit from an open and shared code-base.

Musora.js currently consists of two parts: a [complete client api](https://github.com/railroadmedia/js-services)
for all Musora-Back End services. And a [simple object-orientated approach](https://github.com/railroadmedia/js-models)
to handling the responses from our services API.

## How it works

By utilizing the [Node Package Manager](https://www.npmjs.com/) via [Yarn](https://yarnpkg.com/lang/en/) and a scoped
package pattern, in combination with the genius design of ES imports/exports, it's never been easier to share,
collaborate, and publish code than now.

## Using Musora.js Packages

`yarn add @musora/<package-name>`

It's worth noting that you don't always need to publish a package to utilize it while in development. 
There are a couple of basic patterns for usage of a package without publicly publishing it first.

### Sym-linking

NPM and Yarn make it painless to create symbolic links in your projects. First, navigate to the project directory
you wish to create a symbolic link for:

`cd /<package-name>/`

`yarn link`

Now you want to navigate to the directory of whatever project you are currently working on:

`cd /<app-project>/`

`yarn link @musora/<package-name>`

### Using a Github Branch

If sym-linking doesn't work for your current project structure, you can always create a branch for your package, and
reference that branch name in your `package.json`, swapping out the `<package-name>` and `<branch-name>` values
respectively.

```json
{
   "dependencies": {
      "@musora/<package-name>": "github:railroadmedia/<package-name>#<branch-name>"
    }
}
```

## Creating and Publishing a Package

All Musora.js packages are to be created as a scoped package under the `@musora/` scope. In order to accomplish this,
all you need to do is edit the title in your `package.json` file to look like this:
```json
{
  "name": "@musora/<package-name>"
}
```

Aslong as you are part of the Musora Organization on NPM. You will be able to publish a package.
By default npm and yarn will want to publish scoped packages as private packages. To avoid paying fees for private
packages we just publish them publicly. You can accomplish that with the following commands:

`yarn publish --access public`

