<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserCrudRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * UserCrudRepository
 *
 * Eloquent implementation of the UserCrudRepositoryInterface.
 *
 * Responsible for all database operations related to users,
 * including retrieval, creation, updating, deletion, and pagination.
 */
class UserCrudRepository implements UserCrudRepositoryInterface
{
    /**
     * Retrieve a paginated list of users.
     *
     * @param  int  $perPage  Number of records per page.
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 10)
    {
        return User::paginate($perPage);
    }

    /**
     * Find a user by its identifier.
     *
     * @param  int  $id  User identifier.
     *
     * @throws ModelNotFoundException
     */
    public function findById(int $id): ?User
    {
        return User::findOrFail($id);
    }

    /**
     * Create a new user.
     *
     * @param  array<string, mixed>  $data  User attributes.
     */
    public function create(array $data): User
    {
        return User::create($data);
    }

    /**
     * Update an existing user.
     *
     * @param  int  $id  User identifier.
     * @param  array<string, mixed>  $data  Updated user attributes.
     *
     * @throws ModelNotFoundException
     */
    public function update(int $id, array $data): User
    {
        $user = $this->findById($id);

        $user->update($data);

        return $user;
    }

    /**
     * Delete a user.
     *
     * @param  int  $id  User identifier.
     * @return bool True if the user was deleted successfully.
     *
     * @throws ModelNotFoundException
     */
    public function delete(int $id): bool
    {
        $user = User::findOrFail($id);

        return $user->delete();
    }
}
