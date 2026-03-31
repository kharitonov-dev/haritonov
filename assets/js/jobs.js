/* jobs.js — show/hide older work experience */

var jobsOpen = false;

function toggleJobs() {
  jobsOpen = !jobsOpen;
  document
    .getElementById("hidden-jobs-container")
    .classList.toggle("open", jobsOpen);
  document.getElementById("show-btn-text").textContent = jobsOpen ? "// show less" : "// show more";
  document.getElementById("show-btn-count").textContent = jobsOpen ? "скрыть" : "+ 2 места работы";
  document.getElementById("show-btn-icon").textContent = jobsOpen ? "↑" : "↓";
}
