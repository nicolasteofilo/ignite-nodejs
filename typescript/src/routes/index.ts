import { Request, Response } from "express";
import CreateCourseService from "../CreateCourseService";

export function createCourse(req: Request, res: Response) {
    CreateCourseService.execute({
        name: "Nodejs",
        educator: "Dani",
        duration: 10,
    });

    return res.json({ message: "Course created" });
}