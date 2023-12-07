import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			edge: true,
		})
	},
	preprocess: vitePreprocess(),
	// vitePlugin: {
	// 	inspector: {
	// 		holdMode: true,
	// 	}
	// }
};

export default config;
