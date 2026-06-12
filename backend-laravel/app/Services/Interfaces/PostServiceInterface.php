<?php

namespace App\Services\Interfaces;

use App\Models\Post;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * PostServiceInterface
 *
 * Defines the contract for post business operations.
 *
 * Implementations are responsible for handling application
 * logic related to posts, including pagination, retrieval,
 * creation, updating, and deletion.
 */
interface PostServiceInterface
{
    /**
     * Retrieve a paginated list of posts.
     *
     * @param  int  $perPage  Number of records per page.
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 10);

    /**
     * Retrieve a post by its identifier.
     *
     * @param  int  $id  Post identifier.
     * @return Post
     *
     * @throws ModelNotFoundException
     */
    public function find(int $id);

    /**
     * Create a new post.
     *
     * @param  array<string, mixed>  $data  Post data.
     * @return Post
     */
    public function create(array $data);

    /**
     * Update an existing post.
     *
     * @param  array<string, mixed>  $data  Updated post data.
     * @param  int  $id  Post identifier.
     * @return Post
     *
     * @throws ModelNotFoundException
     */
    public function update(array $data, int $id);

    /**
     * Delete a post.
     *
     * Removes the post and any associated image if present.
     *
     * @param  int  $id  Post identifier.
     * @return bool True if the post was deleted successfully.
     *
     * @throws ModelNotFoundException
     */
    public function delete(int $id);
}
