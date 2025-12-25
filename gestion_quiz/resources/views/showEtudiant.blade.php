<!DOCTYPE html>
<html lang="en">
php

<head>
    <meta charset="UTF-8">
    <title>Update</title>
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
        <h2 class="text-center mb-3">Update User</h2>

        <div class="alert alert-danger"></div>

        <div class="alert alert-success"></div>

        <form method="POST" action="route('etudiant.update', ['id' => $selectedClient->id])">
            @method('PUT')
            @csrf
            <input class="form-control mb-3" type="text" name="firstname" value="{{ $selectedClient->prenom}}">

            <input class="form-control mb-3" type="text" name="lastname" value="{{ $selectedClient->nom}}">

            <input class="form-control mb-3" type="email" name="email" value="{{ $selectedClient->email}}">

            <input class="form-control mb-3" type="text" name="num_groupe" value="{{ $selectedClient->num_groupe}}">

            <a class='btn btn-success btn-sm' href="{{ route('etudiant.show', ['id' => $etudiant->id]) }}">edit</a>
            <a href="read.php" class="btn btn-outline-light w-100 mt-2">Cancel</a>
        </form>
    </div>

</body>

</html>