<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Users</title>
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
            <h2>List of users</h2>
            <div>
                <a class="btn btn-primary" href="create.php">Signup</a>
                <a class="btn btn-outline-light" href="signin.php">Sign in</a>
            </div>
        </div>

        <div class="card p-3">
            <table class="table table-dark table-striped mb-0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Email</th>
                        <th>Registered</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    @foreach ($ListEtudiants as $etudiant)
                    <tr>
                        <td colspan="5" class="text-center">No users yet.</td>
                    </tr>
                    <tr>
                        <td>{{etudiant->id}}</td>
                        <td>{{etudiant->nom}}</td>
                        <td>{{etudiant->prenom}}</td>
                        <td>{{etudiant->email}}</td>
                        <td>{{etudiant->num_groupe}}</td>
                        <td>
                            <a class='btn btn-success btn-sm' href="{{ route('etudiant.show', ['id' => $etudiant->id]) }}">edit</a>
                            <form action="{{ route('Etudiant.destroy', $etudiant->id) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button class='btn btn-danger btn-sm' type="submit">Delete</button>
                            </form>

                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
            </table>
            {{$listOfClients->links()}}

        </div>
    </div>
</body>

</html>