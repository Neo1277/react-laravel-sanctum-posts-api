<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;

/**
 * AuthService
 *
 * Handles authentication and user registration business logic.
 *
 * Responsibilities:
 * - Register new users
 * - Authenticate existing users
 * - Generate Sanctum API tokens
 * - Revoke user tokens during logout
 */
class AuthService
{
    /**
     * User repository instance.
     */
    protected UserRepositoryInterface $userRepo;

    /**
     * Create a new service instance.
     *
     * @param  UserRepositoryInterface  $userRepo  User repository implementation.
     */
    public function __construct(UserRepositoryInterface $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    /**
     * Register a new user.
     *
     * Hashes the password, creates the user, assigns the default
     * "user" role, and generates an API token.
     *
     * @param  array<string, mixed>  $data  User registration data.
     * @return array{
     *     token: string,
     *     user: User
     * }
     */
    public function register(array $data)
    {
        $data['password'] = Hash::make($data['password']);

        $user = $this->userRepo->create($data);
        $user->assignRole('user');

        $token = $user->createToken('api-token')->plainTextToken;

        return [
            'token' => $token,
            'user' => $user,
        ];
    }

    /**
     * Authenticate a user.
     *
     * Validates credentials and generates a new API token.
     *
     * @param  array<string, mixed>  $data  Login credentials.
     * @return array{
     *     token: string,
     *     user: User
     * }|null
     */
    public function login(array $data)
    {
        $user = $this->userRepo->findByEmail($data['email']);

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            return null;
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return [
            'token' => $token,
            'user' => $user,
        ];
    }

    /**
     * Log out the authenticated user.
     *
     * Revokes all active Sanctum tokens for the user.
     *
     * @param  User  $user  Authenticated user.
     * @return array{message: string}
     */
    public function logout($user)
    {
        $user->tokens()->delete();

        return [
            'message' => 'Logged out',
        ];
    }
}
