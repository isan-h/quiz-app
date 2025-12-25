<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;

use Illuminate\Http\Request;

class EtudiantController extends Controller
{
    public function showAll()
    {
        $listOfClients = Etudiant::paginate(5);
        return view('etudiants', compact('ListEtudiants'));
    }
    public function show(Request $request)
    {
        $idEtudiant = $request->id;
        $SelectedEtudiant = Etudiant::find($idEtudiant);
        return view('showEtudiant', compact('SelectedEtudiant'));
    }

    public function update(Request $request)
    {
        $idEtudiant = $request->id;
        $Etudiant = Etudiant::find($idEtudiant);
        $Etudiant->firstName = $request->input('prenom');
        $Etudiant->lastName = $request->input('nom');
        $Etudiant->email = $request->input('email');
        $Etudiant->num_groupe = $request->input('num_groupe');

        $Etudiant->save();
        return redirect('/etudiant');
    }
    public function destroy(Request $request)
    {
        $idEtudiant = $request->id;
        $Etudiant = Etudiant::find($idEtudiant);
        $Etudiant->delete();
        // Etudiant::destroy($idEtudiant);
        return redirect('/etudiant');
    }

    public function create(Request $request)
    {
        $Etudiant = new Etudiant();
        $Etudiant->firstName = $request->input('prenom');
        $Etudiant->lastName = $request->input('nom');
        $Etudiant->email = $request->input('email');
        $Etudiant->num_groupe = $request->input('num_groupe');

        $Etudiant->save();
        return redirect('/etudiant')->with('success', 'Étudiant créé avec succès!');
    }
}
