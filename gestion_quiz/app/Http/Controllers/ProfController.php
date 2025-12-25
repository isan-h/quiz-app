<?php

namespace App\Http\Controllers;

use App\Models\Profs;

use Illuminate\Http\Request;

class ProfController extends Controller
{
    public function showAll()
    {
        $listOfProfs = Profs::paginate(5);
        return view('profs', compact('ListProfs'));
    }
    public function show(Request $request)
    {
        $idProf = $request->id;
        $SelectedProf = Profs::find($idProf);
        return view('showProf', compact('SelectedProf'));
    }

    public function update(Request $request)
    {
        $idProf = $request->id;
        $Prof = Profs::find($idProf);
        $Prof->nom = $request->input('nom');
        $Prof->email = $request->input('email');
        $Prof->telephone = $request->input('telephone');
        $Prof->save();
        return redirect('/profs');
    }
    public function destroy(Request $request)
    {
        $idProf = $request->id;
        $Prof = Profs::find($idProf);
        $Prof->delete();
        return redirect('/profs');
    }

    public function create(Request $request)
    {
        $Prof = new Profs();
        $Prof->nom = $request->input('nom');
        $Prof->email = $request->input('email');
        $Prof->telephone = $request->input('telephone');
        $Prof->save();
        return redirect('/profs')->with('success', 'Prof créé avec succès!');
    }
}
