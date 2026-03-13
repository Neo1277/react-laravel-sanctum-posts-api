<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $request->validate([
            'name'=>'required',
            'email'=>'required|email|unique:users',
            'password'=>'required|min:6',
            'phone_number'=>'required'
        ]);

        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>bcrypt($request->password),
            'phone_number'=>$request->phone_number
        ]);

        $user->assignRole('user');

        return response()->json($user);
    }

    public function login(Request $request)
    {

        $user = User::where('email',$request->email)->first();

        if(!$user || !Hash::check($request->password,$user->password)){
            return response()->json(['message'=>'Invalid credentials'],401);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'token'=>$token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone_number' => $user->phone_number,
                'roles' => $user->getRoleNames(), // Returns a collection of roles
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message'=>'Logged out']);
    }

}