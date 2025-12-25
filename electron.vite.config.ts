import react from '@vitejs/plugin-react';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { resolve } from 'path';
import { loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const ReactCompilerConfig = {};

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());
  process.env.OWNER = env.VITE_UPDATER_OWNER;
  process.env.REPO = env.VITE_UPDATER_REPO;
  process.env.GH_TOKEN = env.VITE_UPDATER_GH_TOKEN;

  return {
    main: {
      plugins: [externalizeDepsPlugin()],
      define: {
        'process.env.OWNER': JSON.stringify(process.env.OWNER),
        'process.env.REPO': JSON.stringify(process.env.REPO),
        'process.env.GH_TOKEN': JSON.stringify(process.env.GH_TOKEN),
      },
    },
    preload: {
      plugins: [externalizeDepsPlugin()],
      define: {
        'process.env.OWNER': JSON.stringify(process.env.OWNER),
        'process.env.REPO': JSON.stringify(process.env.REPO),
        'process.env.GH_TOKEN': JSON.stringify(process.env.GH_TOKEN),
      },
    },
    renderer: {
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer'),
          // /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
          '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
        },
      },
      plugins: [
        react({
          babel: {
            plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
          },
        }),
        tsconfigPaths(),
      ],
      define: {
        // Vite renderer process still needs VITE_ prefix exposed normally
        'process.env.VITE_UPDATER_OWNER': JSON.stringify(env.VITE_UPDATER_OWNER),
        'process.env.VITE_UPDATER_REPO': JSON.stringify(env.VITE_UPDATER_REPO),
        'process.env.VITE_UPDATER_GH_TOKEN': JSON.stringify(env.VITE_UPDATER_GH_TOKEN),
      }
    },
  }
});
