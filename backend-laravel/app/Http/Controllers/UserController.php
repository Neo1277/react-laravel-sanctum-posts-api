<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index()
    {
        return response()->json(User::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'phone_number' => 'required',
            'role' => 'required'
        ]);

        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>bcrypt($request->password),
            'phone_number'=>$request->phone_number
        ]);

        $user->assignRole($request->role);

        return response()->json([
            'message'=>'User created successfully',
            'user'=>$user
        ]);
    }

    public function show($id)
    {
        return response()->json(User::findOrFail($id));
    }

    public function update(Request $request,$id)
    {
        $user = User::findOrFail($id);

        $user->update($request->only([
            'name',
            'email',
            'phone_number'
        ]));

        if($request->role){
            $user->syncRoles([$request->role]);
        }

        return response()->json([
            'message'=>'User updated',
            'user'=>$user
        ]);
    }

    public function destroy(Request $request, $id)
    {
        if($request->user()->id == $id){
            return response()->json([
                'message' => 'You cannot delete your own account'
            ], 403);
        }

        User::destroy($id);

        return response()->json([
            'message' => 'User deleted'
        ]);
    }

}