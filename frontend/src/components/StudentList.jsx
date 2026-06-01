function StudentList({ students, onEdit, onDelete }) {
  return (
    <div className="card">
      <div className="card__header">
        <div>
          <div className="card__title-row">
            <h2 className="card__title">Students List</h2>
          </div>
          <p className="card__description">
            {students.length} enrolled student{students.length !== 1 ? "s" : ""}
          </p>
        </div>
        <span className="card__badge">{students.length} total</span>
      </div>

      {students.length === 0 && (
        <div className="empty-state">
          <div className="empty-state__icon">🎓</div>
          <p className="empty-state__text">No students yet. Add one to get started.</p>
        </div>
      )}

      <div className="student-list">
        {students.map((student) => (
          <div key={student.id} className="student-card">
            <div className="student-card__info">
              <div className="student-card__avatar">
                {student.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div>
                <p className="student-card__name">{student.name}</p>
                <div className="student-card__meta">
                  <span>Age {student.age}</span>
                  <span className="student-card__meta-sep">•</span>
                  <span>{student.course}</span>
                </div>
              </div>
            </div>

            <div className="student-card__actions">
              <button className="btn btn--edit" onClick={() => onEdit(student)}>Edit</button>
              <button className="btn btn--delete" onClick={() => onDelete(student.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentList;