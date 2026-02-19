<?php

namespace App\Http\Controllers;

use App\Models\Matches;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class MatchesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function home_page()
    {
        $apiKey = '98b3ea48-5dfa-44bb-a5ee-f0c077209763';
        $baseUrl = 'https://api.cricapi.com/v1/matches?apikey=' . $apiKey . '&offset=0'; 
    
        $response = Http::get($baseUrl);
    
        if ($response->failed()) {
            $matches = [];
        } else {
            $matches = $response->json()['data'] ?? [];
        }
    
        $matches = collect($matches)
            ->filter(fn($m) => str_contains($m['name'], "T20 World Cup"))
            ->values() 
            ->all();
        dd($matches);
        return Inertia::render('Home', [
            'matches' => $matches,
        ]);
    }
    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Matches $matches)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Matches $matches)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Matches $matches)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Matches $matches)
    {
        //
    }
}
