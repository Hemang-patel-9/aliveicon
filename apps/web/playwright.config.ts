import { defineConfig, devices } from '@playwright/test';
import { siteConfig } from './site.config';

const port = 3100;
const basePath = process.env.SITE_BASE_PATH ?? siteConfig.site.basePath;

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	reporter: 'list',
	use: {
		baseURL: `http://localhost:${port}${basePath}/`,
		trace: 'retain-on-failure',
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	webServer: {
		command: 'node scripts/serve.mjs',
		url: `http://localhost:${port}${basePath}/`,
		env: { PORT: String(port) },
		reuseExistingServer: false,
	},
});
