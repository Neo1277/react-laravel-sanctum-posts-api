<?php

namespace App\Repositories\Interfaces;

use App\Models\Post;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * PostRepositoryInterface
 *
 * Defines the contract for Post data persistence operations.
 *
 * Implementations are responsible for interacting with the
 * underlying data source (e.g., Eloquent ORM).
 */
interface PostRepositoryInterface
{
    /**
     * Retrieve a paginated list of posts.
     *
     * @param  int  $perPage  Number of records per page.
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 10);

    /**
     * Find a post by its identifier.
     *
     * @param  int  $id  Post identifier.
     * @return Post|null Returns the post if found, otherwise null.
     */
    public function find(int $id): ?Post;

    /**
     * Find a post by its identifier or fail.
     *
     * @param  int  $id  Post identifier.
     * @return Post
     *
     * @throws ModelNotFoundException
     */
    public function findOrFail(int $id);

    /**
     * Create a new post.
     *
     * @param  array<string, mixed>  $data  Post attributes.
     */
    public function create(array $data): Post;

    /**
     * Update an existing post.
     *
     * @param  array<string, mixed>  $data  Updated post attributes.
     * @param  int  $id  Post identifier.
     */
    public function update(array $data, int $id): Post;

    /**
     * Delete a post.
     *
     * @param  int  $id  Post identifier.
     * @return bool True if the post was deleted successfully.
     *
     * @throws ModelNotFoundException
     */
    public function delete(int $id): bool;
}
