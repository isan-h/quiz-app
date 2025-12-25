<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profs>
 */
class ProfsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'mot_de_passe' => Hash::make(fake()->password()),
            'telephone' => fake()->phoneNumber(),
        ];
    }
}
