import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentApi";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = () => {
    getStudents()
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }
}, []);

  const handleSubmit = (student) => {
    if (editingStudent) {
      updateStudent(editingStudent.id, student).then(() => {
        fetchStudents();
        setEditingStudent(null);
      });
    } else {
      createStudent(student).then(() => {
        fetchStudents();
      });
    }
  };

  const handleDelete = (id) => {
    deleteStudent(id).then(() => fetchStudents());
  };

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard__container">
        <div className="dashboard__header">
          <h1 className="dashboard__title">Student Manager</h1>
          <p className="dashboard__subtitle">Manage and track enrolled students</p>
        </div>

        <div className="dashboard__stat">
          <div className="dashboard__stat-dot" />
          <span className="dashboard__stat-text">
            <span className="dashboard__stat-count">{students.length}</span>{" "}
            student{students.length !== 1 ? "s" : ""} enrolled
          </span>
        </div>

        <div className="dashboard__layout">
          <div>
            <StudentForm
              onSubmit={handleSubmit}
              editingStudent={editingStudent}
              cancelEdit={() => setEditingStudent(null)}
            />
          </div>

          <div>
            <StudentList
              students={students}
              onEdit={setEditingStudent}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;