<?php

namespace App\Repositories\Interfaces;

use App\Models\Post;

interface PostRepositoryInterface
{
    public function paginate(int $perPage = 10);

    public function find(int $id): ?Post;

    public function create(array $data): Post;

    public function update(array $data, int $id): Post;

    public function delete(int $id): bool;
}
