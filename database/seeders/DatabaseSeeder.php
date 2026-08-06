<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);

        $categories = \App\Models\Category::factory(10)->create();
        
        \App\Models\Product::factory(50)->create()->each(function ($product) use ($categories) {
            // Attach 1 to 3 random categories to each product
            $product->categories()->attach(
                $categories->random(rand(1, 3))->pluck('id')->toArray()
            );

            // Create 0 to 5 reviews for each product
            \App\Models\Review::factory(rand(0, 5))->create([
                'product_id' => $product->id,
            ]);
        });
    }
}
