# Irvin Aloise - Personal Website & Portfolio

Personal website and portfolio of Irvin Aloise, Ph.D., focusing on Mobile Robotics, SLAM, and Graph Optimization.

Hosted via GitHub Pages at: [https://istinj.github.io](https://istinj.github.io)

## Features
- **Minimalist & Fast**: Zero framework dependencies, pure semantic HTML5 and vanilla CSS.
- **Dark / Light Theme**: Automatic detection with toggle switch and local persistence.
- **Job Portfolio Ready**: Structured sections for Work Experience, Education, Publications, Teaching, and Contact.
- **Print / PDF Friendly**: Built-in `@media print` styling for clean resume export.

## Adding Work Experience
To add a new work experience entry, open `index.html` and use the template inside the `<section id="experience">` block:

```html
<article class="card">
  <div class="card-header">
    <div class="card-title-group">
      <h3>Job Title</h3>
      <div class="card-subtitle">Company Name · Location</div>
    </div>
    <span class="card-date">Start Date – End Date</span>
  </div>
  <div class="card-body">
    <p>Brief summary of role and responsibilities.</p>
    <ul class="card-bullets">
      <li>Achievement or key contribution #1.</li>
      <li>Achievement or key contribution #2.</li>
    </ul>
    <div class="tag-list">
      <span class="tag">Skill 1</span>
      <span class="tag">Skill 2</span>
    </div>
  </div>
</article>
```
