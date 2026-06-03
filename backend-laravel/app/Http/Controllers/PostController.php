<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Resources\PostResource;
use App\Services\Interfaces\PostServiceInterface;
use Illuminate\Http\Response;

class PostController extends Controller
{
    protected PostServiceInterface $postService;

    public function __construct(PostServiceInterface $postService)
    {
        $this->postService = $postService;
    }

    public function index()
    {
        $posts = $this->postService
            ->paginate(10)
            ->withQueryString();

        return PostResource::collection($posts);
    }

    public function store(StorePostRequest $request)
    {
        $post = $this->postService->create((array) $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Post registered successfully.',
            'data' => [
                'post' => new PostResource($post),
            ],
        ])->setStatusCode(Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $post = $this->postService->find($id);

        return response()->json([
            'data' => [
                'post' => new PostResource($post),
            ],
        ]);
    }

    public function update(StorePostRequest $request, $id)
    {
        $post = $this->postService->update((array) $request->validated(), $id);

        return response()->json([
            'success' => true,
            'message' => 'Post updated successfully.',
            'data' => [
                'post' => new PostResource($post),
            ],
        ]);
    }

    public function destroy($id)
    {
        $this->postService->delete($id);

        return response()->json(['message' => 'Deleted']);
    }
}
