<?php

use Illuminate\Http\RedirectResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Route;


if (!function_exists('redirect_to_last_page_if_empty')) {
    function redirect_to_last_page_if_empty(LengthAwarePaginator $data, array $routeParams = []): null|RedirectResponse
    {
        if (request()->query($data->getPageName()) > 1 && $data->isEmpty()) {
            return redirect()->route(Route::currentRouteName(), array_merge($routeParams, request()->query(), [$data->getPageName() => $data->lastPage()]));
        }

        return null;
    }
}
