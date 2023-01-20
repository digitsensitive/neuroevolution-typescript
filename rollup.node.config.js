import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import summary from 'rollup-plugin-summary';
import pkg from './package.json' assert { type: "json" };
import terser from '@rollup/plugin-terser';

const devMode = process.env.mode !== 'production';

console.log("Mode: " + process.env.mode);

export default {
    input: './src/index.ts',
    output: [{
        file: pkg.main,
        name: "Neuroevolution",
        format: 'cjs',
        sourcemap: devMode
    }],
    treeshake: !devMode,
    plugins: [
        !devMode && 
            terser({
                format: {
                    comments: false
                },
                compress: false
            }),
        typescript(),
        json(),
        commonjs(),
        summary(),
        resolve({
            preferBuiltins: false,
            browser: false,
            extensions: ['.ts'],
        }),
    ]
};
