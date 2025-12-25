<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('profs', function (Blueprint $table) {
            $table->id();
            $table->string('nom')->nullable();
            $table->string('email')->unique();
            $table->string('mot_de_passe');
            $table->string('telephone')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('profs');
    }
};
