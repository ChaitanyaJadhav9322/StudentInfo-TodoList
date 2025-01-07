import React,{useState} from 'react'
import "./StudentInfo.css"

export default function StudentInfo() {
    const [studentInfo, setStudentInfo] = useState({
        name: "",
        email: "",
        age: 0
      });
    
      const [students, setStudents] = useState([]);
      const [editIndex, setEditIndex] = useState(null); // Track the student index being edited
    
      function handleInput(event, field) {
        let result = event.target.value;
        const resultObj = { ...studentInfo, [field]: result };
        setStudentInfo(resultObj);
      }
    
      
      function addData(event) {
        event.preventDefault();
    
        if (editIndex !== null) {
          
          const updatedStudents = students.map((student, index) =>
            index === editIndex ? studentInfo : student
          );
          setStudents(updatedStudents);
          setEditIndex(null);  
        } else {
         
          setStudents([...students, studentInfo]);
        }
    
         
        setStudentInfo({
          name: "",
          email: "",
          age: 0
        });
      }
    
      
      function editStudent(index) {
        setEditIndex(index);  
        setStudentInfo(students[index]);  
      }
    
       
      function deleteStudent(index) {
        if (window.confirm("Are you sure you want to delete this student?")) {
          const updatedStudents = students.filter((student, i) => i !== index);
          setStudents(updatedStudents);
        }
      }
    
      return (
        <div className="main">
          <form onSubmit={addData}>
            <label>Name: </label>
            <input
              type="text"
              value={studentInfo.name}
              onChange={(event) => handleInput(event, "name")}
            />
            <br />
            <br />
            <label>Email: </label>
            <input
              type="email"
              value={studentInfo.email}
              onChange={(event) => handleInput(event, "email")}
            />
            <br />
            <br />
            <label>Age: </label>
            <input
              type="number"
              value={studentInfo.age}
              onChange={(event) => handleInput(event, "age")}
            />
            <br />
            <br />
            <button type="submit">{editIndex !== null ? "Update" : "Submit"}</button>
          </form>
    
          <div className="student-list">
            <h2>Student List</h2>
    
            {students.length === 0 ? (
              <p>No students added yet.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th colSpan="2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.age}</td>
                      <td>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => editStudent(index)}  
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => deleteStudent(index)} 
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )
}
