import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskCard from "../components/TaskCard.jsx";
import TaskForm from "../components/TaskForm.jsx";
import {
  addComment, addMember, createTask, deleteProject, deleteTask,
  getProject, getTasks, updateTask,
} from "../services/api.js";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [member, setMember] = useState("");
  const [comment, setComment] = useState("");

  const load = useCallback(async () => {
    const [p, t] = await Promise.all([getProject(id), getTasks(id)]);
    setProject(p.data);
    setTasks(t.data);
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const handleAddTask = async (form) => {
    await createTask({ ...form, projectId: id });
    load();
  };

  const handleUpdateTask = async (taskId, changes) => {
    await updateTask(taskId, changes);
    load();
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    load();
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!member.trim()) return;
    await addMember(id, member);
    setMember("");
    load();
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    await addComment(id, comment);
    setComment("");
    load();
  };

  const handleDeleteProject = async () => {
    if (!window.confirm("Delete this project and all its tasks?")) return;
    await deleteProject(id);
    navigate("/");
  };

  if (!project) return <p className="muted">Loading project…</p>;

  return (
    <>
      <div className="row between">
        <h2>{project.title}</h2>
        <button className="btn ghost" onClick={handleDeleteProject}>Delete project</button>
      </div>
      {project.description && <p className="muted">{project.description}</p>}
      {project.deadline && (
        <p className="small">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
      )}

      <div className="progress big">
        <div className="progress-bar" style={{ width: `${project.progress}%` }} />
      </div>
      <p className="small">
        {project.progress}% complete ({project.completedTasks}/{project.totalTasks} tasks)
      </p>

      <section>
        <h3>Team</h3>
        <div className="row wrap gap">
          {project.members.map((m) => <span key={m} className="chip">{m}</span>)}
        </div>
        <form className="row gap" onSubmit={handleAddMember}>
          <input placeholder="Add member name" value={member}
            onChange={(e) => setMember(e.target.value)} />
          <button className="btn" type="submit">Add member</button>
        </form>
      </section>

      <section>
        <h3>Tasks</h3>
        <TaskForm members={project.members} onAdd={handleAddTask} />
        <div className="stack">
          {tasks.length === 0 && <p className="muted">No tasks yet. Add the first one above.</p>}
          {tasks.map((t) => (
            <TaskCard key={t._id} task={t}
              onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
          ))}
        </div>
      </section>

      <section>
        <h3>Comments</h3>
        <form className="row gap" onSubmit={handleAddComment}>
          <input placeholder="Write a comment" value={comment}
            onChange={(e) => setComment(e.target.value)} />
          <button className="btn" type="submit">Post</button>
        </form>
        <div className="stack">
          {project.comments.length === 0 && <p className="muted">No comments yet.</p>}
          {[...project.comments].reverse().map((c) => (
            <div key={c._id} className="card">
              <strong>{c.author}</strong>{" "}
              <span className="small muted">{new Date(c.createdAt).toLocaleString()}</span>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}