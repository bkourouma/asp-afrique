/**
 * PM2 Ecosystem Configuration for ASP Afrique
 * Frontend: Next.js
 * Backend: Fastify API (TypeScript via tsx)
 * Runtime: npm only
 */

module.exports = {
  apps: [
    /**
     * ============================
     * API – Fastify (Port 3004)
     * ============================
     */
    {
      name: 'asp-afrique-api',
      script: 'node_modules/.bin/tsx',
      args: 'src/index.ts',
      cwd: './apps/api',
      instances: 1,
      exec_mode: 'fork',

      env: {
        NODE_ENV: 'production',
        PORT: 3004,
        API_HOST: '0.0.0.0',
        CORS_ORIGIN: 'http://localhost:3000',

        // ⚠️ REMPLACE CES VALEURS SUR LE SERVEUR
        DATABASE_URL: 'postgresql://aspci_user:VotreMotDePasseSecurise123!@localhost:5432/aspci_afrique_db',
        NEXTAUTH_SECRET: 'Yo3r/duMP20CXio0x0EJpIvlwVP5zG7mz21n6GMoF3HUsVoofLbbRPqCwjk='
      },

      error_file: '../../logs/api-error.log',
      out_file: '../../logs/api-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      min_uptime: '10s',
      max_restarts: 10,
      kill_timeout: 5000
    },

    /**
     * ============================
     * WEB – Next.js (Port 3000)
     * ============================
     */
    {
      name: 'asp-afrique-web',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      cwd: './apps/web',
      instances: 1,
      exec_mode: 'fork',

      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },

      error_file: '../logs/web-error.log',
      out_file: '../logs/web-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      min_uptime: '10s',
      max_restarts: 10,
      kill_timeout: 5000
    }
  ]
};
