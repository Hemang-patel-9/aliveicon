import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';

const packageJson = require('./package.json');

export default {
	input: 'src/index.ts',
	output: [
		{
			file: packageJson.main, // dist/cjs/index.js
			format: 'cjs',
			sourcemap: true,
			exports: 'named',
		},
		{
			file: packageJson.module, // dist/esm/index.js
			format: 'esm',
			sourcemap: true,
		},
	],
	external: ['react', 'react-dom', 'framer-motion'],
	plugins: [
		peerDepsExternal(),
		resolve({
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
		}),
		commonjs(),
		postcss({
			extensions: ['.css'],
			extract: false, // set to true if you want to extract styles
			minimize: true,
			sourceMap: true,
		}),
		typescript({
			useTsconfigDeclarationDir: true,
			clean: true,
			tsconfigOverride: {
				compilerOptions: {
					declaration: true,
					declarationDir: 'dist/types',
				},
			},
		}),
		terser(),
	],
};
