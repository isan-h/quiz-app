<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Create Étudiant</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="min-h-screen flex items-center justify-center"
    style="background: radial-gradient(circle at top left, #1e1b4b, #0f172a);">

    <div class="p-6 w-full max-w-md bg-white/10 text-white rounded-xl shadow-xl">

        <h2 class="text-2xl font-semibold mb-4 text-center">Créer un Étudiant</h2>

        <!-- {{-- Error message --}}
        @if(session('error'))
            <div class="bg-red-600 p-3 rounded mb-3">{{ session('error') }}</div>
        @endif

        {{-- Validation errors --}}
        @if($errors->any())
            <div class="bg-red-600 p-3 rounded mb-3">
                @foreach($errors->all() as $error)
                    <p>- {{ $error }}</p>
                @endforeach
            </div>
        @endif -->

        <form method="POST" action="{{ route('etudiants.store') }}">
            @csrf

            <input
                class="w-full p-3 mb-3 bg-white/5 border border-white/20 rounded"
                type="text" name="nom" placeholder="Nom"
                value="{{ old('nom') }}">

            <input
                class="w-full p-3 mb-3 bg-white/5 border border-white/20 rounded"
                type="text" name="prenom" placeholder="Prénom"
                value="{{ old('prenom') }}">

            <input
                class="w-full p-3 mb-3 bg-white/5 border border-white/20 rounded"
                type="email" name="email" placeholder="Email"
                value="{{ old('email') }}">

            <input
                class="w-full p-3 mb-3 bg-white/5 border border-white/20 rounded"
                type="password" name="mot_de_passe" placeholder="Mot de passe">

            <input
                class="w-full p-3 mb-3 bg-white/5 border border-white/20 rounded"
                type="text" name="num_groupe" placeholder="Numéro de groupe"
                value="{{ old('num_groupe') }}">

            <button
                class="w-full p-3 bg-purple-600 hover:bg-purple-700 rounded font-semibold">
                Créer le compte
            </button>

            <a href="{{ route('etudiants.index') }}"
                class="block mt-3 text-center p-2 border border-purple-300 rounded hover:bg-purple-300/20">
                Déjà un compte ?
            </a>
        </form>
    </div>

</body>

</html>