<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Inertia\Inertia;

Route::get('/', 'User\GameController@index');


require __DIR__.'/auth.php';

Route::middleware('auth')->group(function() {
    Route::prefix('management')->middleware('adminscope')->group(function() {
        Route::get('/', 'Admin\HomeController@index');
        Route::resource('tenants',     Admin\TenantController::class)->except(['create', 'edit', 'show']);
        Route::resource('users',       Admin\UserController::class)->except(['create', 'edit', 'show']);
        Route::resource('categories',  Admin\CategoryController::class)->only(['index', 'store']);
        Route::resource('images',      Admin\ImageController::class)->only(['index', 'store']);
        Route::resource('backgrounds', Admin\BackgroundController::class)->only(['index', 'store']);
        Route::resource('games',       Admin\GameController::class)->only(['index', 'store']);
    });

    Route::get('games', 'User\GameController@index');
    Route::get('games/{id}', 'User\GameController@show');
    
});