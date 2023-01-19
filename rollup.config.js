import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import summary from 'rollup-plugin-summary';

const devMode = process.env.mode !== 'production';

console.log("Mode: " + process.env.mode);

export default {
    input: './src/index.ts',
    output: [{
        file: "./dist/Neuroevolution.js",
        name: "Neuroevolution",
        format: 'umd',
        sourcemap: true
    }],
    treeshake: !devMode,
    plugins: [
        typescript(),
        json(),
        commonjs(),
        summary(),
        resolve({
            preferBuiltins: false,
            browser: true,
            extensions: ['.ts'],
        }),
    ]
};
