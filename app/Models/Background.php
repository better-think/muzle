<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Background extends Model
{
    use HasFactory;

    public function games()
    {
        return $this->belongsToMany(Background::class, 'game_background');
    }
}
