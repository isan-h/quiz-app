<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\ProfController;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/Etudiant', [EtudiantController::class, 'showAll']);

Route::get('/Etudiant/{id}', [EtudiantController::class, 'show'])->name('etudiant.show');

Route::put('/Etudiant/{idupdated}', [EtudiantController::class, 'update'])->name('etudiant.update');

Route::delete('/Etudiant/{id}', [EtudiantController::class, 'destroy'])->name('etudiant.destroy');

Route::post('/Etudiant', [EtudiantController::class, 'create'])->name('etudiant.create');


Route::get('/Profs', [ProfController::class, 'showAll']);

Route::get('/Profs/{id}', [ProfController::class, 'show'])->name('profs.show');

Route::put('/Prof/{idupdated}', [ProfController::class, 'update'])->name('prof.update');

Route::delete('/Prof/{id}', [ProfController::class, 'destroy'])->name('prof.destroy');

Route::post('/Prof', [ProfController::class, 'create'])->name('prof.create');
