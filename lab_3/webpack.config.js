const nodeExternals = require('webpack-node-externals');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const fs = require("fs");
const fse = require('fs-extra');

// Copying public folders
try {
    console.log("Public/certificate folder: ");
    fse.copySync("./public/certificate", "./dist_webpack/public/certificate", { overwrite: true });
    console.log('Success!');
} catch (err) {
    console.error(err)
}

// Routes import
try {
    console.log("Routes folder: ");
    fse.copySync("./public/build/routes", "./dist_webpack/routes", { overwrite: true });
    console.log('Success!');
} catch (err) {
    console.error(err)
}


// Utils folder import
try {
    console.log("Utils folder: ");
    fse.copySync("./utils", "./dist_webpack/utils", { overwrite: true });
    console.log('Success!');
} catch (err) {
    console.error(err)
}


// App file import
try {
    console.log("Server.js: ");
    fse.copySync("./server.js", "./dist_webpack/server.js", { overwrite: true });
    console.log('Success!');
} catch (err) {
    console.error(err)
}


// Database import
try {
    console.log("Database.json: ");
    fse.copySync("./database.json", "./dist_webpack/database.json", { overwrite: true });
    console.log('Success!');
} catch (err) {
    console.error(err)
}

const pages = fs.readdirSync("./public/build/webpack_views").filter(name => name.endsWith(".pug"))

module.exports = {
    externals: [nodeExternals()],
    mode: "development",
    devtool: false,
    entry: {
        index:          "./public/webpack_scripts/index.js",
        not_found:      "./public/webpack_scripts/not_found.js",
        profile:        "./public/webpack_scripts/profile.js",
        edit_profile:   "./public/webpack_scripts/edit_profile.js",
        control_panel:  "./public/webpack_scripts/control_panel.js",
    },
    output: {
        path: path.resolve(__dirname, "dist_webpack"),
        filename: "./public/scripts/[name].js",
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ],
                exclude: /node_modules/
            },
            {
                test: /\.pug$/,
                use: [
                    "pug-loader"
                ],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {presets: ["@babel/preset-env"]}
                }
            }
        ]
    },
    plugins: [
        ...pages.map(file => new HtmlWebpackPlugin({
                template: `./public/build/webpack_views/${file}`,
                filename: `./public/views/${file.replace(/\.pug/, '.html')}`,
                inject: 'body',
                chunks: [file.replace(/\.pug/, "")]
            })
        )
    ]
}