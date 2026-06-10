<?php

namespace App\Repositories;

use App\Models\Post;
use App\Repositories\Interfaces\PostRepositoryInterface;

class PostRepository implements PostRepositoryInterface
{
    public function paginate(int $perPage = 10)
    {
        return Post::paginate($perPage);
    }

    public function find(int $id): ?Post
    {
        return Post::find($id);
    }

    public function findOrFail(int $id): Post
    {
        return Post::findOrFail($id);
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
        $post = Post::findOrFail($id);

        return $post->delete();
    }
}
