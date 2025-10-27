import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default {
  input: 'src/fox-photo-gallery.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es'
  },
  plugins: [
    resolve(),
    serve({
      open: true,
      contentBase: ['src', '.'],
      port: 8001
    }),
    livereload()
  ]
};
