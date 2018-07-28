<?php

namespace Tests\Feature;

use App\Models\User;
use App\Notifications\CheckoutAssetNotification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Tests\DatabaseTestCase;

class NotificationTest extends DatabaseTestCase
{
    use CreatesValidTestObjects;
    public function testAUserIsEmailedIfTheyCheckoutAnAssetWithEULA()
    {
        $admin = factory(User::class)->states('superuser')->create();
        Auth::login($admin);
        $cat = $this->createValidCategory('asset-laptop-category', ['require_acceptance' => true]);
        $model = $this->createValidAssetModel('mbp-13-model', ['category_id' => $cat->id]);
        $asset = $this->createValidAsset(['model_id' => $model->id]);
        $user = factory(User::class)->create();
        Notification::fake();
        $asset->checkOut($user, 1);

        Notification::assertSentTo($user, CheckoutAssetNotification::class);
    }
}
