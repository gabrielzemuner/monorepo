<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseRequest;
use App\Http\Resources\CourseResource;
use App\Models\Course;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::latest()->get();

        return response()->json([
            'data' => CourseResource::collection($courses),
        ]);
    }

    public function show(Course $course)
    {
        return response()->json([
            'data' => new CourseResource($course),
        ]);
    }

    public function store(CourseRequest $request)
    {
        $course = Course::create($request->validated());

        return response()->json([
            'data' => new CourseResource($course),
        ], 201);
    }

    public function update(CourseRequest $request, Course $course)
    {
        $course->update($request->validated());

        return response()->json([
            'data' => new CourseResource($course->fresh()),
        ]);
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return response()->json(null, 204);
    }
}
