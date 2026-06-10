<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCrudResource;
use App\Services\UserCrudService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * UserController
 *
 * Handles user management operations.
 *
 * Responsibilities:
 * - List users
 * - Create users
 * - Retrieve a specific user
 * - Update user information
 * - Delete users
 *
 * Access to these endpoints is typically restricted to administrators.
 */
class UserController extends Controller
{
    /**
     * User service instance.
     */    
    protected UserCrudService $userService;

    /**
     * Create a new controller instance.
     *
     * @param UserCrudService $userService Service responsible for user management.
     */    
    public function __construct(UserCrudService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Display a paginated listing of users.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */    
    public function index()
    {
        $posts = $this->userService
            ->paginate(10)
            ->withQueryString();

        return UserCrudResource::collection($posts);
    }

    /**
     * Store a newly created user.
     *
     * Creates the user, hashes the password, and assigns the selected role.
     *
     * @param StoreUserRequest $request Validated user creation request.
     * @return \Illuminate\Http\JsonResponse
     */    
    public function store(StoreUserRequest $request)
    {
        $user = $this->userService->createUser($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'User created.',
            'data' => [
                'user' => new UserCrudResource($user),
            ],
        ])->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * Display the specified user.
     *
     * @param int $id User identifier.
     * @return \Illuminate\Http\JsonResponse
     */    
    public function show($id)
    {
        $user = $this->userService->getUserById($id);
        if (! $user) {
            return response()->json(['message' => 'User not found'])
                ->setStatusCode(Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'data' => [
                'user' => new UserCrudResource($user),
            ],
        ]);
    }

    /**
     * Update the specified user.
     *
     * Updates user information and synchronizes roles when provided.
     *
     * @param UpdateUserRequest $request Validated user update request.
     * @param int $id User identifier.
     * @return \Illuminate\Http\JsonResponse
     */    
    public function update(UpdateUserRequest $request, $id)
    {
        $user = $this->userService->updateUser($id, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'User updated.',
            'data' => [
                'user' => new UserCrudResource($user),
            ],
        ]);
    }

    /**
     * Remove the specified user.
     *
     * Prevents administrators from deleting their own account.
     *
     * @param Request $request Current authenticated request.
     * @param int $id User identifier.
     * @return \Illuminate\Http\JsonResponse
     */    
    public function destroy(Request $request, $id)
    {
        $this->userService->deleteUser($id, $request->user()->id);

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully.',
        ]);
    }
}
