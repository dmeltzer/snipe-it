<?php

namespace Tests;

use App\Models\Setting;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Auth;

abstract class DatabaseTestCase extends TestCase
{
    use CreatesApplication;
    use RefreshDatabase;

    public function setUp()
    {
        parent::setUp();
        factory(Setting::class)->create();
    }

    protected function signIn($user = null)
    {
        if (!$user) {
            $user = factory(User::class)->states('superuser')->create();
        }
        Auth::login($user);

        return $user;
    }
}
