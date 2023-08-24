import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';


// @ts-ignore
export default (conf) => {
	const env = loadEnv(conf.mode, process.cwd(), "")
	return defineConfig({
		plugins: [sveltekit()],
		define: {
			'__LANG__': `'${env.PUBLIC_VITE_LOCALE ? env.PUBLIC_VITE_LOCALE.split('-')[0] : 'en'}'`,
		}
	})
};
