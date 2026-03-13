<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserCrudService;

class UserController extends Controller
{
    protected UserCrudService $userService;

    public function __construct(UserCrudService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        return response()->json($this->userService->getAllUsers());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required',
            'email'=>'required|email|unique:users',
            'password'=>'required|min:6',
            'phone_number'=>'required',
            'role'=>'required'
        ]);

        $user = $this->userService->createUser($request->all());

        return response()->json(['message'=>'User created','user'=>$user], 201);
    }

    public function show($id)
    {
        $user = $this->userService->getUserById($id);
        if (!$user) return response()->json(['message'=>'User not found'], 404);
        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $user = $this->userService->updateUser($id, $request->all());
        return response()->json(['message'=>'User updated','user'=>$user]);
    }

    public function destroy(Request $request, $id)
    {
        try {
            $this->userService->deleteUser($id, $request->user()->id);
            return response()->json(['message'=>'User deleted']);
        } catch (\Exception $e) {
            return response()->json(['message'=>$e->getMessage()], 403);
        }
    }
}