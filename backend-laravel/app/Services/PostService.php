<?php

namespace App\Services;

use App\Models\Post;
use App\Repositories\Interfaces\PostRepositoryInterface;
use App\Services\Interfaces\PostServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * PostService
 *
 * Handles post business logic.
 *
 * Responsibilities:
 * - Retrieve paginated posts
 * - Retrieve individual posts
 * - Create posts
 * - Update posts
 * - Delete posts
 * - Manage image uploads and file cleanup
 */
class PostService implements PostServiceInterface
{
    /**
     * Post repository instance.
     */
    protected PostRepositoryInterface $postRepository;

    /**
     * Create a new service instance.
     *
     * @param  PostRepositoryInterface  $postRepository  Post repository implementation.
     */
    public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    /**
     * Retrieve a paginated list of posts.
     *
     * @param  int  $perPage  Number of records per page.
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 10)
    {
        return $this->postRepository->paginate($perPage);
    }

    /**
     * Retrieve a post by its identifier.
     *
     * @param  int  $id  Post identifier.
     * @return Post|null
     */
    public function find(int $id)
    {
        return $this->postRepository->find($id);
    }

    /**
     * Create a new post.
     *
     * If an image is provided, it is stored in the public disk
     * under the posts directory and the image path is saved.
     *
     * @param  array<string, mixed>  $data  Post data.
     * @return Post
     */
    public function create(array $data)
    {
        if (isset($data['image'])) {

            $filename = Str::uuid().'.'.
                $data['image']->getClientOriginalExtension();

            $path = $data['image']->storeAs(
                'posts',
                $filename,
                'public'
            );

            $data['image'] = $path;
        }

        return $this->postRepository->create($data);
    }

    /**
     * Update an existing post.
     *
     * If a new image is provided, the old image is removed
     * before storing the new one.
     *
     * @param  array<string, mixed>  $data  Updated post data.
     * @param  int  $id  Post identifier.
     * @return Post
     */
    public function update(array $data, int $id)
    {
        $post = $this->postRepository->find($id);

        if (isset($data['image'])) {

            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }

            $data['image'] = $data['image']->store(
                'posts',
                'public'
            );
        }

        return $this->postRepository->update($data, $id);
    }

    /**
     * Delete a post.
     *
     * Removes the associated image from storage before
     * deleting the database record.
     *
     * @param  int  $id  Post identifier.
     * @return bool True if the post was deleted successfully.
     *
     * @throws ModelNotFoundException
     */
    public function delete(int $id): bool
    {
        $post = $this->postRepository->findOrFail($id);

        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }

        return $this->postRepository->delete($id);
    }
}
