<?php

namespace App\Services\Interfaces;

interface PostServiceInterface
{
    public function paginate(int $perPage = 10);

    public function find(int $id);

    public function create(array $data);

    public function update(array $data, int $id);

    public function delete(int $id);
}
