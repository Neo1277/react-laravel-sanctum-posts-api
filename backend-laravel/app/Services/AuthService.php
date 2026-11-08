
<?php

namespace App\Services;

use App\Events\UserRegistered;
use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

/**
 * AuthService
 *
 * Handles authentication and user registration business logic.
 *
 * Responsibilities:
 * - Register new users
 * - Authenticate existing users
 * - Manage authenticated user sessions
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
     * @param UserRepositoryInterface $userRepo
     */
    public function __construct(UserRepositoryInterface $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    /**
     * Register a new user.
     *
     * Hashes the password, creates the user, assigns the default
     * "user" role, dispatches the registration event and logs in the user.
     *
     * @param array<string, mixed> $data
     * @return User
     */
    public function register(array $data): User
    {
        $data['password'] = Hash::make($data['password']);

        $user = $this->userRepo->create($data);

        $user->assignRole('user');

        UserRegistered::dispatch($user);

        Auth::guard('web')->login($user);

        return $user;
    }

    /**
     * Authenticate a user.
     *
     * Validates the credentials and starts an authenticated session.
     *
     * @param array<string, mixed> $data
     * @return User|null
     */
    public function login(array $data): ?User
    {
        $user = $this->userRepo->findByEmail($data['email']);

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            return null;
        }

        Auth::guard('web')->login($user);

        return $user;
    }

    /**
     * Log out the authenticated user.
     *
     * @return void
     */
    public function logout(): void
    {
        Auth::guard('web')->logout();
    }
}
