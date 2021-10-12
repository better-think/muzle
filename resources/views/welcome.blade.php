@extends('layouts.public')

@section('content')
<div class="py-16 px-2">
    <div class="container max-w-screen-xl mx-auto">
        @auth
        
            <h1 class="text-2xl p-4 bg-yellow-900 text-white rounded-md">
                Welcome, {{auth()->user()->name}}
            </h1>            
        @endauth
        <div class="grid grid-cols-5 gap-4">
            <div class="header col-span-2">
                <img src='/img/main_title.png'/>
            </div> 
            @foreach($games as $game) 
                    <div class="max-w-sm rounded overflow-hidden shadow-lg py-10 card-game mx-5 my-5">
                        <div class="font-bold text-xl mb-2 card-header">{{$game->name}}</div>
                        <img class="w-full" src="/img/{{$game->helper}}" alt="Mountain" >
                        <div class="px-6 pt-4 pb-2 game-card-button">                    
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Select
                            </button>
                        </div>
                    </div>  
            @endforeach
        </div>
    </div>
</div>
@stop