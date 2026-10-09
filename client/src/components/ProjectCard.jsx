import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project._id}`} className="card project-card">
      <h3>{project.title}</h3>
      {project.description && <p className="muted">{project.description}</p>}
      <div className="progress">
        <div className="progress-bar" style={{ width: `${project.progress}%` }} />
      </div>
      <div className="row between small">
        <span>{project.completedTasks}/{project.totalTasks} tasks done</span>
        <span>{project.progress}%</span>
      </div>
      <div className="small muted">
        {project.members.length} member{project.members.length !== 1 && "s"}
        {project.deadline && ` • Due ${new Date(project.deadline).toLocaleDateString()}`}
      </div>
    </Link>
  );
}