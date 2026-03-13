<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Interfaces\PostServiceInterface;

class PostController extends Controller
{
    protected PostServiceInterface $postService;

    public function __construct(PostServiceInterface $postService)
    {
        $this->postService = $postService;
    }

    public function index()
    {
        return response()->json($this->postService->all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'=>'required',
            'category_id'=>'required',
            'short_text'=>'required',
            'large_text'=>'required'
        ]);

        $post = $this->postService->create((array)$request->all());

        return response()->json($post, 201);
    }

    public function show($id)
    {
        return response()->json($this->postService->find($id));
    }

    public function update(Request $request, $id)
    {
        $post = $this->postService->update((array)$request->all(), $id);
        return response()->json($post);
    }

    public function destroy($id)
    {
        $this->postService->delete($id);
        return response()->json(['message'=>'Deleted']);
    }
}