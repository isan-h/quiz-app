<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Modifier</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <style>
        body {
            background: radial-gradient(circle at top left, #1e1b4b, #0f172a);
            color: white;
        }

        .card {
            background: rgba(255, 255, 255, 0.05);
        }
    </style>
</head>

<body class="d-flex justify-content-center align-items-center vh-100">

    <div class="card p-4" style="width:400px;">
        <h2 class="text-center mb-3">Modifier prof</h2>

        <div class="alert alert-danger"></div>

        <div class="alert alert-success"></div>

        <form method="POST" action="route('prof.update', ['id' => $selectedProf->id])">
            @method('PUT')
            @csrf
            <input class="form-control mb-3" type="text" name="nom" value="{{ $selectedProf->nom}}">

            <input class="form-control mb-3" type="email" name="email" value="{{ $selectedProf->email}}">

            <input class="form-control mb-3" type="text" name="telephone" value="{{ $selectedProf->telephone}}">

            <a class='btn btn-success btn-sm' href="{{ route('profs.show', ['id' => $prof->id]) }}">Modifier</a>
            <a href="read.php" class="btn btn-outline-light w-100 mt-2">Annuler</a>
        </form>
    </div>

</body>

</html>