<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreAuthUserRequest;
use App\Http\Resources\AuthUserResource;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * AuthController
 *
 * Handles user authentication operations including:
 * - User registration
 * - User login
 * - User logout
 *
 * Uses Sanctum tokens for API authentication.
 */
class AuthController extends Controller
{
    /**
     * Authentication service instance.
     *
     * @var AuthService
     */    
    protected AuthService $authService;

    /**
     * Create a new controller instance.
     *
     * @param AuthService $authService Service responsible for authentication logic.
     */    
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Register a new user and generate an API token.
     *
     * @param StoreAuthUserRequest $request Validated registration request.
     * @return \Illuminate\Http\JsonResponse
     */    
    public function register(StoreAuthUserRequest $request)
    {
        $result = $this->authService->register($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully.',
            'data' => [
                'token' => $result['token'],
                'user' => new AuthUserResource($result['user']),
            ],
        ])->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * Authenticate a user and generate an API token.
     *
     * @param LoginUserRequest $request Validated login request.
     * @return \Illuminate\Http\JsonResponse
     */    
    public function login(LoginUserRequest $request)
    {
        $result = $this->authService->login($request->validated());

        if (! $result) {
            return response()->json(['message' => 'Invalid credentials'])
                ->setStatusCode(Response::HTTP_UNAUTHORIZED);
        }

        return response()->json([
            'success' => true,
            'message' => 'User Logged in successfully.',
            'data' => [
                'token' => $result['token'],
                'user' => new AuthUserResource($result['user']),
            ],
        ]);
    }

    /**
     * Revoke all tokens for the authenticated user.
     *
     * Logs the user out from all active sessions.
     *
     * @param Request $request Current authenticated request.
     * @return \Illuminate\Http\JsonResponse
     */    
    public function logout(Request $request)
    {
        $result = $this->authService->logout($request->user());

        return response()->json($result);
    }
}
