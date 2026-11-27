<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $postId = $this->route('id');

        return [
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'slug' => 'required|string|max:255|unique:posts,slug,' . $postId,
            'short_text' => 'required|string',
            'large_text' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'remove_image' => 'nullable|boolean',
        ];
    }

}
