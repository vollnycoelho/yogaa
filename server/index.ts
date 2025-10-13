import { spawn } from 'child_process';

console.log('🚀 Starting Vite development server...\n');

const vite = spawn('npx', ['vite', '--port', '5000', '--host', '0.0.0.0', '--strictPort'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    VITE_HOST_CHECK: 'false'
  }
});

vite.on('error', (error) => {
  console.error('Failed to start Vite:', error);
  process.exit(1);
});

vite.on('exit', (code) => {
  process.exit(code || 0);
});
