import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard.jsx";
import { createProject, getProjects } from "../services/api.js";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", deadline: "", members: "" });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await getProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await createProject({
      ...form,
      members: form.members.split(",").map((m) => m.trim()).filter(Boolean),
    });
    setForm({ title: "", description: "", deadline: "", members: "" });
    load();
  };

  return (
    <>
      <h2>Your projects</h2>

      <form className="card stack" onSubmit={submit}>
        <h3>New project</h3>
        <input name="title" placeholder="Project title" value={form.title} onChange={change} required />
        <input name="description" placeholder="Short description" value={form.description} onChange={change} />
        <input name="members" placeholder="Team members, separated by commas" value={form.members} onChange={change} />
        <label className="small muted">Deadline
          <input type="date" name="deadline" value={form.deadline} onChange={change} />
        </label>
        <button className="btn" type="submit">Create project</button>
      </form>

      {loading ? (
        <p className="muted">Loading projects…</p>
      ) : projects.length === 0 ? (
        <p className="muted">No projects yet. Create your first one above.</p>
      ) : (
        <div className="grid">
          {projects.map((p) => <ProjectCard key={p._id} project={p} />)}
        </div>
      )}
    </>
  );
}