<?php

namespace App\Repositories\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use App\Models\Post;

interface PostRepositoryInterface
{
    public function all();

    public function find(int $id): ?Post;

    public function create(array $data): Post;

    public function update(array $data, int $id): Post;

    public function delete(int $id): bool;
}