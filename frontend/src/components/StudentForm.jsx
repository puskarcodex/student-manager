import { useState } from "react";

function StudentForm({ onSubmit, editingStudent, cancelEdit }) {
  const [form, setForm] = useState({ name: "", age: "", course: "" });

  const isEditing = !!editingStudent;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit({ name: form.name, age: Number(form.age), course: form.course });
    setForm({ name: "", age: "", course: "" });
  };

  return (
    <div className="card">
      <div className="card__header">
        <div>
          <div className="card__title-row">
            <div className={`card__dot ${isEditing ? "card__dot--warning" : ""}`} />
            <h2 className="card__title">
              {isEditing ? "Update Student" : "Add Student"}
            </h2>
          </div>
          <p className="card__description">
            {isEditing
              ? "Modify the student's information below"
              : "Fill in the details to register a new student"}
          </p>
        </div>
      </div>

      <div className="form__fields">
        <div className="form__field">
          <label>Name</label>
          <input
            className="form__input"
            name="name"
            placeholder="e.g. Ram Karki"
            value={isEditing ? editingStudent.name : form.name}
            onChange={handleChange}
          />
        </div>

        <div className="form__field">
          <label>Age</label>
          <input
            className="form__input"
            name="age"
            placeholder="e.g. 21"
            value={isEditing ? editingStudent.age : form.age}
            onChange={handleChange}
          />
        </div>

        <div className="form__field">
          <label>Course</label>
          <input
            className="form__input"
            name="course"
            placeholder="e.g. Computer Science"
            value={isEditing ? editingStudent.course : form.course}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form__actions">
        <button className="btn btn--primary" onClick={handleSubmit}>
          {isEditing ? "Update Student" : "Add Student"}
        </button>

        {isEditing && (
          <button className="btn btn--ghost" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default StudentForm;