<?php

namespace App\Http\Controllers;

use App\Http\Requests\LessonRequest;
use App\Http\Resources\LessonResource;
use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Course $course)
    {
        $lessons = $course->lessons()->orderBy('order')->get();

        return response()->json([
            'data' => LessonResource::collection($lessons),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LessonRequest $request, Course $course)
    {
        $lesson = $course->lessons()->create($request->validated());

        return response()->json([
            'data' => new LessonResource($lesson),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Lesson $lesson)
    {
        return response()->json([
            'data' => new LessonResource($lesson),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LessonRequest $request, Lesson $lesson)
    {
        $lesson->update($request->validated());

        return response()->json([
            'data' => new LessonResource($lesson->fresh()),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lesson $lesson)
    {
        $lesson->delete();

        return response()->json(null, 204);
    }
}
