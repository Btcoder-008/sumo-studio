#!/usr/bin/env node

/**
 * Sumo Studio Local Bridge Server
 *
 * This server runs on your local machine and receives script execution
 * requests from the Vercel website. It opens Terminal and runs the script.
 *
 * Usage: node local-server.js
 * Or:    npm run local-server
 */

const http = require('http');
const { exec } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const PORT = 4000;

const server = http.createServer((req, res) => {
  // Enable CORS for Vercel domain and localhost
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/run-script') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { content, projectName } = JSON.parse(body);

        if (!content || !projectName) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Missing content or projectName' }));
          return;
        }

        // Create temp script file
        const tempPath = path.join(os.tmpdir(), `sumo-${projectName}-${Date.now()}.sh`);
        fs.writeFileSync(tempPath, content);
        fs.chmodSync(tempPath, 0o755);

        console.log(`\n📝 Script saved to: ${tempPath}`);
        console.log(`🚀 Opening Terminal for project: ${projectName}`);

        // Open Terminal and run the script (macOS)
        const appleScript = `tell application "Terminal"
          activate
          do script "bash '${tempPath}'"
        end tell`;

        exec(`osascript -e '${appleScript}'`, (error, stdout, stderr) => {
          if (error) {
            console.error('❌ Error opening Terminal:', error.message);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Failed to open Terminal' }));
          } else {
            console.log('✅ Terminal opened successfully!');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Terminal opened!' }));
          }
        });

      } catch (error) {
        console.error('❌ Error:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: error.message }));
      }
    });

  } else if (req.method === 'GET' && req.url === '/health') {
    // Health check endpoint
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'running', port: PORT }));

  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║          🥋 SUMO STUDIO LOCAL BRIDGE SERVER 🥋            ║');
  console.log('╠═══════════════════════════════════════════════════════════╣');
  console.log(`║  Server running on: http://localhost:${PORT}                  ║`);
  console.log('║                                                           ║');
  console.log('║  This server receives commands from Vercel and runs      ║');
  console.log('║  scripts in your local Terminal.                         ║');
  console.log('║                                                           ║');
  console.log('║  Keep this terminal open while using Build Studio!       ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('Waiting for build requests...');
});
