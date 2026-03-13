<?php

namespace App\Repositories;

use App\Repositories\Interfaces\UserCrudRepositoryInterface;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UserCrudRepository implements UserCrudRepositoryInterface
{
    public function all()
    {
        return User::all();
    }

    public function findById(int $id): ?User
    {
        return User::find($id);
    }

    public function create(array $data): User
    {
        return User::create($data);
    }

    public function update(int $id, array $data): User
    {
        $user = $this->findById($id);
        $user->update($data);
        return $user;
    }

    public function delete(int $id): bool
    {
        return User::destroy($id) > 0;
    }
}