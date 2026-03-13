<?php

namespace App\Repositories;

use App\Repositories\Interfaces\PostRepositoryInterface;
use App\Models\Post;
use Illuminate\Database\Eloquent\Collection;

class PostRepository implements PostRepositoryInterface
{
    public function all(): Collection
    {
        return Post::all();
    }

    public function find(int $id): ?Post
    {
        return Post::find($id);
    }

    public function create(array $data): Post
    {
        return Post::create($data);
    }

    public function update(array $data, int $id): Post
    {
        $post = $this->find($id);
        $post->update($data);
        return $post;
    }

    public function delete(int $id): bool
    {
        return Post::destroy($id) > 0;
    }
}