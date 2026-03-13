<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthService;

class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request)
    {
        $request->validate([
            'name'=>'required',
            'email'=>'required|email|unique:users',
            'password'=>'required|min:6',
            'phone_number'=>'required'
        ]);

        $result = $this->authService->register($request->all());

        return response()->json($result, 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'=>'required|email',
            'password'=>'required'
        ]);

        $result = $this->authService->login($request->all());

        if (!$result) {
            return response()->json(['message'=>'Invalid credentials'], 401);
        }

        return response()->json($result);
    }

    public function logout(Request $request)
    {
        $result = $this->authService->logout($request->user());
        return response()->json($result);
    }
}