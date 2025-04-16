const userModel = require("../Models/studentModel");

const GetAllUserData = async (req, res) => {
  try {
    const Students = await userModel.find();
    if (!Students) {
      return res.status(400).json({ message: "No record found" });
    }
    return res.status(200).json({ Students });
  } catch (err) {
    return res.status(500).json({ message: "SERVER ERROR " + err });
  }
};

const CreateStudent = async (req, res) => {
  const { name, email, course, age } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "Name is Required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is Required" });
    }
    if (!course) {
      return res.status(400).json({ message: "Course is Required" });
    }
    if (!age) {
      return res.status(400).json({ message: "Age is Required" });
    }

    const existingStudent = await userModel.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student with this email already exists" });
    }
    const Student = await userModel.create({
      name,
      email,
      course,
      age,
    });

    return res.status(200).json({ message: "New Student Added", Student });
  } catch (err) {
    return res.status(500).json({ message: "SERVER ERROR " + err });
  }
};

const updateStudentDetail = async (req,res) => {
    try{
        const { id } = req.params;
        const { name, email, course, age } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Student ID is required" });
        }

        const updatedStudent = await userModel.findByIdAndUpdate(
            id,
            { name, email, course, age },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json({ message: "Student updated successfully", updatedStudent });
    }
    catch(err){
        return res.status(500).json({message : "Internal Server Error : " + err});
    }
};

const deleteStudent = async (req,res) => {
    try{
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Student ID is required" });
        }

        const deletedStudent = await userModel.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json({ message: "Student deleted successfully", deletedStudent });
    }   
    catch(err){
        return res.status(500).json({message : "SERVER ERROR  "  + err})
    }
}

module.exports = {
  GetAllUserData,
  CreateStudent,
  updateStudentDetail,
  deleteStudent,
};
