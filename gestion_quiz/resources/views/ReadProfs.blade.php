<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Profs</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <style>
        body {
            background: radial-gradient(circle at top left, #1e1b4b, #0f172a);
            color: white;
            min-height: 100vh;
        }

        .table thead th {
            color: #f4f4ff;
        }

        .card {
            background: rgba(255, 255, 255, 0.03);
            border: none;
            margin-top: 30px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="d-flex justify-content-between align-items-center mt-4">
            <h2>Liste des profs</h2>
            <div>
                <a class="btn btn-primary" href="create.php">Créer un compte</a>
                <a class="btn btn-outline-light" href="signin.php">Se connecter</a>
            </div>
        </div>

        <div class="card p-3">
            <table class="table table-dark table-striped mb-0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Telephone</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    @foreach ($ListProfs as $prof)
                    <tr>
                        <td colspan="5" class="text-center">Vide</td>
                    </tr>
                    <tr>
                        <td>{{prof->id}}</td>
                        <td>{{prof->nom}}</td>
                        <td>{{prof->email}}</td>
                        <td>{{prof->telephone}}</td>
                        <td>
                            <a class='btn btn-success btn-sm' href="{{ route('profs.show', ['id' => $prof->id]) }}">Modifier</a>
                            <form action="{{ route('prof.destroy', $prof->id) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button class='btn btn-danger btn-sm' type="submit">Supprimer</button>
                            </form>

                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
            </table>
            {{$listOfProfs->links()}}

        </div>
    </div>
</body>

</html>