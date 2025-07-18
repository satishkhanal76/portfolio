import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';

// For __dirname support
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const currentDir = path.dirname(__filename);
const mode = process.env.NODE_ENV || 'development';
const envFile = mode === 'production' ? '.env' : '.env.development';
dotenv.config({ path: path.resolve(currentDir, envFile) });


const app = express();
const PORT = process.env.PORT || 3000;
const PROJECTS_ROOT = path.resolve(__dirname, process.env.PROJECTS_ROOT);

const projectsFileName = mode === 'production' ? 'projects.json' : 'projects_development.json';
const projectsConfigPath = path.join(__dirname, projectsFileName);
const projects = JSON.parse(fs.readFileSync(projectsConfigPath, 'utf-8'));



for (const project of projects) {
  const projectPath = path.join(PROJECTS_ROOT, ...project.path);

  if (project.type === 'static') {
    app.use(project.route, express.static(projectPath));
  } else if (project.type === 'server') {
    console.warn(`⚠️  Skipping ${project.route} — requires separate server startup.`);
    // Future: implement proxy or subprocess runner here
  }
}


// === 404 Error ===
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});



app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT} in ${mode} mode\n`);
});