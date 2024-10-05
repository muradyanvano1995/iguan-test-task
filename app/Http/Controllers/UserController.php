<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::whereIsAdmin(false)
            ->latest()
            ->with('details')
            ->paginate(10);

        return redirect_to_last_page_if_empty($users) ??
            Inertia::render('Users/Index', compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        User::create($request->only(['name', 'email']))
            ?->details()->create($request->only(['address', 'phone_number']));

        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, User $user)
    {
        $user->update($request->only(['name', 'email']));
        $user->details()->update($request->only(['address', 'phone_number']));

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if ($user->is_admin) {
            abort(403);
        }

        $user->delete();

        return back();
    }
}
