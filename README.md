# grunt-lisp.js

> [Transpile lisp to JS](https://github.com/JavaNut13/lisp.js) with Grunt

## Getting Started

Read the Grunt [getting started guide](http://gruntjs.com/getting-started). Add the dependecy to your `package.json`:

```json
"devDependencies": {
  "@javanut13/grunt-lisp.js": "0.0.3",
  "grunt": "^0.4.5"
}
```

Add the task config in your `Gruntfile`:

```javascript
lisp_js: {
  options: {
    extension: 'lsp',
    cut: 'src/',
    extend: require('./test/extend')
  },
  src: [
    'src/**/*.lsp'
  ],
  dest: 'build/'
},
...
grunt.loadNpmTasks('@javanut13/grunt-lisp.js');
```

All the files in the `src` will be transpiled and output to the `dest` folder in the same structure as the input. If the exension of the file matches the `extension` option it will be removed from the filename before adding `.js`. The `cut` option lets you remove a part of the path when outputting to the destination.

The Lisp.js generator can be extended with custom functions. A function should be passed in that will be used to add definitions to the language. These can obviously be in a separate file and `require`-ed. For example:

```javascript
module.exports = function(lisp) {
  lisp.extend('not', function(items) {
    return '(!' + this.get(items[0]) + ')';
  });
}
```

## Watch

You can use [watch](https://github.com/gruntjs/grunt-contrib-watch) to run Lisp.js whenever you edit a lisp file:

```javascript
watch: {
  scripts: {
    files: ['src/**/*.lsp'],
    tasks: ['lisp_js'],
    options: {
      spawn: false,
    },
  },
}
...
grunt.loadNpmTasks('grunt-contrib-watch');
```

Then run `grunt watch` and `nodemon build/server.js` ([nodemon](https://github.com/remy/nodemon)) to auto-restart the server when the files are transpiled.
