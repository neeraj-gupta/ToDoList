'use strict';

import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import rename from 'gulp-rename';
import template from 'gulp-template';
import fs from 'fs';
import yargs from 'yargs';
import lodash from 'lodash';
import gutil from 'gulp-util';
import serve from 'browser-sync';
import nodemon from 'gulp-nodemon';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpachHotMiddleware from 'webpack-hot-middleware';
import colorsSupported from 'supports-color';

let env = yargs.argv.env || 'development';
let app = yargs.argv.app || 'client';
let root = 'src/' + app;
let dest = (app.indexOf('mobile') > -1) ? 'dist/' + app + '/www' : 'dist/' + app;

// helper method for resolving paths
let resolveToApp = (glob = '') => {
    return path.join(root, '/app', glob); // app/{glob}
};

let resolveToComponents = (glob = '') => {
    return path.join(root, '/app/components', glob); // app/components/{glob}
};

let resolveToEndpoints = (glob = '') => {
    const app = yargs.argv.app || 'server';
    const root = 'src/' + app;
    return path.join(root, '/v/1/', glob); // v/1/{glob}
};

// map of all paths
let paths = {
    js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
    scss: resolveToApp('**/*.scss'), // stylesheets
    html: [
        resolveToApp('**/*.html'),
        path.join(root, 'index.html')
    ],
    entry: [
        'babel-polyfill',
        path.join(__dirname, root, '/app/app.js')
    ],
    output: root,
    blankTemplates: path.join(__dirname, 'generator', '/component/**/*.**'),
    blankEndpoints: path.join(__dirname, 'generator', '/endpoint/**/*.**'),
    dest: path.join(__dirname, dest)
};

// use webpack.config.js to build modules
gulp.task('webpack', ['clean'], (cb) => {
    const config = require('./webpack.dist.config')(app, env);
    config.entry.app = paths.entry;

    webpack(config, (err, stats) => {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }

        gutil.log("[webpack]", stats.toString({
            colors: colorsSupported,
            chunks: false,
            errorDetails: true
        }));

        cb();
    });
});

gulp.task('serve', () => {
    if (app === 'server') {
        nodemon({
            script: 'src/server/app.js',
            ext: 'js',
            watch: 'src/server/**/*'
        });
    } else {
        const config = require('./webpack.dev.config')(app, env);
        config.entry.app = [
            // this modules required to make HRM working
            // it responsible for all this webpack magic
            'webpack-hot-middleware/client?reload=true',
            // application entry point
        ].concat(paths.entry);

        var compiler = webpack(config);

        serve({
            port: process.env.PORT || 8080,
            logLevel: 'debug',
            open: true,
            browser: 'google chrome',
            //https: true,
            server: {
                baseDir: root,
                // Make sure its getting the index.html file
                middleware: [mod(['^[^\\.]*$ /index.html [L]'])]
            },
            ui: {
                port: 8081,
                weinre: {
                    port: 9090
                }
            },
            middleware: [
                historyApiFallback(),
                webpackDevMiddleware(compiler, {
                    stats: {
                        colors: colorsSupported,
                        chunks: false,
                        modules: false
                    },
                    publicPath: config.output.publicPath
                }),
                webpachHotMiddleware(compiler)
            ]
        });
    }
});

gulp.task('component', () => {
    let name_array = yargs.argv.name.toLowerCase().split('_');
    const cap = (array) => {
        let modified_name = "";
        array.forEach((item) => {
            modified_name += item.charAt(0).toUpperCase() + item.slice(1);
        })
        return modified_name;
    };
    const camel = (val) => {
        return val.charAt(0).toLowerCase() + val.slice(1);
    };
    const tag = (val) => {
        return val.toLowerCase().replace(/_/gi, '-');
    };
    const name = yargs.argv.name.toLowerCase();
    const parentPath = yargs.argv.parent || '';
    const destPath = path.join(resolveToComponents(), parentPath, name);

    let capName = cap(name_array);
    return gulp.src(paths.blankTemplates)
        .pipe(template({
            name: name,
            upCaseName: capName,
            camelCaseName: camel(capName),
            tagName: tag(name)
        }))
        .pipe(rename((path) => {
            path.basename = path.basename.replace('temp', name);
        }))
        .pipe(gulp.dest(destPath));
});

gulp.task('endpoint', () => {
    const cap = (val) => {
        return val.charAt(0).toUpperCase() + val.slice(1);
    };
    const name = yargs.argv.name;
    const parentPath = yargs.argv.parent || '';
    const destPath = path.join(resolveToEndpoints(), parentPath, name);

    return gulp.src(paths.blankEndpoints)
        .pipe(template({
            name: name,
            upCaseName: cap(name)
        }))
        .pipe(rename((path) => {
            path.basename = path.basename.replace('temp', name);
        }))
        .pipe(gulp.dest(destPath));
});

gulp.task('default', ['serve']);