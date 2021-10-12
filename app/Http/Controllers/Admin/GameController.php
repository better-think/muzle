<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\Game;
use App\Models\Category;
use App\Models\Background;
use App\Models\Image;
use Inertia\Inertia;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $games = Game::withCount('backgrounds')->withCount('categories')->get();
        $categories = Category::all();
        $backgrounds = Background::all();
        return Inertia::render('Admin/Game/Index', [
            'games' => $games,
            'categories' => $categories,
            'backgrounds' => $backgrounds
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'backgrounds' => 'required|array',
            'backgrounds.*' => 'exists:backgrounds,id',
            'categories' => 'required|array',
            'categories.*' => 'exists:categories,id',
            'helper' => 'image:png,jpg',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }
        
        $game = new Game;
        $game->name = $request->name;
        $game->description = $request->description;

        if (!is_null($request->helper)) {
            $path = $request->helper->store('helper');
            $game->helper = $path;
        } else {
            $game->helper = '';
        }

        $game->save();
        $game->backgrounds()->attach($request->backgrounds);
        $game->categories()->attach($request->categories);
        $game = Game::withCount('backgrounds')->withCount('categories')->find($game->id);

        return response()->json([
            'game' => $game
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
