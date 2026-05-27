<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        Post::factory()->count(10)->create(
            [
                'category_id' => Category::factory()->create()->id,
            ]
        );
    }
}
