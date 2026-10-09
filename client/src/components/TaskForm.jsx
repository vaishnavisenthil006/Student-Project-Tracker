import { useState } from "react";

export default function TaskForm({ members, onAdd }) {
  const empty = { title: "", assignedTo: "", deadline: "" };
  const [form, setForm] = useState(empty);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    await onAdd(form);
    setForm(empty);
  };

  return (
    <form className="row wrap gap" onSubmit={submit}>
      <input name="title" placeholder="Task title" value={form.title} onChange={change} required />
      <select name="assignedTo" value={form.assignedTo} onChange={change}>
        <option value="">Unassigned</option>
        {members.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      <input type="date" name="deadline" value={form.deadline} onChange={change} />
      <button className="btn" type="submit">Add task</button>
    </form>
  );
}