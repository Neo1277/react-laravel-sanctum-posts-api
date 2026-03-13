<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

use App\Http\Middleware\RoleMiddleware;

Route::post('register', [AuthController::class,'register']);
Route::post('login', [AuthController::class,'login']);

Route::middleware('auth:sanctum')->group(function(){

    Route::post('logout', [AuthController::class,'logout']);

    // USERS CAN VIEW POSTS
    Route::get('posts' ,[PostController::class,'index']);
    Route::get('posts/{id}', [PostController::class,'show']);

    // ADMIN ONLY
    Route::middleware(['auth:sanctum', RoleMiddleware::class.':admin'])->group(function () {
        Route::post('posts', [PostController::class,'store']);
        Route::put('posts/{id}', [PostController::class,'update']);
        Route::delete('posts/{id}', [PostController::class,'destroy']);
        
        Route::apiResource('users', UserController::class);
    });

});