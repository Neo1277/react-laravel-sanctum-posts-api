<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;

/**
 * UserRepository
 *
 * Eloquent implementation of the UserRepositoryInterface.
 *
 * Responsible for authentication-related user persistence
 * operations such as retrieving users by email, creating
 * new users, and finding users by their identifier.
 */
class UserRepository implements UserRepositoryInterface
{
    /**
     * Find a user by email address.
     *
     * @param  string  $email  User email address.
     * @return User|null Returns the user if found, otherwise null.
     */
    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
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
     * Find a user by its identifier.
     *
     * @param  int  $id  User identifier.
     * @return User|null Returns the user if found, otherwise null.
     */
    public function findById(int $id): ?User
    {
        return User::find($id);
    }
}
