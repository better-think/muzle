<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    public function backgrounds()
    {
        return $this->belongsToMany(Background::class, 'game_background');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'game_category');
    }
    
}
