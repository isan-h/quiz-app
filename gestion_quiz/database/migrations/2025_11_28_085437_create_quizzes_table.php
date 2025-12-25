<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->unsignedInteger('duree')->default(10); // minutes
            $table->string('groupe_cible')->nullable();
            $table->unsignedBigInteger('prof_id')->nullable();
            $table->unsignedBigInteger('module_id')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->foreign('prof_id')->references('id')->on('profs')->onDelete('set null');
            $table->foreign('module_id')->references('id')->on('modules')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('quizzes');
    }
};
