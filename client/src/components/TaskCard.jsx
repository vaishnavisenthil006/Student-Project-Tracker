export default function TaskCard({ task, onUpdate, onDelete }) {
  const overdue =
    task.deadline && task.status !== "Completed" && new Date(task.deadline) < new Date();

  return (
    <div className={`card task status-${task.status.replace(" ", "-").toLowerCase()}`}>
      <div>
        <strong>{task.title}</strong>
        <div className="small muted">
          {task.assignedTo || "Unassigned"}
          {task.deadline && (
            <span className={overdue ? "overdue" : ""}>
              {" "}• Due {new Date(task.deadline).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      <div className="row gap">
        <select
          value={task.status}
          onChange={(e) => onUpdate(task._id, { status: e.target.value })}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button className="btn ghost" onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
}