const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const postcss = require('rollup-plugin-postcss');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const path = require('path');
const packageJson = require('./package.json');

module.exports = {
	input: 'src/index.ts',
	output: [
		{
			file: packageJson.module, // esm
			format: 'esm',
			sourcemap: true
		},
		{
			file: packageJson.main, // cjs
			format: 'cjs',
			sourcemap: true,
			exports: 'named'
		}
	],
	external: [
		"react",
		"react-dom",
		"framer-motion"
	],	  
	plugins: [
		peerDepsExternal(),
		resolve({
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
			preferBuiltins: false,
			browser: true,
		}),
		commonjs(),
		postcss({
			extensions: ['.css'],
			extract: false,
			minimize: true,
			sourceMap: true,
		}),
		typescript({
			tsconfig: './tsconfig.json',
			useTsconfigDeclarationDir: true,
			clean: true,
			tsconfigOverride: {
				compilerOptions: {
					declaration: true,
					declarationDir: 'dist/types',
					module: 'ESNext',
				},
			},
		}),
	],
};
