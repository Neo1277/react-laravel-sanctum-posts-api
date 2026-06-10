<?php

namespace App\Services;

use App\Repositories\Interfaces\PostRepositoryInterface;
use App\Services\Interfaces\PostServiceInterface;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostService implements PostServiceInterface
{
    protected PostRepositoryInterface $postRepository;

    public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function paginate(int $perPage = 10)
    {
        return $this->postRepository->paginate($perPage);
    }

    public function find(int $id)
    {
        return $this->postRepository->find($id);
    }

    public function create(array $data)
    {
        if (isset($data['image'])) {

            $filename = Str::uuid().'.'.
                $data['image']->getClientOriginalExtension();

            $path = $data['image']->storeAs(
                'posts',
                $filename,
                'public'
            );

            $data['image'] = $path;
        }

        return $this->postRepository->create($data);
    }

    public function update(array $data, int $id)
    {
        $post = $this->postRepository->find($id);

        if (isset($data['image'])) {

            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }

            $data['image'] = $data['image']->store(
                'posts',
                'public'
            );
        }

        return $this->postRepository->update($data, $id);
    }

    public function delete(int $id): bool
    {
        $post = $this->postRepository->findOrFail($id);

        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }

        return $this->postRepository->delete($id);
    }
    
}
