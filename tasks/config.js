import path from 'path';
import fs from 'fs';

const pkgPath = path.resolve('package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath));

// Base config
const config = {
  name: pkg.name,
  version: pkg.version,
  moduleName: 'InputRange',
  src: 'src',
  build: 'build',
  dist: 'dist',
  test: 'test',
  tasks: 'tasks',
  example: {
    src: 'example/src',
    build: 'example/build',
  },
};

// Script config
config.script = {
  build: {
    paths: [
      config.src + '/js',
    ],
    entries: [
      config.src + '/js/' + config.moduleName + '.js',
    ],
    external: 'react',
    output: pkg.name + '.js',
    standalone: config.moduleName,
    dest: config.build,
  },

  example: {
    paths: [
      config.build,
      config.src + '/js',
      config.example.src,
    ],
    entries: [
      config.example.src + '/example.js',
    ],
    noParse: [
      require.resolve(path.join(process.cwd(), config.build, config.name)),
    ],
    output: 'example.js',
    dest: config.example.build,
    debug: true,
  },

  dist: {
    src: config.build + '/**/*.js',
    dest: config.dist,
    rename: {
      suffix: '.min',
    },
  },
};

// Style config
config.style = {
  build: {
    src: config.src + '/css/**/*.scss',
    output: pkg.name + '.css',
    dest: config.build,
    sass: {
      includePaths: [
        config.src,
      ],
    },
  },

  dist: {
    src: config.build + '/**/*.css',
    dest: config.dist,
    rename: {
      suffix: '.min',
    },
  },

  example: {
    src: config.example.src + '/**/*.scss',
    output: 'example.css',
    dest: config.example.build,
    sass: {
      includePaths: [
        config.build,
        config.src,
        config.example.src,
      ],
    },
  },
};

// Clean config
config.clean = {
  script: {
    src: [
      config.build + '/**/*.js*',
    ],
  },

  style: {
    src: [
      config.build + '/**/*.css*',
    ],
  },

  example: {
    style: {
      src: [
        config.example.build + '/**/*.css*',
      ],
    },
    script: {
      src: [
        config.example.build + '/**/*.js*',
      ],
    },
  },

  dist: {
    style: {
      src: [
        config.dist + '/**/*.css*',
      ],
    },
    script: {
      src: [
        config.dist + '/**/*.js*',
      ],
    },
  },
};

// Connect config
config.connect = {
  server: {
    root: 'example',
    livereload: true,
    port: 8080,
  },
};

// Watch config
config.watch = {
  style: {
    src: [
      config.style.build.src,
      config.style.example.src,
    ],
  },

  script: {
    src: [
      config.src + '/**/*.js',
      config.example.src + '/**/*.js',
      config.test + '/**/*.js',
    ],
    build: config.script.build,
    example: config.script.example,
  },

  task: {
    src: [
      config.tasks + '/**/*.js',
    ],
  },
};

// Lint config
config.lint = {
  script: {
    src: [
      config.src + '/**/*.js',
      config.test + '/**/*.js',
    ],
  },

  task: {
    src: config.tasks + '/**/*.js',
  },

  style: {
    src: config.src + '/**/*.scss',
    bundleExec: true,
  },
};

// Test config
config.test = {
  unit: {
    configFile: process.cwd() + '/karma.conf.js',
    autoWatch: false,
    singleRun: true,
  },
};

// Release config
config.release = {
  src: pkgPath,
};

export default config;
