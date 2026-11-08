<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreAuthUserRequest;
use App\Http\Resources\AuthUserResource;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * AuthController
 *
 * Handles user authentication operations including:
 * - User registration
 * - User login
 * - Retrieving the authenticated user
 * - User logout
 *
 * Uses Laravel Sanctum SPA authentication with session cookies.
 */
class AuthController extends Controller
{
    /**
     * Authentication service instance.
     */
    protected AuthService $authService;

    /**
     * Create a new controller instance.
     */
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Register a new user and start an authenticated session.
     */
    public function register(StoreAuthUserRequest $request): JsonResponse
    {
        $user = $this->authService->register($request->validated());

        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully.',
            'data' => [
                'user' => new AuthUserResource($user),
            ],
        ], Response::HTTP_CREATED);
    }

    /**
     * Authenticate a user and start an authenticated session.
     */
    public function login(LoginUserRequest $request): JsonResponse
    {
        $user = $this->authService->login($request->validated());

        if (! $user) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'message' => 'User logged in successfully.',
            'data' => [
                'user' => new AuthUserResource($user),
            ],
        ]);
    }

    /**
     * Retrieve the currently authenticated user.
     */
    public function user(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'user' => new AuthUserResource($request->user()),
            ],
        ]);
    }

    /**
     * Log out the authenticated user and invalidate the session.
     */
    public function logout(Request $request): JsonResponse
    {
        $this->authService->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully.',
        ]);
    }
}
