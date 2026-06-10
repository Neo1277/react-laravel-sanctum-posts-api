<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Post Model
 *
 * Represents a blog post.
 *
 * @property int $id
 * @property int $category_id
 * @property string $title
 * @property string $slug
 * @property string $short_text
 * @property string $large_text
 * @property string|null $image
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @property-read Category $category
 */
class Post extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */    
    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'short_text',
        'large_text',
        'image',
    ];

    /**
     * Get the category that owns the post.
     *
     * @return BelongsTo<Category, Post>
     */    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
