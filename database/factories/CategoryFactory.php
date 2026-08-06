<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Electronics', 'Laptops', 'Smartphones', 'Audio', 
            'Gaming', 'Cameras', 'Smart Home', 'Wearables', 
            'Accessories', 'Networking'
        ];

        return [
            'name' => $name = fake()->unique()->randomElement($categories),
            'slug' => str()->slug($name),
        ];
    }
}
