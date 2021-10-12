<?php

namespace App\Http\Controllers\PublicPage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Game;
use Inertia\Inertia;

class PublicPage extends Controller {
  public function index()
  {
    $games = Game::all();
    return view('welcome')->with('games', $games);
  }
}
?>