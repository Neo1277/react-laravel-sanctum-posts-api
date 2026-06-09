<?php

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {

        /**
         * Model Not Found
         */
        $exceptions->render(function (
            ModelNotFoundException $e,
            $request
        ) {

            Log::warning('Resource not found', [
                'url' => $request->fullUrl(),
                'method' => $request->method(),
                'exception' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Resource not found.',
            ], Response::HTTP_NOT_FOUND);
        });

        $exceptions->render(function (
            NotFoundHttpException $e,
            $request
        ) {

            Log::warning('Resource not found', [
                'url' => $request->fullUrl(),
                'method' => $request->method(),
                'exception' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Resource not found.',
            ], Response::HTTP_NOT_FOUND);
        });

        /**
         * Validation Errors
         */
        $exceptions->render(function (
            ValidationException $e,
            $request
        ) {

            Log::notice('Validation failed', [
                'url' => $request->fullUrl(),
                'errors' => $e->errors(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        });

        /**
         * Authentication Errors
         */
        $exceptions->render(function (
            AuthenticationException $e,
            $request
        ) {

            Log::warning('Unauthenticated access attempt', [
                'url' => $request->fullUrl(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated.',
            ], Response::HTTP_UNAUTHORIZED);
        });

        /**
         * Authorization Errors
         */
        $exceptions->render(function (
            AuthorizationException $e,
            $request
        ) {

            Log::warning('Unauthorized access attempt', [
                'url' => $request->fullUrl(),
                'exception' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to perform this action.',
            ], Response::HTTP_FORBIDDEN);
        });

        /**
         * Catch-All Exception Handler
         */
        $exceptions->render(function (
            Throwable $e,
            $request
        ) {

            Log::error('Unhandled exception', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'url' => $request->fullUrl(),
                'method' => $request->method(),
            ]);

            if (config('app.debug')) {
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            return response()->json([
                'success' => false,
                'message' => 'Internal Server Error.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        });
    })->create();
