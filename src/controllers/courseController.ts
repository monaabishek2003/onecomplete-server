import {Request, Response} from "express";
import Course from "../models/courseModel"

export const listCourses = async (
  req : Request,
  res : Response
) => {
  const {category} = req.query;
  try{
    const courses = category && category !== "all"
                    ? await Course.scan("category").eq(category).exec()
                    : await Course.scan().exec();
    res.json({message : "Courses Retrived Successfully", data : courses});
  }catch(error){
    res.status(500).json({message : "Error While Retriving Courses", error})
  }
}

export const getCourse = async (
  req : Request,
  res : Response
) => {
  const {courseId} = req.query;
  try{
    const course = await Course.scan().eq(courseId).exec()
    if(course) {
      res.json({message : "Courses Retrived Successfully", data : course});
    }else{
      res.json({message : "Course not found"});
    }
  }catch(error){
    res.status(500).json({message : "Error While Retriving Course", error})
  }
}
