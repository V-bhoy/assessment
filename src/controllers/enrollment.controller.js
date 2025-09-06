import {db} from "../../index.js";

export async function enrollInCourse(req, res) {
    const { id, role } = req.user;
    if (role !== 'student') {
        return res.status(403).json({ message: "Forbidden: Only students can enroll in courses." });
    }
    const { courseId } = req.body;
    if (!courseId) {
        return res.status(400).json({ message: "Course ID is required" });
    }
    try {
       const existingCourse = await db('courses').where({ id: courseId }).first();
       if (!existingCourse) {
           return res.status(404).json({ message: "Course not found" });
       }
       await db('enrollments').insert({ user_id: id, course_id: courseId}); 
    }
    catch (error) {
        console.error("Error enrolling in course:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json({ message: "Enrolled in course successfully!" });
}