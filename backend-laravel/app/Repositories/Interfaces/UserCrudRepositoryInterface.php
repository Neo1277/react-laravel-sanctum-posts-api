<?php

namespace App\Repositories\Interfaces;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

/**
 * UserCrudRepositoryInterface
 *
 * Defines the contract for user persistence operations.
 *
 * Implementations are responsible for interacting with the
 * underlying data source (e.g., Eloquent ORM).
 */
interface UserCrudRepositoryInterface
{
    /**
     * Retrieve a paginated list of users.
     *
     * @param  int  $perPage  Number of records per page.
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 10);

    /**
     * Find a user by its identifier.
     *
     * @param  int  $id  User identifier.
     * @return User|null Returns the user if found, otherwise null.
     */
    public function findById(int $id): ?User;

    /**
     * Create a new user.
     *
     * @param  array<string, mixed>  $data  User attributes.
     */
    public function create(array $data): User;

    /**
     * Update an existing user.
     *
     * @param  int  $id  User identifier.
     * @param  array<string, mixed>  $data  Updated user attributes.
     */
    public function update(int $id, array $data): User;

    /**
     * Delete a user.
     *
     * @param  int  $id  User identifier.
     * @return bool True if the user was deleted successfully.
     */
    public function delete(int $id): bool;
}
