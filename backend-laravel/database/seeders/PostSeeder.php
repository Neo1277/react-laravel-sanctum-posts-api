<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\Category;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        Post::factory()->count(10)->create(
            [
                'category_id' => Category::factory()->create()->id
            ]
        );
    }
}