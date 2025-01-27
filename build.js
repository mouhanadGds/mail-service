import shell from 'shelljs';
const { rm, mkdir, exec, echo, exit } = shell;

// Clean the build directory
rm('-rf', 'dist');
mkdir('dist');

// Bundle files with Webpack
if (exec('webpack --config webpack.config.js').code !== 0) {
  echo('Error: Webpack bundling failed');
  exit(1);
}

echo('Build completed successfully');
