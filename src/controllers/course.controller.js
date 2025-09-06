import {db} from '../../index.js';

export async function createCourse(req, res) {
    const { id, role } = req.user;
    if (role !== 'admin') {
        return res.status(403).json({ message: "Forbidden: Only admins can create courses." });
    }
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
    }
    try {
        await db('courses').insert({ title, description, created_by: id });
    }
    catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(201).json({ message: "Course created successfully!" });
}


export async function getAllCourses(req, res) {
    const { page = 1, limit = 10 } = req.query;
    try {
        const courses = await db('courses').select('id', 'title', 'description').offset((page - 1) * limit).limit(limit);
        return res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}