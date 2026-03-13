<?php

namespace App\Services;

use App\Repositories\Interfaces\PostRepositoryInterface;
use App\Services\Interfaces\PostServiceInterface;

class PostService implements PostServiceInterface
{
    protected PostRepositoryInterface $postRepository;

    public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function all()
    {
        return $this->postRepository->all();
    }

    public function find(int $id)
    {
        return $this->postRepository->find($id);
    }

    public function create(array $data)
    {
        return $this->postRepository->create($data);
    }

    public function update(array $data, int $id)
    {
        return $this->postRepository->update($data, $id);
    }

    public function delete(int $id)
    {
        return $this->postRepository->delete($id);
    }
}