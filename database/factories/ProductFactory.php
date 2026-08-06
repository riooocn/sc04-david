<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $products = [
            'Apple MacBook Pro 14"', 'Sony PlayStation 5', 'Nike Air Max 270',
            'Samsung Galaxy S23 Ultra', 'Dell XPS 13', 'Bose QuietComfort 45',
            'Logitech G Pro X Superlight', 'Nintendo Switch OLED', 'Apple iPad Air',
            'LG UltraGear 27"', 'Canon EOS R5', 'Dyson V15 Detect',
            'Sony WH-1000XM5', 'Apple Watch Series 9', 'Google Pixel 8 Pro',
            'Razer Blade 15', 'Keychron Q1 Pro', 'Samsung 990 PRO 2TB',
            'Asus ROG Zephyrus G14', 'GoPro HERO12 Black'
        ];

        $title = fake()->randomElement($products) . ' ' . fake()->regexify('[A-Z0-9]{3,5}');

        return [
            'title' => $title,
            'description' => fake()->paragraph(3),
            'image_url' => 'https://picsum.photos/seed/' . fake()->uuid() . '/600/400',
            'price' => fake()->numberBetween(100, 30000) * 1000,
            'stock' => fake()->numberBetween(0, 100),
        ];
    }
}
