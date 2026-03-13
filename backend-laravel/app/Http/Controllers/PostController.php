<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{

    public function index(Request $request)
    {
        $posts = Post::when($request->category_id, function ($q) use ($request) {
            $q->where('category_id',$request->category_id);
        })->get();

        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'=>'required',
            'category_id'=>'required',
            'short_text'=>'required',
            'large_text'=>'required'
        ]);

        $post = Post::create([
            'title'=>$request->title,
            'slug'=>Str::slug($request->title),
            'category_id'=>$request->category_id,
            'short_text'=>$request->short_text,
            'large_text'=>$request->large_text
        ]);

        return response()->json($post);
    }

    public function show($id)
    {
        return Post::findOrFail($id);
    }

    public function update(Request $request,$id)
    {
        $post = Post::findOrFail($id);

        $post->update($request->all());

        return response()->json($post);
    }

    public function destroy($id)
    {
        Post::destroy($id);

        return response()->json(['message'=>'Deleted']);
    }

}