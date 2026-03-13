<?php

namespace App\Services;

use App\Repositories\Interfaces\UserCrudRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class UserCrudService
{
    protected UserCrudRepositoryInterface $userRepo;

    public function __construct(UserCrudRepositoryInterface $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    public function getAllUsers()
    {
        return $this->userRepo->all();
    }

    public function getUserById(int $id)
    {
        return $this->userRepo->findById($id);
    }

    public function createUser(array $data)
    {
        $data['password'] = Hash::make($data['password']);
        $user = $this->userRepo->create($data);

        if (isset($data['role'])) {
            $user->assignRole($data['role']);
        }

        return $user;
    }

    public function updateUser(int $id, array $data)
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user = $this->userRepo->update($id, $data);

        if (isset($data['role'])) {
            $user->syncRoles([$data['role']]);
        }

        return $user;
    }

    public function deleteUser(int $id, $currentUserId)
    {
        if ($id == $currentUserId) {
            throw new \Exception("You cannot delete your own account.");
        }

        return $this->userRepo->delete($id);
    }
}