<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => Category::factory(), // Create new category if not exists
            'title' => $title = $this->faker->sentence,
            'slug' => Str::slug($title),
            'short_text' => $this->faker->paragraph,
            'large_text' => $this->faker->text(1000),
        ];
    }
}
