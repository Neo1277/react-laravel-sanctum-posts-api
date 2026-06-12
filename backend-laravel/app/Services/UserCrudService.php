<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\Interfaces\UserCrudRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Hash;

/**
 * UserCrudService
 *
 * Handles user management business logic.
 *
 * Responsibilities:
 * - Retrieve paginated users
 * - Retrieve individual users
 * - Create users
 * - Update users
 * - Delete users
 * - Manage user roles
 * - Hash passwords before persistence
 */
class UserCrudService
{
    /**
     * User repository instance.
     */
    protected UserCrudRepositoryInterface $userRepo;

    /**
     * Create a new service instance.
     *
     * @param  UserCrudRepositoryInterface  $userRepo  User repository implementation.
     */
    public function __construct(UserCrudRepositoryInterface $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    /**
     * Retrieve a paginated list of users.
     *
     * @param  int  $perPage  Number of records per page.
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 10)
    {
        return $this->userRepo->paginate($perPage);
    }

    /**
     * Retrieve a user by its identifier.
     *
     * @param  int  $id  User identifier.
     * @return User
     *
     * @throws ModelNotFoundException
     */
    public function getUserById(int $id)
    {
        return $this->userRepo->findById($id);
    }

    /**
     * Create a new user.
     *
     * Hashes the password before persisting the user and
     * assigns a role if one is provided.
     *
     * @param  array<string, mixed>  $data  User data.
     * @return User
     */
    public function createUser(array $data)
    {
        $data['password'] = Hash::make($data['password']);

        $user = $this->userRepo->create($data);

        if (isset($data['role'])) {
            $user->assignRole($data['role']);
        }

        return $user;
    }

    /**
     * Update an existing user.
     *
     * Hashes the password if provided and synchronizes
     * the user's role when supplied.
     *
     * @param  int  $id  User identifier.
     * @param  array<string, mixed>  $data  Updated user data.
     * @return User
     *
     * @throws ModelNotFoundException
     */
    public function updateUser(int $id, array $data)
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user = $this->userRepo->update($id, $data);

        if (isset($data['role'])) {
            $user->syncRoles([$data['role']]);
        }

        return $user;
    }

    /**
     * Delete a user.
     *
     * Prevents users from deleting their own account.
     *
     * @param  int  $id  User identifier to delete.
     * @param  int  $currentUserId  Authenticated user identifier.
     * @return bool
     *
     * @throws \Exception
     * @throws ModelNotFoundException
     */
    public function deleteUser(int $id, $currentUserId)
    {
        if ($id == $currentUserId) {
            throw new \Exception('You cannot delete your own account.');
        }

        $deleted = $this->userRepo->delete($id);

        if (! $deleted) {
            throw new ModelNotFoundException(
                'User not found.'
            );
        }

        return true;
    }
}
