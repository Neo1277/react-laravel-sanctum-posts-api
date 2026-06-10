<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Resources\PostResource;
use App\Services\Interfaces\PostServiceInterface;
use Illuminate\Http\Response;

/**
 * PostController
 *
 * Handles CRUD operations for blog posts.
 *
 * Responsibilities:
 * - List paginated posts
 * - Create new posts
 * - Retrieve a single post
 * - Update existing posts
 * - Delete posts and their associated resources
 *
 * Uses PostServiceInterface to delegate business logic.
 */
class PostController extends Controller
{
    /**
     * Post service instance.
     *
     * @var PostServiceInterface
     */    
    protected PostServiceInterface $postService;

    /**
     * Create a new controller instance.
     *
     * @param PostServiceInterface $postService Service responsible for post operations.
     */    
    public function __construct(PostServiceInterface $postService)
    {
        $this->postService = $postService;
    }

    /**
     * Display a paginated listing of posts.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */    
    public function index()
    {
        $posts = $this->postService
            ->paginate(10)
            ->withQueryString();

        return PostResource::collection($posts);
    }

    /**
     * Store a newly created post.
     *
     * @param StorePostRequest $request Validated post creation request.
     * @return \Illuminate\Http\JsonResponse
     */    
    public function store(StorePostRequest $request)
    {
        $post = $this->postService->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Post registered successfully.',
            'data' => [
                'post' => new PostResource($post),
            ],
        ])->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * Display the specified post.
     *
     * @param int $id Post identifier.
     * @return \Illuminate\Http\JsonResponse
     */    
    public function show($id)
    {
        $post = $this->postService->find($id);

        return response()->json([
            'data' => [
                'post' => new PostResource($post),
            ],
        ]);
    }

    /**
     * Update the specified post.
     *
     * @param StorePostRequest $request Validated post update request.
     * @param int $id Post identifier.
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(StorePostRequest $request, $id)
    {
        $post = $this->postService->update($request->validated(), $id);

        return response()->json([
            'success' => true,
            'message' => 'Post updated successfully.',
            'data' => [
                'post' => new PostResource($post),
            ],
        ]);
    }

    /**
     * Remove the specified post.
     *
     * Deletes the post and any associated image if present.
     *
     * @param int $id Post identifier.
     * @return \Illuminate\Http\JsonResponse
     */    
    public function destroy($id)
    {
        $this->postService->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Post deleted successfully.',
        ]);
    }
}
