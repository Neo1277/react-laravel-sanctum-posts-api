<?php

namespace App\Repositories\Interfaces;

use App\Models\User;

/**
 * UserRepositoryInterface
 *
 * Defines the contract for authentication-related user
 * persistence operations.
 *
 * Implementations are responsible for retrieving and creating
 * users from the underlying data source.
 */
interface UserRepositoryInterface
{
    /**
     * Find a user by email address.
     *
     * @param  string  $email  User email address.
     * @return User|null Returns the user if found, otherwise null.
     */
    public function findByEmail(string $email): ?User;

    /**
     * Create a new user.
     *
     * @param  array<string, mixed>  $data  User attributes.
     */
    public function create(array $data): User;

    /**
     * Find a user by its identifier.
     *
     * @param  int  $id  User identifier.
     * @return User|null Returns the user if found, otherwise null.
     */
    public function findById(int $id): ?User;
}
