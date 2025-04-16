import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";

const Student = () => {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        course: ''
    });
    const [editId, setEditId] = useState(null); // for tracking which student is being edited

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editId) {
            // Edit student
            try {
                const response = await fetch(`http://localhost:5000/api/students/${editId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (!response.ok) {
                    toast.error(data.message || 'Failed to update student');
                } else {
                    setStudents(students.map(student =>
                        student._id === editId ? { ...student, ...formData } : student
                    ));
                    toast.success('Student updated successfully');
                    setEditId(null);
                    setFormData({ name: '', age: '', email: '', course: '' });
                }
            } catch (error) {
                toast.error('Error updating student');
            }
        } else {
            // Add new student
            try {
                const response = await fetch('http://localhost:5000/api/students', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (!response.ok) {
                    toast.error(data.message || 'Failed to add student');
                } else {
                    setStudents([...students, data.Student]);
                    toast.success('Student added successfully');
                    setFormData({ name: '', age: '', email: '', course: '' });
                }
            } catch (error) {
                toast.error('Error adding student');
            }
        }
    };

    const handleDelete = async (_id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/students/${_id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                toast.error('Failed to delete student');
                return;
            }

            setStudents(students.filter(student => student._id !== _id));
            toast.success('Student deleted successfully');
        } catch (error) {
            console.error('Error deleting student:', error);
            toast.error('Error deleting student');
        }
    };

    const handleEdit = (student) => {
        setFormData({
            name: student.name,
            age: student.age,
            email: student.email,
            course: student.course,
        });
        setEditId(student._id);
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/students");
                const data = await response.json();
                if (!response.ok) {
                    toast.error(data.message || 'Failed to fetch students');
                } else {
                    setStudents(data.Students);
                }
            } catch (error) {
                toast.error('Error fetching students');
            }
        };
        fetchStudents();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Student Management System</h1>

            {/* Form */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">
                    {editId ? "Edit Student" : "Add New Student"}
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="text"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Age"
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="text"
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            placeholder="Course"
                            className="border p-2 rounded"
                            required
                        />
                    </div>
                    <div className="flex gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            {editId ? "Update Student" : "Add Student"}
                        </button>
                        {editId && (
                            <button
                                type="button"
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                onClick={() => {
                                    setEditId(null);
                                    setFormData({ name: '', age: '', email: '', course: '' });
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Student Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">Age</th>
                            <th className="px-6 py-3 text-left">Course</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id} className="border-t">
                                <td className="px-6 py-4">{student.name}</td>
                                <td className="px-6 py-4">{student.email}</td>
                                <td className="px-6 py-4">{student.age}</td>
                                <td className="px-6 py-4">{student.course}</td>
                                <td className="px-6 py-4 text-center space-x-2">
                                    <button
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                        onClick={() => handleEdit(student)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        onClick={() => handleDelete(student._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {students.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-gray-500">
                                    No students added yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Student;
