title: Yo Assemble These
date: Jul 29 2013
---

Example Assemble integration to your existing Yeoman project.

## Installation and Basic configuration

If you are haven't generated a yeoman app yet, go ahead, use any generator you want (preferably the Webapp generator)

```
    $ mkdir bob-app
    $ cd bob-app
    $ yo webapp
```
Install Assemble, make sure you update your package.json DevDependencies for future installations

```
    $ npm install assemble
```

Open up Gruntfile with your code editor, and add this line just before ***Grunt.registerTask are stated***.

```js
    grunt.loadNPMTasks('assemble');
```

Now we have to specify Assemble configuration, find ***grunt.initConfig*** and add belows configuration:

```js
    assemble: {
        layout: 'default.hbs',
        layoutDir: 'templates/layouts/',
        partials: '/templates/partials/',
        data: '/templates/data/',
        server: {
            files: [{
                expand: true,
                cwd: 'templates/site',
                src: [{,*/}*.hbs]   ,
                dest: '.tmp/'}]
        },
        dist: {
            files: [{
                expand: true,
                cwd: 'templates/site',
                src: [{,*/}*.hbs]   ,
                dest: 'dist/'}]
        },
    },
```

## Concurrent Assembling
For best performance of developing with Yeoman and Assemble I'd recommend using grunt-concurrent. If you look closely at the webapp generator, it lets grunt-concurrent compile coffee and sass files in the background. To add assemble to that, find configuration in Gruntfile and specify which task should use assemble's configuration.

```js
    concurrent: {
        server: {
            'compass',
            'coffee:dist',
            'assemble:server'
        },
        'dist':{
            'coffee',
            'compass',
            'assemble:dist'
        }
    }
```

## Grunt Watch
We can assemble pages anytime we make a change to the templates/layouts/partials, simply add your templates directory to trigger the assemble:server task.

```js
    watch: {
        coffee: { … },
        compass: { … },
        assemble: {
            files: ['templates/{,*/}*.hbs']
            tasks: ['assemble:server']
        }
    }
```

## Grunt Build
For the build command you have to add a new assemble task, let's call it ***dist*** and point the output to the dist directory. That way, when Yeoman builds SASS, Coffee it will also assemble the pages. Using Concurrent task makes it easier since it's mentioned in both build, test and server tasks.

```js
    assemble: {
        server: { … },
        dist: {
            files: [{
                expand: true,
                cwd: 'templates/site',
                src: [{,*/}*.hbs]   ,
                dest: 'dist/'}]
        },
    }
```

## LiveReload
If you're like me and you love the liveReload plugin, you should add assembled pages to be watched over for changes and trigger the browser to reload. We can simply add ***.tmp*** folder to be watched as well as the app directory.

```js
    watch: {
        coffee: { … },
        compass: { … },
        livereload: {
            files: [
                '{.tmp,<%= yeoman.app %>}/{,*/}*.html',
            ]
        }
    }
```