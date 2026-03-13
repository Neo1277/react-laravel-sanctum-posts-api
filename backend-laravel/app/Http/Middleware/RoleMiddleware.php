<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

/**
 * RoleMiddleware
 *
 * Checks if the authenticated user has the required role.
 * If the user does not have the specified role, it returns a 403 JSON response.
 *
 * Usage in routes:
 * Route::middleware([RoleMiddleware::class.':admin'])->group(...);
 *
 * @package App\Http\Middleware
 */
class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request The incoming HTTP request.
     * @param  \Closure  $next The next middleware/controller to call.
     * @param  string  $role The role required to access the route.
     * @return mixed Returns the next middleware/controller if authorized,
     *               otherwise returns a JSON response with 403 status.
     */
    public function handle(Request $request, Closure $next, $role)
    {
        $user = $request->user();

        if (!$user || !$user->hasRole($role)) {
            return response()->json([
                'message' => 'Unauthorized. Role ' . $role . ' required.'
            ], 403);
        }

        return $next($request);
    }
}