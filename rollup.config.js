
/**
 * I'm just having a problrm running const-export in my device
 * */


const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
//const terser = require('@rollup/plugin-terser');

const uglify = require("rollup-plugin-uglify");


//console.log(uglify())
const devMode = process.env.mode !== 'production';

console.log("Mode: " + process.env.mode)

module.exports = {
    input: './src/index.ts',
    output: [{
        file: "./dist/Neuroevolution.js",
        name: "Neuroevolution",
        format: 'umd',
        sourcemap: true
    }],
    plugins: [
       // terser()
        uglify(),
        typescript(),
        json(),
        commonjs(),
        resolve({
          preferBuiltins: false,
          browser: true,
          extensions: ['.ts'],
        }),
    ]
};
