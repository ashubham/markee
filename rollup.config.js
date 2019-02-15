import { terser } from "rollup-plugin-terser";

export default {
    input: 'build/index.js',
    output: [{
        file: 'dist/markee-es.js',
        format: 'es',
        sourcemap: true
    }, {
        file: 'dist/markee.js',
        format: 'umd',
        name: 'Markee',
        sourcemap: true
    }],
    plugins: [
        terser()
    ]
}