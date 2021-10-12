<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use App\Models\Tenant;

class TenantController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tenants = Tenant::all();
        return Inertia::render('Admin/Tenant/Index', [
            'tenants' => $tenants
        ]);
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
            'name' => 'required|unique:tenants,name',
            'code' => 'required|unique:tenants,code',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $tenant = new Tenant;
        $tenant->name = $request->name;
        $tenant->code = $request->code;
        $tenant->save();

        return response()->json([
            'tenant' => $tenant
        ]);
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
        $validator = Validator::make($request->all(), [
            'name' => [
                'required',
                Rule::unique('tenants')->ignore($id),
            ],
            'code' => [
                'required',
                Rule::unique('tenants')->ignore($id),
            ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $tenant = Tenant::find($id);
        $tenant->name = $request->name;
        $tenant->code = $request->code;
        $tenant->save();

        return response()->json([
            'tenant' => $tenant
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
        $tenant = Tenant::find($id);

        if ($tenant == null) {
            return response()->json([
                'errors' => ['Not Found']
            ], 400);
        }
        
        if (count($tenant->users()->get()) > 0) {
            return response()->json([
                'errors' => ['All connected users need to be deleted before']
            ], 400);
        }

        $tenant->delete();

        return response()->json([
            'tenant' => $tenant
        ]);
    }
}
