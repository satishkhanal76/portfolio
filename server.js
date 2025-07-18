import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';

// For __dirname support
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load correct env file
const mode = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${mode}` });

const app = express();
const PORT = process.env.PORT || 3000;
const PROJECTS_ROOT = path.resolve(__dirname, process.env.PROJECTS_ROOT);

const projectsConfigPath = path.join(__dirname, 'projects.json');
const projects = JSON.parse(fs.readFileSync(projectsConfigPath, 'utf-8'));


// === Static Projects ===

// Only serve portfolio site in production
if (mode === 'production') {
    app.use('/', express.static(path.join(PROJECTS_ROOT, "public", "portfolio-frontend")));
}else {
    app.use('/', express.static(path.join(PROJECTS_ROOT, 'satishkhanal76.github.io', "dist")));
}

for (const project of projects) {
  const projectPath = path.join(PROJECTS_ROOT, project.path);

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