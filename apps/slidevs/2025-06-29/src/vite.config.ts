import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
  plugins: [
    Icons({
      compiler: 'vue3',
      defaultClass: 'slidev-icon',
    }),
    Inspect(),
  ],
});
