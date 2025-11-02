import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';

const isDev = process.env.NODE_ENV === 'development';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: isDev,
  },
  plugins: [
    isDev && serve({
      open: true,
      contentBase: ['dist'],
      port: 3000
    }),
    terser()
  ].filter(Boolean)
};
