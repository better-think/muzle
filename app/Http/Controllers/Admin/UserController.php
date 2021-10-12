<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Tenant;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::with('tenant')
            ->where('role', '!=', 'admin')
            ->orderBy('name')
            ->get();
        $tenants = Tenant::all();
        return Inertia::render('Admin/User/Index', [
            'users' => $users,
            'tenants' => $tenants
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
            'nickname' => [
                'required',
                Rule::unique('users','nickname')
                    ->where('tenant_id', $request->tenant_id)
            ],
            'role' => [
                'required',
                Rule::in(['teacher', 'kid']),
            ],
            'password' => 'required',
            'tenant_id' => 'required|exists:tenants,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $user = new User;
        $user->name = $request->name;
        $user->nickname = $request->nickname;
        $user->tenant_id = $request->tenant_id;
        $user->role = $request->role;
        $user->password = Hash::make($request->password);
        $user->save();
        $user = User::with('tenant')->find($user->id);

        return response()->json([
            'user' => $user
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
        $user = User::with('tenant')->find($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'nickname' => [
                'required',
                Rule::unique('users','nickname')
                    ->where('tenant_id', $user->tenant_id)
                    ->ignore($user->id, 'id')
            ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }
        
        $user->name = $request->name;
        $user->nickname = $request->nickname;
        $user->save();

        return response()->json([
            'user' => $user
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if ($user == null) {
            return response()->json([
                'error' => 'User Not Found'
            ], 400);
        }

        $user->delete();

        return response()->json([
            'user' => $user
        ]);
    }
}
