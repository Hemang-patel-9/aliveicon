const fs = require('node:fs');
const typescript = require('rollup-plugin-typescript2');
const packageJson = require('./package.json');

const deps = [
	...Object.keys(packageJson.dependencies || {}),
	...Object.keys(packageJson.peerDependencies || {}),
];
const external = (id) => deps.some((dep) => id === dep || id.startsWith(`${dep}/`));

const banner = "'use client';";

const cleanDist = {
	name: 'clean-dist',
	buildStart() {
		fs.rmSync('dist', { recursive: true, force: true });
	},
};

const esmPackageJson = {
	name: 'esm-package-json',
	generateBundle(options) {
		if (options.format === 'es') {
			this.emitFile({ type: 'asset', fileName: 'package.json', source: '{ "type": "module" }\n' });
		}
	},
};

module.exports = {
	input: 'src/index.ts',
	external,
	output: [
		{
			dir: 'dist/esm',
			format: 'esm',
			preserveModules: true,
			preserveModulesRoot: 'src',
			banner,
		},
		{
			dir: 'dist/cjs',
			format: 'cjs',
			preserveModules: true,
			preserveModulesRoot: 'src',
			exports: 'named',
			banner,
		},
	],
	plugins: [
		cleanDist,
		typescript({
			tsconfig: './tsconfig.json',
			include: ['**/*.ts', '**/*.tsx'],
			check: false,
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
		esmPackageJson,
	],
	onwarn(warning, warn) {
		if (warning.code === 'MODULE_LEVEL_DIRECTIVE' || warning.code === 'SOURCEMAP_ERROR') return;
		warn(warning);
	},
};
