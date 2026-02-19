<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class Matches extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $matches = [
            [
                'team1' => 'Sri Lanka',
                'team2' => 'Australia',
                'score1' => '184/2',
                'score2' => '181/10',
                'match_date' => Carbon::create(2026, 2, 16, 19, 0),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'team1' => 'England',
                'team2' => 'Italy',
                'score1' => '202/7',
                'score2' => '178/10',
                'match_date' => Carbon::create(2026, 2, 16, 15, 0),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'team1' => 'India',
                'team2' => 'Pakistan',
                'score1' => '175/7',
                'score2' => '114/10',
                'match_date' => Carbon::create(2026, 2, 15, 19, 0),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'team1' => 'Ireland',
                'team2' => 'Zimbabwe',
                'score1' => null,
                'score2' => null,
                'match_date' => Carbon::create(2026, 2, 17, 9, 30),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'team1' => 'Scotland',
                'team2' => 'Nepal',
                'score1' => null,
                'score2' => null,
                'match_date' => Carbon::create(2026, 2, 17, 13, 30),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

    }
}
