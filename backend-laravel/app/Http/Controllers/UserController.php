<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCrudResource;
use App\Services\UserCrudService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    protected UserCrudService $userService;

    public function __construct(UserCrudService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        $posts = $this->userService
            ->paginate(10)
            ->withQueryString();

        return UserCrudResource::collection($posts);
    }

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

    public function destroy(Request $request, $id)
    {
        try {
            $this->userService->deleteUser($id, $request->user()->id);

            return response()->json(['message' => 'User deleted']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 403);
        }
    }
}
